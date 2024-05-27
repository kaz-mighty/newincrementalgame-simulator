"""
完全ランダムに遷移する焼きなまし
残霊力を考慮せず実スコアのみで評価してるため、性能はまだダメダメ

usage: 標準入力に以下の形式で入力してください。
ring_id は 1-index です。

```
ring_num max_turn
ring_id[0] level[0]
...
ring_id[ring_num] level[ring_num]
effect_id[0] ... effect_id[n]
```

effect_idが無い場合は空行
"""

import math
import time
import random
from collections.abc import Callable
from typing import TypeAlias
begin_time = time.perf_counter()
random.seed(1)

TIME_LIMIT = 2.0
INF = 10 ** 9
RING_DATA = [
    [17, 10, 10, 5, 1, 1, 12],
    [9, 15, 9, 2, 6, 2, 12],
    [8, 8, 13, 3, 3, 7, 12],
    [12, 12, 7, 4, 4, 1, 15],
    [10, 6, 10, 5, 2, 5, 15],
    [5, 8, 8, 3, 6, 6, 15],
]
MAX_LV = 30
# level: skill_id
RING_SKILL = [
    {1: 0, 5: 1, 8: 4, 12: 7, 17: 10, 23: 13},
    {1: 0, 5: 2, 8: 5, 12: 8, 17: 11, 23: 14},
    {1: 0, 5: 3, 8: 6, 12: 9, 17: 12, 23: 15},
    {1: 0, 4: 1, 6: 2, 8: 4, 10: 5, 12: 7, 14: 8},
    {1: 0, 4: 1, 6: 3, 8: 4, 10: 6, 12: 7, 14: 9},
    {1: 0, 4: 2, 6: 3, 8: 5, 10: 6, 12: 8, 14: 9},
]
POINT_TYPES = {
    "flower": 0,
    "snow": 1,
    "moon": 2,
}


class Ring:
    def __init__(self, ring_id: int, level: int) -> None:
        self.ring_id = ring_id
        self.level = level
        
        first = RING_DATA[ring_id]
        status = first
        for level in range(1, level):
            status = [status[i] * 1.05 + first[i] * 0.1 for i in range(len(first))]
        status = [math.floor(status[i] * first[i] * 0.1) for i in range(len(first))]
        
        self.powers: list[int] = status[0:3]
        self.multipliers: list[int] = status[3:6]
        self.tp: int = status[6]
        self.skills: list[int] = []
        
        for level, skill_id in RING_SKILL[self.ring_id].items():
            if level > self.level:
                continue
            self.skills.append(skill_id)


class FieldEffect:
    def __init__(self, timing: str, effect: Callable, description: str) -> None:
        self.timing = timing
        self.effect = effect
        self.description = description
    
    @staticmethod
    def dummy_effect():
        """高速化のために、処理はスキルに直接記述"""
        pass
    
    @staticmethod
    def get_effect_add_point(type_id: int) -> Callable:
        def effect(state: 'SubState', value: int) -> 'SubState':
            state.points[type_id] += value
            return state
        
        return effect
    
FIELD_EFFECTS = {
    1: FieldEffect(
        timing="skill_use",
        effect=FieldEffect.dummy_effect,
        description="花の評価上昇量1.5倍"
    ),
    2: FieldEffect(
        timing="skill_use",
        effect=FieldEffect.dummy_effect,
        description="雪の評価上昇量1.5倍"
    ),
    3: FieldEffect(
        timing="skill_use",
        effect=FieldEffect.dummy_effect,
        description="月の評価上昇量1.5倍"
    ),
    4: FieldEffect(
        timing="turn_end",
        effect=FieldEffect.get_effect_add_point(0),
        description="花の評価上昇"
    ),
    5: FieldEffect(
        timing="turn_end",
        effect=FieldEffect.get_effect_add_point(1),
        description="雪の評価上昇"
    ),
    6: FieldEffect(
        timing="turn_end",
        effect=FieldEffect.get_effect_add_point(2),
        description="月の評価上昇"
    ),
}


SkillCallable: TypeAlias = Callable[['SubState', 'Ring'], 'SubState']
class Skill:
    def __init__(self, name: str, tp: int, effect: SkillCallable) -> None:
        self.name = name
        self.tp = tp
        self.effect: SkillCallable = effect
    
    @staticmethod
    def effect_normal(state: 'SubState', ring: 'Ring') -> 'SubState':
        for i in range(3):
            add = math.floor(state.multipliers[i] * ring.powers[i])
            if i + 1 in state.fields_skill_use:
                add = math.floor(add * 1.5)
            state.points[i] += add
        return state
    
    @staticmethod
    def get_effect_amp(type_id: int) -> SkillCallable:
        def effect(state: 'SubState', ring: 'Ring') -> 'SubState':
            state.multipliers[type_id] += ring.multipliers[type_id] * 0.01
            return state
        
        return effect
    
    @staticmethod
    def get_effect_sublimate(type_id: int) -> SkillCallable:
        def effect(state: 'SubState', ring: 'Ring') -> 'SubState':
            add = math.floor(state.multipliers[type_id] * ring.powers[type_id] * 5)
            if type_id + 1 in state.fields_skill_use:
                add = math.floor(add * 1.5)
            state.points[type_id] += add
            return state
        
        return effect
    
    @staticmethod
    def get_effect_explode(type_id: int) -> SkillCallable:
        def effect(state: 'SubState', ring: 'Ring') -> 'SubState':
            add = math.floor(state.multipliers[type_id] * ring.powers[type_id] * 12)
            if type_id + 1 in state.fields_skill_use:
                add = math.floor(add * 1.5)
            state.points[type_id] += add
            state.multipliers[type_id] = max(state.multipliers[type_id] - 0.2, 0.5)
            return state
        
        return effect
    
    @staticmethod
    def get_effect_diffuse(type_id: int) -> SkillCallable:
        def effect(state: 'SubState', ring: 'Ring') -> 'SubState':
            state.multipliers[type_id] -= 0.3
            for i in range(3):
                state.multipliers[i] += 0.1
            return state
        
        return effect
    
    @staticmethod
    def get_effect_fill(type_id: int) -> SkillCallable:
        def effect(state: 'SubState', ring: 'Ring') -> 'SubState':
            add = math.floor(state.multipliers[type_id] * ring.powers[type_id])
            state.fields_turn_end.append((type_id + 4, add))
            return state
        
        return effect

SKILL_DATA = [
    Skill(  # 0
        name="通常",
        tp=0,
        effect=Skill.effect_normal,
    ),
    Skill(  # 1
        name="花増幅",
        tp=8,
        effect=Skill.get_effect_amp(0),
    ),
    Skill(
        name="雪増幅",
        tp=8,
        effect=Skill.get_effect_amp(1),
    ),
    Skill(
        name="月増幅",
        tp=8,
        effect=Skill.get_effect_amp(2),
    ),
    Skill(  # 4
        name="花昇華",
        tp=15,
        effect=Skill.get_effect_sublimate(0),
    ),
    Skill(
        name="雪昇華",
        tp=15,
        effect=Skill.get_effect_sublimate(1),
    ),
    Skill(
        name="月昇華",
        tp=15,
        effect=Skill.get_effect_sublimate(2),
    ),
    Skill(  # 7
        name="花爆発",
        tp=20,
        effect=Skill.get_effect_explode(0),
    ),
    Skill(
        name="雪爆発",
        tp=20,
        effect=Skill.get_effect_explode(1),
    ),
    Skill(
        name="月爆発",
        tp=20,
        effect=Skill.get_effect_explode(2),
    ),
    Skill(  # 10
        name="花拡散",
        tp=20,
        effect=Skill.get_effect_diffuse(0),
    ),
    Skill(
        name="雪拡散",
        tp=20,
        effect=Skill.get_effect_diffuse(1),
    ),
    Skill(
        name="月拡散",
        tp=20,
        effect=Skill.get_effect_diffuse(2),
    ),
    Skill(  # 13
        name="花充満",
        tp=45,
        effect=Skill.get_effect_fill(0),
    ),
    Skill(
        name="雪充満",
        tp=45,
        effect=Skill.get_effect_fill(1),
    ),
    Skill(
        name="月充満",
        tp=45,
        effect=Skill.get_effect_fill(2),
    ),
]


class SubState:
    def __init__(self):
        self.turn = 0
        self.active_ring = 0
        self.points = [0] * len(POINT_TYPES)
        self.multipliers = [1.0] * len(POINT_TYPES)
        self.fields_skill_use: set[int] = set()
        self.fields_turn_end: list[tuple[int, int]] = []


class State:
    def __init__(self):
        ring_num, max_turn = map(int, input().split())
        self.rings = []
        for i in range(ring_num):
            ring_id, level = map(int, input().split())
            ring_id -= 1
            assert 0 <= ring_id < len(RING_DATA)
            assert 1 <= level <= MAX_LV
            self.rings.append(Ring(ring_id, level))
        
        self.max_turn = max_turn
        self.field_effects = list(map(int, input().split()))
        assert all(map(lambda effect_id: 1 <= effect_id <= 3, self.field_effects))
        
        self.use_skills = [[0] * ring_num for _ in range(max_turn)]
        self.use_tp = [0] * ring_num
        
        self._undo: tuple[int, int, int, int] | None = None
    
    def simulate(self) -> int:
        state = SubState()
        for effect_id in self.field_effects:
            if FIELD_EFFECTS[effect_id].timing == "skill_use":
                state.fields_skill_use.add(effect_id)
            elif FIELD_EFFECTS[effect_id].timing == "turn_end":
                state.fields_turn_end.append((effect_id, -1))
        
        for turn in range(self.max_turn):
            use_skills = self.use_skills[turn]
            # use skill
            for i, ring in enumerate(self.rings):
                skill_id = use_skills[i]
                SKILL_DATA[skill_id].effect(state, ring)
            
            # turn end
            for effect_id, value in state.fields_turn_end:
                FIELD_EFFECTS[effect_id].effect(state, value)
        return sum(state.points)
    
    def calc_score(self) -> float:
        return float(self.simulate())
    
    def calc_output(self) -> str:
        output = []
        for turn, use_skills in enumerate(self.use_skills):
            output.append(f"{turn + 1:2}:" + " ".join(map(lambda skill_id: SKILL_DATA[skill_id].name, use_skills)))
        return "\n".join(output)
    
    def transition(self) -> bool:
        ring_index = random.randrange(len(self.rings))
        turn = random.randrange(self.max_turn)
        skill_id = random.choice(self.rings[ring_index].skills)
        before_skill = self.use_skills[turn][ring_index]
        if skill_id == before_skill:
            return False
        tp = SKILL_DATA[skill_id].tp
        before_tp = SKILL_DATA[before_skill].tp
        if self.use_tp[ring_index] + tp - before_tp > self.rings[ring_index].tp:
            return False
        
        self._undo = (turn, ring_index, before_skill, self.use_tp[ring_index])
        self.use_skills[turn][ring_index] = skill_id
        self.use_tp[ring_index] += tp - before_tp
        return True
    
    def undo(self) -> 'State':
        assert self._undo is not None
        turn, ring_index, before_skill, before_tp = self._undo
        self.use_skills[turn][ring_index] = before_skill
        self.use_tp[ring_index] = before_tp
        return self


def annealing(state: 'State') -> None:
    """焼きなましを行う"""
    START_TEMP = 20000.0
    END_TEMP = 100.0
    before_score = state.calc_score()
    best_score = before_score
    best_answer: str = state.calc_output()
    while (time_ratio := (time.perf_counter() - begin_time) / TIME_LIMIT) < 1.0:
        if not state.transition():
            continue
        score = state.calc_score()
        
        # 線形
        temp = (END_TEMP - START_TEMP) * time_ratio + START_TEMP
        # 指数(?に凸)
        # temp = (END_TEMP - START_TEMP) * ((math.exp(time_ratio) - 1) / (math.e - 1)) + START_TEMP
        
        # スコア最大化
        # todo: 最適化
        prob = math.exp(min(score - before_score, 0.0) / temp)
        if random.random() < prob:
            before_score = score
            # スコア最大化
            if score > best_score:
                best_score = score
                best_answer = state.calc_output()
        else:
            state: 'State' = state.undo()
    
    print(best_answer)
    print(f"score: {best_score}")
    for i in range(len(state.rings)):
        print(f"消費TP 輪{i}: {state.use_tp[i]} / {state.rings[i].tp}")


def main() -> None:
    state = State()
    annealing(state)
    # score = state.simulate()
    # print(score)

main()
