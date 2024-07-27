const D = (value) => new Decimal(value);
const numArray2BoolArray = (numArray, length) => {
    let boolArray = new Array(length).fill(false);
    numArray.forEach((n, i) => {
        if (typeof n == 'boolean') {
            boolArray[i] = n;
        } else {
            boolArray[n] = true;
        }
    });
    return boolArray;
};

// Different from deepmerge sample code
const combineMerge = (target, source, options) => {
    const destination = target.slice();

    source.forEach((item, index) => {
        if (item === undefined) {
            return;
        }
        if (options.isMergeableObject(item)) {
            destination[index] = deepmerge(target[index], item, options);
        } else {
            destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
        }
    })
    return destination;
};
const deepMergeWithoutUndefined = (target, source, options) => {
    if (!Array.isArray(source)) {
        source = Object.fromEntries(Object.entries(source).filter(([_, value]) => value !== undefined));
    }
    return deepmerge(target, source, options);
};

class ItemData {
    constructor() {
        this.challengeText = [
            '昇段リセットは1e24ポイントから可能になります',
            '発生器は高速に値上がりします',
            '発生器購入数による強化は無効になります',
            '発生器のモードは0に固定されます',
            '段位によらない基礎的な下位モード強化は無効となります',
            '時間加速器は購入できません',
            '発生器4と8は購入できません',
            '段位リセット回数による強化は無効になります',
        ];
        this.rewardText = [
            '昇段リセット後1e4ポイント獲得',
            '昇段リセット後10個の時間加速器1獲得',
            '番号が最高の発生器にも購入数ボーナスが働く',
            '全発生器の生産力が2倍に',
            '挑戦中でも効力を有効に',
            '発生器自動購入器を入手',
            '時間加速器1に購入数ボーナスが働く',
            '発生器1の生産力が一度に取得した最大段位数倍に(上限:100000)',
            '段位リセット回数の増加分が2倍に',
            '時間加速器自動購入器を入手',
            '時間加速器2に購入数ボーナスが働く',
            '発生器の購入数ボーナスが強化',
            'リセット時の段位取得数が2倍に',
            '発生器は同時に全てのモードとなる',
            '自動昇段リセット器を入手',
        ];
        this.rankRewardText = [
            '昇段リセット後1e9ポイント獲得',
            '昇段リセット後256個の時間加速器1獲得',
            '輝きの一度の入手数が2つに',
            '全発生器の生産力が3倍に',
            '受けている挑戦の数に応じて発生器が少し強化',
            '段位効力自動購入器を入手',
            '時間加速器3以降に購入数ボーナスが働く',
            '効力8が上限以降も少しだけ強化',
            '階位リセット回数の増加分が3倍に',
            '間隙が50毛秒に固定(発生器の生産力変化)',
            '時間加速器の購入数ボーナスが強化',
            '記憶が入手数に応じてさらに強化',
            'リセット時の階位取得数が3倍に',
            '全時間加速器が間隙に影響',
            '自動昇階リセット器を入手',
        ];
        this.rewardCost = [1, 2, 4, 8, 8, 8, 16, 16, 16, 16, 32, 32, 32, 32, 32];
        this.levelItemText = [
            '段位取得量が最大取得段位以下の範囲で増加します',
            '取得している効力数によって、間隙が少しだけ短くなります',
            '段位リセット1回あたりの効果が弱くなるのが遅くなります',
            '新しい時間加速器を購入可能になります',
            '階位の入手量が少しだけ増加します',
        ];
        this.levelItemCost = [D('1e1'), D('1e2'), D('1e3'), D('1e4'), D('1e5')];
        this.trophyText = [
            '有段者',
            '有階者',
            '輝く者',
            '世界移動者',
            '裏の者',
            '煌く者',
            '想い出す者',
            '有冠者',
            '天上の者',
            '瞬く者',
        ];
        this.smallTrophyText = [
            'ポイントを0より大きくする',
            'ポイントを777より大きくする',
            'ポイントを7777777より大きくする',
            'ポイントを1e19より大きくする',
            'ポイントを1e36より大きくする',
            'ポイントを1e77より大きくする',
            'ポイントを1e81より大きくする',
            'ポイントを1e303より大きくする',
            '発生器1を1つ以上購入する',
            '発生器2を1つ以上購入する',
            '発生器3を1つ以上購入する',
            '発生器4を1つ以上購入する',
            '発生器5を1つ以上購入する',
            '発生器6を1つ以上購入する',
            '発生器7を1つ以上購入する',
            '発生器8を1つ以上購入する',
            '時間加速器1を1つ以上購入する',
            '時間加速器2を1つ以上購入する',
            '時間加速器3を1つ以上購入する',
            '時間加速器4を1つ以上購入する',
            '時間加速器5を1つ以上購入する',
            '時間加速器6を1つ以上購入する',
            '時間加速器7を1つ以上購入する',
            '時間加速器8を1つ以上購入する',
            '段位リセットを200より大きくする',
            '段位リセットを999より大きくする',
            '挑戦1を達成する',
            '挑戦2を達成する',
            '挑戦3を達成する',
            '挑戦4を達成する',
            '挑戦5を達成する',
            '挑戦6を達成する',
            '挑戦7を達成する',
            '挑戦8を達成する',
            '挑戦を32種類以上達成する',
            '挑戦を64種類以上達成する',
            '挑戦を96種類以上達成する',
            '挑戦を128種類以上達成する',
            '挑戦を160種類以上達成する',
            '挑戦を192種類以上達成する',
            '挑戦を224種類以上達成する',
            '挑戦を255種類以上達成する',
            '階位リセットを1より大きくする',
            '階位リセットを4より大きくする',
            '階位リセットを9より大きくする',
            '階位リセットを99より大きくする',
            '階位リセットを999より大きくする',
            '段位効力の累計購入回数を4以上にする',
            '段位効力の累計購入回数を108以上にする',
            '段位効力の累計購入回数を256以上にする',
            '段位効力の累計購入回数を1728以上にする',
            '段位効力の累計購入回数を12500以上にする',
            '100以上の輝きを所持する',
            '1000以上の輝きを所持する',
            '10000以上の輝きを所持する',
            '100000以上の輝きを所持する',
            '1000000以上の輝きを所持する',
            '10000000以上の輝きを所持する',
            '設定タブ内で、データ吐き出しを行う',
            '設定タブ内で、ツイート設定機能を2つ以上設定する',
            '裏発生器1を1つ以上購入する',
            '裏発生器2を1つ以上購入する',
            '裏発生器3を1つ以上購入する',
            '裏発生器4を1つ以上購入する',
            '裏発生器5を1つ以上購入する',
            '裏発生器6を1つ以上購入する',
            '裏発生器7を1つ以上購入する',
            '裏発生器8を1つ以上購入する',
            '階位挑戦を32種類以上達成する',
            '階位挑戦を64種類以上達成する',
            '階位挑戦を96種類以上達成する',
            '階位挑戦を128種類以上達成する',
            '階位挑戦を160種類以上達成する',
            '階位挑戦を192種類以上達成する',
            '階位挑戦を224種類以上達成する',
            '階位挑戦を255種類以上達成する',
            '10以上の煌きを所有する',
            '100以上の煌きを所有する',
            '1000以上の煌きを所有する',
            '10000以上の煌きを所有する',
            '裏ポイントを1以上にする',
            '裏ポイントを777以上にする',
            '裏ポイントを7777777以上にする',
            '裏ポイントを1e18以上にする',
            '裏ポイントを1e72以上にする',
            '銅片を1個以上にする',
            '銅片を210個以上にする',
            '銅片を1275個以上にする',
            '銀片を1個以上にする',
            '銀片を210個以上にする',
            '銀片を1275個以上にする',
            '金片を1個以上にする',
            '金片を210個以上にする',
            '金片を1275個以上にする',
            '白金片を1個以上にする',
            '白金片を210個以上にする',
            '白金片を1275個以上にする',
            '裏段位を1以上にする',
            '裏段位を1e3より大きくする',
            '裏段位を1e10より大きくする',
            '冠位リセットを1以上にする',
            '冠位リセットを5以上にする',
            '冠位リセットを20以上にする',
            '冠位リセットを100以上にする',
            '時間回帰力を1以上にする',
            '時間回帰力を3以上にする',
            '時間回帰力を6以上にする',
            '時間回帰力を10以上にする',
            '階位を1e8より大きくする',
            '階位を1e10より大きくする',
            '階位を1e12より大きくする',
            '天上発生器1を1つ以上購入する',
            '天上発生器2を1つ以上購入する',
            '天上発生器3を1つ以上購入する',
            '天上発生器4を1つ以上購入する',
            '天上発生器5を1つ以上購入する',
            '天上発生器6を1つ以上購入する',
            '天上発生器7を1つ以上購入する',
            '天上発生器8を1つ以上購入する',
            '紫鋼片を1個以上にする',
            '紫鋼片を210個以上にする',
            '紫鋼片を1275個以上にする',
            '銅像を10個以上にする',
            '銀像を10個以上にする',
            '金像を10個以上にする',
            '白金像を10個以上にする',
            '冠位を100以上にする',
            '冠位を10000以上にする',
            '冠位を1e8以上にする',
            '天上ポイントを1以上にする',
            '天上ポイントを1e9以上にする',
            '天上ポイントを1e18以上にする',
            '天上ポイントを1e36以上にする',
            '10以上の瞬きを所持する',
            '100以上の瞬きを所持する',
            '1000以上の瞬きを所持する',
            '10000以上の瞬きを所持する',
            '100000以上の瞬きを所持する',
            '1000000以上の瞬きを所持する',
            '朱鋼片を1個以上にする',
            '朱鋼片を210個以上にする',
            '朱鋼片を1275個以上にする',
            '蒼鋼片を1個以上にする',
            '蒼鋼片を210個以上にする',
            '蒼鋼片を1275個以上にする',
            '紫鋼像を10個以上にする',
            '朱鋼像を10個以上にする',
            '蒼鋼像を10個以上にする',
            '銅像を64個以上にする',
            '銀像を64個以上にする',
            '金像を64個以上にする',
            '白金像を64個以上にする',
            '紫鋼像を64個以上にする',
            '朱鋼像を64個以上にする',
            '蒼鋼像を64個以上にする',
        ]
        this.chipName = ['銅', '銀', '金', '白金', '紫鋼', '朱鋼', '蒼鋼', '翠鋼', '聖銀', '覇金'];
        this.chipBonusName = [
            '発生器効率',
            '発生器1効率',
            '発生器2効率',
            '発生器3効率',
            '発生器4効率',
            '発生器5効率',
            '発生器6効率',
            '発生器7効率',
            '発生器8効率',
            '間隙',
            '時間加速器1効率',
            '時間加速器2効率',
            '時間加速器3効率',
            '時間加速器4効率',
            '時間加速器5効率',
            '時間加速器6効率',
            '時間加速器7効率',
            '時間加速器8効率',
            '段位入手量',
            '段位効率',
            '段位リセット入手量',
            '段位リセット効率(工事中)',
            '階位入手量',
            '階位効率',
            '階位リセット入手量',
            '階位リセット効率(工事中)',
            '段位効力1効率',
            '段位効力2効率',
            '段位効力3効率',
            '段位効力5効率',
            '輝き入手割合',
            '輝き使用効率',
            '裏発生器1強化',
            '裏発生器2強化',
            '裏発生器3強化',
            '裏発生器4強化',
            '裏発生器5強化',
            '裏発生器6強化',
            '裏発生器7強化',
            '裏発生器8強化',
            '裏ポイント強化',
            '裏発生器1生産強化',
            '裏発生器2生産強化',
            '裏発生器3生産強化',
            '裏発生器4生産強化',
            '裏発生器5生産強化',
            '裏発生器6生産強化',
            '裏発生器7生産強化',
            '裏発生器8生産強化',
            '煌き入手割合',
            '煌き使用効率',
            '煌き使用効率裏',
        ];
        this.perfectChallengetext = [
            '発生器の倍率が1/100になります。',
            '間隙のベースは10000毛秒になります。',
            '発生器3と6は生産をしません。',
            '倍率は6桁毎に切り捨てられます。',
            '段位と段位リセットの入手量は大幅に減少します。',
            '階位の入手量は大幅に減少します。',
            '輝きと煌きは使用できません。',
            '記憶と思い出は大幅に弱体化されます。',
            '裏発生器と裏ポイントは発生器を強化しません。',
            '鋳片効力は、新規挑戦達成でない段位リセットを行うごとにランダムで1つが無効になります。',
        ];
    }
}

const itemData = new ItemData();

class MaximumBonuses {
    constructor() {
        this.cache = new Map();
    };
    static maximumBonuses(maxToken, rank, onChallenge) {
        const effectiveChallengeBonuses = rank ? [3, 4, 6, 7, 9, 10, 11, 13] : [2, 3, 6, 7, 10, 11, 13];
        const m = 1 << effectiveChallengeBonuses.length;
        if (!rank && onChallenge) maxToken = Math.max(maxToken - 8, 0);
        let costs = new Array(m).fill(0);
        let challengeBonusesCandidates = [];
        for (let i = 0; i < m; i++) {
            let ok = true;
            for (let j = 0; j < effectiveChallengeBonuses.length; j++) {
                if (!(i & 1 << j)) {
                    costs[i ^ 1 << j] = costs[i] + itemData.rewardCost[effectiveChallengeBonuses[j]];
                    ok &= costs[i ^ 1 << j] > maxToken || (rank && effectiveChallengeBonuses[j] === 9);
                }
            }
            if (ok && costs[i] <= maxToken) {
                let cs = [];
                for (let j = 0; j < effectiveChallengeBonuses.length; j++) {
                    if (i & 1 << j) {
                        cs.push(effectiveChallengeBonuses[j]);
                    }
                }
                /* 上位効力4は上位効力5の上位互換 */
                if (rank && !cs.includes(3) && cs.includes(4)) { } else {
                    challengeBonusesCandidates.push(cs);
                }
            }
        }
        return challengeBonusesCandidates;
    }

    get(maxToken, rank, onChallenge) {
        const key = { maxToken: maxToken, rank: rank, onChallenge: onChallenge };
        let res = this.cache.get(key);
        if (res === undefined) {
            res = MaximumBonuses.maximumBonuses(maxToken, rank, onChallenge);
            this.cache.set(key, res);
        }
        return res;
    };
}

const mbCache = new MaximumBonuses();

const TROPHY_NUM = 10;
const SET_CHIP_KIND = 10;
const SET_CHIP_NUM = 100;

class Nig {
    constructor() {
        this.player = Nig.initialData();
        this.players = new Array(10).fill(null).map(() => Nig.initialData());
        this.highest = 0;
        this.commonMult = D(1);
        this.incrementalMults = new Array(8).fill(D(1));
        this.multByAc = D(1);
        this.memory = 0;
        this.smallMemory = 0;
        this.smallMemories = new Array(10).fill(0);
        this.eachPipedSmallMemory = new Array(10).fill(0);
        this.pipedSmallMemory = 0;
        this.worldOpened = new Array(10).fill(false);
        this.chipUsed = new Array(SET_CHIP_KIND).fill(0);
        this.pChallengeStage = 0;
        this.world = 0;
    };

    static decimalProperties = [
        'money',
        'level',
        'leveResetTime',
        'maxLevelGained',
        'rank',
        'rankResetTime',
        'crown',
        'crownResetTime',
        'generators',
        'generatorsBought',
        'generatorsCost',
        'accelerators',
        'acceleratorsBought',
        'acceleratorsCost',
        'darkMoney',
        'darkGenerators',
        'darkGeneratorsBought',
        'darkGeneratorsCost',
        'darkLevel',
        'lightMoney',
        'lightGenerators',
        'lightGeneratorsBought',
        'lightGeneratorsCost'
    ]

    static initialData(){
        return {
            useCamelCase: true,

            money: D(1),
            level: D(0),
            leveResetTime: D(0),
            maxLevelGained: D(1),
            token: 0,
            shine: 0,
            brightness: 0,
            flicker: 0,
            residue: 0,

            rank: D(0),
            rankResetTime: D(0),
            rankToken: 0,

            crown: D(0),
            crownResetTime: D(0),

            generators: new Array(8).fill(D(0)),
            generatorsBought: new Array(8).fill(D(0)),
            generatorsCost: [D(1), D('1e4'), D('1e9'), D('1e16'), D('1e25'), D('1e36'), D('1e49'), D('1e64')],
            generatorsMode: new Array(8).fill(null).map((_, i) => i),

            accelerators: new Array(8).fill(D(0)),
            acceleratorsBought: new Array(8).fill(D(0)),
            acceleratorsCost: [D(10), D('1e10'), D('1e20'), D('1e40'), D('1e80'), D('1e160'), D('1e320'), D('1e640')],

            darkMoney: D(0),
            darkGenerators: new Array(8).fill(D(0)),
            darkGeneratorsBought: new Array(8).fill(D(0)),
            darkGeneratorsCost: [D('1e100'), D('1e108'), D('1e127'), D('1e164'), D('1e225'), D('1e316'), D('1e443'), D('1e612')],
            darkLevel: D(0),

            lightMoney: D(0),
            lightGenerators: new Array(8).fill(D(0)),
            lightGeneratorsBought: new Array(8).fill(D(0)),
            lightGeneratorsCost: [D('1e200'), D('1e216'), D('1e281'), D('1e456'), D('1e825'), D('1e1496'), D('1e2601'), D('1e4296')],

            tickSpeed: 1000,
            accelLevel: 0,
            accelLevelUsed: 0,
            timeCrystal: new Array(8).fill(null).map(() => 0),

            onChallenge: false,
            challenges: new Array(8).fill(false),
            challengeCleared: [],
            challengeBonuses: new Array(15).fill(false),

            onPChallenge: false,
            pChallenges: [],
            pChallengeCleared: new Array(1024).fill(0),
            pRChallengeCleared: new Array(1024).fill(0),

            rankChallengeCleared: [],
            rankChallengeBonuses: new Array(15).fill(false),

            trophies: new Array(TROPHY_NUM).fill(false),
            smallTrophies: new Array(100).fill(false),
            smallTrophies2nd: new Array(100).fill(false),

            levelItems: new Array(5).fill(0),
            levelItemBought: 0,

            remember: 0,
            rememberSpent: 0,

            chip: new Array(SET_CHIP_KIND).fill(0),
            setChip: new Array(SET_CHIP_NUM).fill(0),
            disabledChip: new Array(SET_CHIP_NUM).fill(false),

            statue: new Array(SET_CHIP_KIND).fill(0),

            worldPipe: new Array(10).fill(0),
            rings: {
                setRings: [],
                ringsExp: new Array(13).fill(null).map(() => 0),
                onMission: false,
                missionId: 0,
                missionState: {
                    turn: 0,
                    activeRing: 0,
                    skillLog: [],
                    flowerPoint: 0,
                    snowPoint: 0,
                    moonPoint: 0,
                    flowerMultiplier: 1,
                    snowMultiplier: 1,
                    moonMultiplier: 1,
                    tps: [],
                    fieldEffect: [],
                },
                clearedMission: [],
                auto: {
                    doAuto: false,
                    autoMissionId: 0,
                },
                outsideAuto: {
                    autoSpendShine: false,
                    autoSpendShineNumber: 0,
                    autoSpendBright: false,
                    autoSpendBrightNumber: 0,
                    autoDarkLevelReset: false,
                    autoDarkLevelResetBorder: 2,
                    autoDoChallenge: false
                },
            },
        };
    };

    save() {
        this.players[this.world] = this.player;
    };

    static calcAfterNTick(expr, n) {
        let p = D(1);
        let res = D(0);
        for (let i = 0; i < expr.length; i++) {
            res = res.add(expr[i].mul(p));
            p = p.mul(n.sub(i)).div(i + 1);
        }
        return res;
    };

    loadB(worldDatab) {
        let players = JSON.parse(atob(worldDatab));
        for (let i = 0; i < 10; i++) {
            let player = players[i];
            if (!player.useCamelCase) {
                player = this.loadPlayerFromOriginal(player);
            }
            this.players[i] = deepMergeWithoutUndefined(Nig.initialData(), player, {
                arrayMerge: combineMerge,
                isMergeableObject: (target) => Array.isArray(target) || isPlainObject(target),
                customMerge: (_) => deepMergeWithoutUndefined,
            });
        }
        this.loadPlayer(this.players[this.world]);
    };

    clone() {
        let nig = new Nig();
        nig.players = JSON.parse(JSON.stringify(this.players));
        nig.world = this.world;
        nig.loadPlayer(JSON.parse(JSON.stringify(this.player)));
        return nig;
    };

    loadPlayerFromOriginal(playerData) {
        // noinspection JSUnresolvedReference
        return {
            useCamelCase: true,

            money: playerData.money,
            level: playerData.level,
            leveResetTime: playerData.levelresettime,
            maxLevelGained: playerData.maxlevelgained,
            token: playerData.token,
            shine: playerData.shine,
            brightness: playerData.brightness,
            flicker: playerData.flicker,
            residue: playerData.residue,

            rank: playerData.rank,
            rankResetTime: playerData.rankresettime,
            rankToken: playerData.ranktoken,

            crown: playerData.crown,
            crownResetTime: playerData.crownresettime,

            generators: playerData.generators,
            generatorsBought: playerData.generatorsBought,
            generatorsCost: playerData.generatorsCost,
            generatorsMode: playerData.generatorsMode,

            accelerators: playerData.accelerators,
            acceleratorsBought: playerData.acceleratorsBought,
            acceleratorsCost: playerData.acceleratorsCost,

            darkMoney: playerData.darkmoney,
            darkGenerators: playerData.darkgenerators,
            darkGeneratorsBought: playerData.darkgeneratorsBought,
            darkGeneratorsCost: playerData.darkgeneratorsCost,
            darkLevel: playerData.darklevel,

            lightMoney: playerData.lightmoney,
            lightGenerators: playerData.lightgenerators,
            lightGeneratorsBought: playerData.lightgeneratorsBought,
            lightGeneratorsCost: playerData.lightgeneratorsCost,

            tickSpeed: playerData.tickspeed,
            accelLevel: playerData.accelevel,
            accelLevelUsed: playerData.accelevelused,
            timeCrystal: playerData.timecrystal,

            onChallenge: playerData.onchallenge,
            challenges: numArray2BoolArray(playerData.challenges ?? [], 8),
            challengeCleared: playerData.challengecleared,
            challengeBonuses: numArray2BoolArray(playerData.challengebonuses ?? [], 15),

            onPChallenge: playerData.onpchallenge,
            pChallenges: numArray2BoolArray(playerData.pchallenges ?? [], 8),
            pChallengeCleared: playerData.pchallengecleared,
            pRChallengeCleared: playerData.prchallengecleared,

            rankChallengeCleared: playerData.rankchallengecleared,
            rankChallengeBonuses: numArray2BoolArray(playerData.rankchallengebonuses ?? [], 15),

            trophies: playerData.trophies,
            smallTrophies: playerData.smalltrophies,
            smallTrophies2nd: playerData.smalltrophies2nd,

            levelItems: playerData.levelitems,
            levelItemBought: playerData.levelitembought,

            remember: playerData.remember,
            rememberSpent: playerData.rememberspent,

            chip: playerData.chip,
            setChip: playerData.setchip,
            disabledChip: playerData.disabledchip,

            statue: playerData.statue,

            worldPipe: playerData.worldpipe,
            rings: this.loadRingFromOriginal(playerData.rings),
        };
    };
    loadRingFromOriginal(rings) {
        // noinspection JSUnresolvedReference
        return {
            setRings: rings.setrings,
            ringsExp: rings.ringsexp,
            onMission: rings.onmission,
            missionId: rings.missionid,
            missionState: {
                turn: rings.missionstate.turn,
                activeRing: rings.missionstate.activering,
                skillLog: rings.missionstate.skilllog,
                flowerPoint: rings.missionstate.flowerpoint,
                snowPoint: rings.missionstate.snowpoint,
                moonPoint: rings.missionstate.moonpoint,
                flowerMultiplier: rings.missionstate.flowermultiplier,
                snowMultiplier: rings.missionstate.snowmultiplier,
                moonMultiplier: rings.missionstate.moonmultiplier,
                tps: rings.missionstate.tps,
                fieldEffect: rings.missionstate.fieldeffect,
            },
            clearedMission: rings.clearedmission,
            auto: {
                doAuto: rings.auto.doauto,
                autoMissionId: rings.auto.automissionid,
            },
            outsideAuto: {
                autoSpendShine: rings.outsideauto.autospendshine,
                autoSpendShineNumber: rings.outsideauto.autospendshinenumber,
                autoSpendBright: rings.outsideauto.autospendbright,
                autoSpendBrightNumber: rings.outsideauto.autospendbrightnumber,
                autoDarkLevelReset: rings.outsideauto.autodarklevelreset,
                autoDarkLevelResetBorder: rings.outsideauto.autodarklevelresetborder,
                autoDoChallenge: rings.outsideauto.autodochallenge,
            },
        }
    };

    loadPlayer(playerData) {
        this.player = playerData;
        for (const property of Nig.decimalProperties) {
            if (this.player[property] instanceof Array) {
                this.player[property] = this.player[property].map(D)
            } else {
                this.player[property] = D(this.player[property])
            }
        }
        this.checkTrophies();
        this.checkMemories();
        this.checkSmallMemories();
        this.checkUsedChips();
        this.checkWorlds();
        this.updateTickSpeed();
        this.checkPipedSmallMemories();
        this.checkPChallengeCleared();
        for (let i = 0; i < 8; i++) this.calcGeneratorCost(i, this.player.generatorsBought[i], true);
        for (let i = 0; i < 8; i++) this.calcAcceleratorCost(i, this.player.acceleratorsBought[i], true);
        for (let i = 0; i < 8; i++) this.calcDarkGeneratorCost(i, this.player.darkGeneratorsBought[i], true);
        for (let i = 0; i < 8; i++) this.calcLightGeneratorCost(i, this.player.lightGeneratorsBought[i], true);
    };

    softCap(num, cap) {
        if (num.lte(cap)) return num;
        return cap.mul(D(num.div(cap).log2()).add(1)).min(num);
    };

    strongSoftCap(num, cap) {
        if (num.lte(cap)) return num;
        return cap.mul(D(D(num.div(cap).log2()).add(1).log2()).add(1)).min(num);
    };

    calcCommonMult() {
        let mult = D(1);
        if (!this.isChallengeActive(7)) {
            const cap = D(100).mul(this.player.levelItems[2] * (1 + this.player.setChip[28] * 0.3) + 1);
            mult = mult.mul(this.softCap(this.player.leveResetTime.add(1), cap));
        }

        if (this.isChallengeBonusActive(3)) mult = mult.mul(D(2));
        if (this.isRankChallengeBonusActive(3)) mult = mult.mul(D(3));

        if (this.isPerfectChallengeActive(0)) mult = mult.div(100);

        let x1 = 0.25;
        let x2 = 12;
        if (this.isPerfectChallengeActive(7)) {
            x1 = 1.0 / 81;
            x2 = 27;
        }

        mult = mult.mul(1 + this.smallMemory * 0.01 + this.memory * x1);
        if (this.isRankChallengeBonusActive(11))
            mult = mult.mul(D(2).pow(D(this.memory).div(x2)));

        mult = mult.mul(1 + Math.sqrt(this.pipedSmallMemory));

        if (this.player.onChallenge && this.isRankChallengeBonusActive(4)) {
            let cnt = 0;
            this.player.challenges.forEach(b => cnt += b ? 1 : 0);
            mult = mult.mul(1 + cnt * 0.25);
        }

        if (!this.isPerfectChallengeActive(8) && this.player.darkMoney.gte(1))
            mult = mult.mul(D(this.player.darkMoney.add(10).log10()).pow(1 + this.player.setChip[40] * 0.1));

        if (this.isRankChallengeBonusActive(9)) {
            mult = mult.mul(this.multByAc);
            if (this.multByAc.gt(1)) mult = mult.mul(this.multByAc);
        }

        mult = mult.mul(1 + this.player.setChip[0] * 0.1);

        let camp = this.player.accelLevelUsed;
        let d = new Date();
        if (d.getMonth() == 0 && d.getDate() <= 7) camp = camp + 1;
        // if (d.getMonth() == 1 && 8 <= d.getDate() && d.getDate() <= 14) camp = camp + 1;
        // if ((d.getMonth() == 1 && 25 <= d.getDate()) || ((d.getMonth() == 2 && d.getDate() <= 3))) camp = camp + 1;
        // if (d.getMonth() == 4 && 3 <= d.getDate() && d.getDate() <= 7) camp = camp + 1;
        if ((d.getMonth() == 6 && 29 <= d.getDate()) || ((d.getMonth() == 7 && d.getDate() <= 31)) camp = camp + 2;
        // if (d.getMonth() == 8 && 15 <= d.getDate() && d.getDate() <= 21) camp = camp + 1;

        if (camp > 7) camp = 7;
        mult = mult.mul(1 + 4 * camp);

        if (this.player.rings.outsideAuto.autoDoChallenge) {
            mult = mult.mul(0.001);
        }

        this.commonMult = mult;
    };

    calcIncrementMult(mu, i, to) {
        let mult = mu.mul(this.incrementalMults[i]);
        if (!this.isChallengeActive(4))
            mult = mult.mul(D(10).pow((i + 1) * (i - to)));
        let lv = D(this.player.level.pow(1 + 0.5 * this.player.setChip[19]).add(2).log2());
        let rk = this.player.rank.add(2).div(262142).log2();
        rk += D(this.player.rank.add(2).log2()).log2() * this.player.setChip[23];
        mult = mult.mul(D(lv.pow((i - to) * (1 + Math.max(rk, 0) * 0.05))));

        if (this.isPerfectChallengeActive(3) && mult.gt('1e-100')) {
            let b = Math.floor(mult.log10() / 6);
            mult = D(10).pow(b * 6);
        }
        return mult;
    };

    calcGeneratorExpr(mu = D(1)) {
        this.calcCommonMult();
        let highest = 0;
        for (let i = 0; i < 8; i++) if (this.player.generators[i].gt(0)) highest = i;
        for (let i = 0; i < 8; i++) this.calcBasicIncrementMult(i, highest);
        let g = Array.from(new Array(9), (_, i) => new Array(Math.max(0, highest + 2 - i)).fill(D(0)));
        g[0][0] = this.player.money;
        for (let i = 0; i <= highest; i++) g[i + 1][0] = this.player.generators[i];
        for (let i = highest + 1; i-- > 0;) {
            if (!this.isChallengeBonusActive(13)) {
                const to = this.player.generatorsMode[i];
                const mult = this.calcIncrementMult(mu, i, to);
                g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
            } else if (this.isChallengeActive(3)) {
                const to = 0;
                const mult = this.calcIncrementMult(mu, i, to).mul(i + 1);
                g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
            } else {
                for (let to = 0; to <= i; to++) {
                    const mult = this.calcIncrementMult(mu, i, to);
                    g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
                }
            }
            while (g[i].length > 0 && g[i][g[i].length - 1].eq(0)) g[i].pop();
        }
        return g;
    };
    calcAcceleratorExpr(mu = D(1)) {
        let highest = 0;
        for (let i = 1; i < 8; i++) if (this.player.accelerators[i].gt(0)) highest = i;
        let a = Array.from(new Array(8), (_, i) => new Array(Math.max(0, highest + 1 - i)).fill(D(0)));
        for (let i = 0; i <= highest; i++) a[i][0] = this.player.accelerators[i];
        for (let i = highest + 1; i-- > 1;) {
            let mult = mu;
            if (i == 1 ? this.isChallengeBonusActive(10) : this.isRankChallengeBonusActive(6))
                if (this.isRankChallengeBonusActive(10))
                    mult = mult.add(this.player.acceleratorsBought[i].pow_base(2));
                else
                    mult = mult.add(this.player.acceleratorsBought[i]);
            mult = mult.mul(D(1.5).pow(this.player.setChip[i + 10]));
            mult = mult.mul(1 + this.eachPipedSmallMemory[1] * 0.2);
            a[i].forEach((aa, j) => a[i - 1][j + 1] = a[i - 1][j + 1].add(aa.mul(mult)));
            while (a[i - 1].length > 0 && a[i - 1][a[i - 1].length - 1].eq(0)) a[i - 1].pop();
        }
        return a;
    };
    calcDarkGeneratorExpr(mu = D(1)) {
        let highest = 0;
        for (let i = 0; i < 8; i++) if (this.player.darkGenerators[i].gt(0)) highest = i;
        let d = Array.from(new Array(9), (_, i) => new Array(Math.max(0, highest + 2 - i)).fill(D(0)));
        d[0][0] = this.player.darkMoney;
        for (let i = 0; i <= highest; i++) d[i + 1][0] = this.player.darkGenerators[i];
        let darkMult = this.softCap(this.player.darkLevel.add(1), D(1e3));
        if (this.player.lightMoney.gte(1)){
            darkMult = darkMult.mul(this.player.lightMoney.log10()+1);
        }
        for (let i = highest + 1; i-- > 0;) {
            let mult = mu.mul(this.player.lightGenerators[i].add(1));
            mult = mult.mul(darkMult);
            mult = mult.mul(1 + this.player.setChip[41 + i] * 0.25);
            mult = mult.mul(1 + this.eachPipedSmallMemory[5] * 0.2);
            d[i + 1].forEach((dd, j) => d[i][j + 1] = d[i][j + 1].add(dd.mul(mult)));
            while (d[i].length > 0 && d[i][d[i].length - 1].eq(0)) d[i].pop();
        }
        return d;
    };
    calcLightGeneratorExpr(mu = D(1)) {
        let highest = 0;
        for (let i = 0; i < 8; i++) if (this.player.lightGenerators[i].gt(0)) highest = i;
        let d = Array.from(new Array(9), (_, i) => new Array(Math.max(0, highest + 2 - i)).fill(D(0)));
        d[0][0] = this.player.lightMoney;
        for (let i = 0; i <= highest; i++) d[i + 1][0] = this.player.lightGenerators[i];
        for (let i = highest + 1; i-- > 0;) {
            d[i + 1].forEach((dd, j) => d[i][j + 1] = d[i][j + 1].add(dd));
            while (d[i].length > 0 && d[i][d[i].length - 1].eq(0)) d[i].pop();
        }
        return d;
    }

    calcBasicIncrementMult(i, highest) {
        let mult = this.commonMult;
        if (!this.isChallengeActive(2)) {
            if ((i < highest || this.isChallengeBonusActive(2)) && this.player.generatorsBought[i].gt(0)) {
                let mm = this.player.generatorsBought[i];
                if (this.isChallengeBonusActive(11)) mm = mm.mul(mm.add(2).log2());
                mult = mult.mul(mm);
            }
        }

        if (i == 0 && this.isChallengeBonusActive(7)) {
            if (this.isRankChallengeBonusActive(7))
                mult = mult.mul(this.strongSoftCap(this.player.maxLevelGained, D(100000)));
            else
                mult = mult.mul(this.player.maxLevelGained.min(100000));
        }

        if (!this.isPerfectChallengeActive(8) && this.player.darkGenerators[i].gte(1))
            mult = mult.mul(D(i + 2 + this.player.darkGenerators[i].log10()).pow(1 + this.player.setChip[i + 32] * 0.25));

        mult = mult.mul(1 + this.player.setChip[i + 1] * 0.5);

        if (this.isPerfectChallengeActive(2)) {
            this.incrementalMults[2] = D(0);
            this.incrementalMults[5] = D(0);
        }

        this.incrementalMults[i] = mult;
    };

    updateGenerators(mu = D(1), tick = D(1), gExpr = this.calcGeneratorExpr(mu)) {
        this.player.money = Nig.calcAfterNTick(gExpr[0], tick);
        for (let i = 0; i < 8; i++) this.player.generators[i] = Nig.calcAfterNTick(gExpr[i + 1], tick);
    };
    baseTick() {
        const challengeBonusesCount = this.player.challengeBonuses.reduce((x, y) => x + (y ? 1 : 0), 0);
        let tickSpeed = 1000;
        if (this.isPerfectChallengeActive(1)) tickSpeed = 10000;
        tickSpeed += 500 * this.player.accelLevelUsed;
        tickSpeed -= this.player.setChip[9] * 50;
        tickSpeed -= this.player.levelItems[1] * challengeBonusesCount * (1 + this.player.setChip[27] * 0.5);
        for (let i = 0; i < 8; i++) {
            tickSpeed -= this.player.timeCrystal[i];
        }
        if (tickSpeed < 1) {tickSpeed = 1;}
        return tickSpeed;
    };
    updateTickSpeed() {
        const aMult = this.isChallengeBonusActive(6) ? (this.isRankChallengeBonusActive(10) ? this.player.acceleratorsBought[0].pow_base(2) : this.player.acceleratorsBought[0].add(1)) : D(1);
        let acNum = this.player.accelerators[0].mul(D(1.5).pow(this.player.setChip[10]));
        if (this.isRankChallengeBonusActive(13)) {
            for (let i = 1; i < 8; i++) acNum = acNum.mul(this.player.accelerators[i].add(1));
        }
        this.player.tickSpeed = this.baseTick() / acNum.add(10).mul(aMult).log10();
        this.multByAc = D(50).div(this.player.tickSpeed);
    };
    updateAccelerators(mu = D(1), tick = D(1), aExpr = this.calcAcceleratorExpr(mu)) {
        for (let i = 0; i < 8; i++) this.player.accelerators[i] = Nig.calcAfterNTick(aExpr[i], tick);
        this.updateTickSpeed();
    };
    updateDarkGenerators(mu = D(1), tick = D(1), dExpr = this.calcDarkGeneratorExpr(mu)) {
        this.player.darkMoney = Nig.calcAfterNTick(dExpr[0], tick);
        for (let i = 0; i < 8; i++) this.player.darkGenerators[i] = Nig.calcAfterNTick(dExpr[i + 1], tick);
    };
    updateLightGenerators(mu = D(1), tick = D(1), lExpr = this.calcLightGeneratorExpr(mu)){
        this.player.lightMoney = Nig.calcAfterNTick(lExpr[0], tick);
        for (let i = 0; i < 8; i++) this.player.lightGenerators[i] = Nig.calcAfterNTick(lExpr[i + 1], tick);
    }

    spendShine(num) {
        if (this.player.shine < num) return;
        if (this.isPerfectChallengeActive(6)) return;
        this.player.shine -= num;
        const val = D(11 + this.player.setChip[31]).pow(D(num).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
        if (this.player.trophies[9]) {
            this.player.residue += Math.floor(num * (1 + this.pchallengestage) / 1000000);
        }
    };
    spendBrightness(num) {
        if (this.player.brightness < num) return;
        if (this.isPerfectChallengeActive(6)) return;
        this.player.brightness -= num;
        const val = D(11 + this.player.setChip[50]).pow(D(num * 100).log10());
        const valDark = D(10 + this.player.setChip[51] * 0.25).pow(D(num).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
        this.updateDarkGenerators(valDark);
    };
    spendFlicker(num) {
        if (this.player.flicker < num) return;
        this.player.flicker -= num;
        const val = D(11 + this.player.setChip[50]).pow(D(num * 10000).log10());
        const valDark = D(10 + this.player.setChip[51] * 0.25).pow(D(num).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
        this.updateDarkGenerators(valDark);
        this.updateLightGenerators(valDark);
    }

    isChallengeActive(index) {
        return this.player.onChallenge && this.player.challenges[index]
    };
    isChallengeBonusActive(index) {
        return this.player.challengeBonuses[4] || !this.player.onChallenge ? this.player.challengeBonuses[index] : false;
    };
    isRankChallengeBonusActive(index) {
        return this.player.rankChallengeBonuses[index];
    };
    isPerfectChallengeActive(index) {
        return this.player.onPChallenge && this.player.pChallenges[index];
    };

    isGeneratorBuyable(index) {
        if (this.isChallengeActive(6)) if (index == 3 || index == 7) return false;
        return this.player.money.gte(this.player.generatorsCost[index]);
    };
    calcGeneratorCost(index, bought, update = false) {
        const mult = bought.neq(0) && this.isChallengeActive(1) ? 2 : 1;
        let p = (index === 0 ? bought : bought.add(index + 1).mul(index + 1)).mul(mult);
        p = p.sub(this.eachPipedSmallMemory[0] * 0.2);
        const cost = p.pow_base(10);
        if (update) this.player.generatorsCost[index] = cost;
        return cost;
    };
    buyGenerator(index) {
        if (!this.isGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.generatorsCost[index]);
        this.player.generators[index] = this.player.generators[index].add(1);
        this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1);
        this.calcGeneratorCost(index, this.player.generatorsBought[index], true);
        return true;
    };

    isAcceleratorOpened(index) {
        if (index >= 1 && this.player.leveResetTime.lte(0)) return false;
        if (index >= 2 && index < 7 && this.player.levelItems[3] + 1 < index) return false;
        if (index == 7 && (this.player.levelItems[3] != 5 || this.player.accelLevel <= 0)) return false;
        return true;
    };
    isAcceleratorBuyable(index) {
        if (this.isChallengeActive(5)) return false;
        if (!this.isAcceleratorOpened(index)) return false;
        return this.player.money.gte(this.player.acceleratorsCost[index]);
    };
    calcAcceleratorCost(index, bought, update = false) {
        let p = bought.add(1);
        p = p.mul(p.add(1)).div(2);
        p = p.mul(index === 0 ? 1 : D(10).mul(D(2).pow(index - 1)));
        p = p.sub(this.eachPipedSmallMemory[3] * 0.2 * (index + 1));
        const cost = p.pow_base(10);
        if (update) this.player.acceleratorsCost[index] = cost;
        return cost;
    };
    buyAccelerator(index) {
        if (!this.isAcceleratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index]);
        this.player.accelerators[index] = this.player.accelerators[index].add(1);
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1);
        this.calcAcceleratorCost(index, this.player.acceleratorsBought[index], true);
        return true;
    };

    isDarkGeneratorBuyable(index) {
        return this.player.money.gte(this.player.darkGeneratorsCost[index]);
    };
    calcDarkGeneratorCost(index, bought, update = false) {
        let p = 100 + (index == 0 ? 0 : (index + 1) * (index + 1) * (index + 1));
        let q = bought.mul(index + 1).mul(index + 1);
        q = q.add(p);
        q = q.sub(this.eachPipedSmallMemory[8] * 0.02 * (index + 1) * (index + 1));
        const cost = D(10).pow(q);
        if (update) this.player.darkGeneratorsCost[index] = cost;
        return cost;
    };
    buyDarkGenerator(index) {
        if (!this.isDarkGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.darkGeneratorsCost[index]);
        this.player.darkGenerators[index] = this.player.darkGenerators[index].add(1);
        this.player.darkGeneratorsBought[index] = this.player.darkGeneratorsBought[index].add(1);
        this.calcDarkGeneratorCost(index, this.player.darkGeneratorsBought[index], true);
        return true;
    };

    isLightGeneratorBuyable(index) {
        return this.player.money.gte(this.player.lightGeneratorsCost[index]);
    };
    calcLightGeneratorCost(index, bought, update = false) {
        let p = 200 + (index === 0 ? 0 : (index + 1) * (index + 1) * (index + 1) * (index + 1));
        let q = bought.mul(index + 1).mul(index + 1).mul(index + 1);
        q = q.add(p);
        const cost = D(10).pow(q);
        if (update) this.player.lightGeneratorsCost[index] = cost;
        return cost;
    };
    buyLightGenerator(index) {
        if (!this.isLightGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.lightGeneratorsCost[index]);
        this.player.lightGenerators[index] = this.player.lightGenerators[index].add(1);
        this.player.lightGeneratorsBought[index] = this.player.lightGeneratorsBought[index].add(1);
        this.calcLightGeneratorCost(index, this.player.lightGeneratorsBought[index], true);
        return true;
    };

    calcToken() {
        const challengeId = this.calcPerfectChallengeId();
        let spent = 0;
        this.player.challengeBonuses.forEach((value, index) => {
            if (value) {
                spent += itemData.rewardCost[index];
            }
        });
        let t = this.player.challengeCleared.length;
        if (this.player.onPChallenge) {
            t = Math.max(t, this.player.pChallengeCleared[challengeId]);
        }
        this.player.token = t - spent;

        spent = 0;
        this.player.rankChallengeBonuses.forEach((value, index) => {
            if (value) {
                spent += itemData.rewardCost[index];
            }
        });
        t = this.player.rankChallengeCleared.length;
        if (this.player.onPChallenge) {
            t = Math.max(t, this.player.pRChallengeCleared[challengeId]);
        }
        this.player.rankToken = t - spent;

    };
    checkPChallengeCleared(){
      let cnt = 0;
      for (let i = 0; i < 1024; i++) {
        cnt += this.player.pChallengeCleared[i]
        cnt += this.player.pRChallengeCleared[i]
      }

      cnt /= 510;
      this.pChallengeStage = Math.floor(cnt);
    }

    isRewardToggleable(index) {
        return this.player.challengeBonuses[index] || (this.player.token >= itemData.rewardCost[index]);
    };
    toggleReward(index) {
        if (this.isRewardToggleable(index)) {
            if (this.player.challengeBonuses[index])
                this.player.token += itemData.rewardCost[index];
            else
                this.player.token -= itemData.rewardCost[index];
            this.player.challengeBonuses[index] = !this.player.challengeBonuses[index];
            this.updateTickSpeed();
        }
    };
    isRankRewardToggleable(index) {
        return this.player.rankChallengeBonuses[index] || (this.player.rankToken >= itemData.rewardCost[index]);
    };
    toggleRankReward(index) {
        if (this.isRankRewardToggleable(index)) {
            if (this.player.rankChallengeBonuses[index])
                this.player.rankToken += itemData.rewardCost[index];
            else
                this.player.rankToken -= itemData.rewardCost[index];
            this.player.rankChallengeBonuses[index] = !this.player.rankChallengeBonuses[index];
            this.updateTickSpeed();
        }
    };

    isLevelItemBuyable(index) {
        if (!this.player.rankResetTime.gt(0)) return false;
        const cost = this.calcLevelItemCost(index);
        return !(this.player.level.lt(cost) || this.player.levelItems[index] >= 5);
    };
    calcLevelItemCost(index) {
        const d = index + 1;
        const cost = itemData.levelItemCost[index].pow(this.player.levelItems[index] + 1);
        let dec = 0;
        for (let i = 1; i <= 5; i++) {
            if (4 * i * i * d * d * d <= this.player.levelItemBought) dec = i;
        }
        return cost.div(D(10).pow(dec)).max(1);
    };
    buyLevelItems(index) {
        if (!this.player.rankResetTime.gt(0)) return;
        const cost = this.calcLevelItemCost(index);
        if (this.player.level.lt(cost) || this.player.levelItems[index] >= 5) return;
        this.player.level = this.player.level.sub(cost);
        this.player.levelItems[index] = this.player.levelItems[index] + 1;
        if (this.player.levelItemBought < 100000) this.player.levelItemBought = this.player.levelItemBought + 1;
    };

    configChallenge(index) {
        if (this.player.onChallenge) return;
        this.player.challenges[index] = !this.player.challenges[index];
    };
    configPerfectChallenge(index) {
        if (this.player.onPChallenge) return;
        this.player.pChallenges[index] = !this.player.pChallenges[index];
    };

    isGeneratorModeChangeable() {
        return !this.isChallengeActive(3) && !this.isChallengeBonusActive(13);
    };
    resetGeneratorMode() {
        if (this.isGeneratorModeChangeable()) this.player.generatorsMode = new Array(8).fill(null).map((_, i) => i);
    };
    changeMode(index) {
        if (this.isChallengeActive(3)) return;
        this.player.generatorsMode[index] += 1;
        if (this.player.generatorsMode[index] > index) {
            this.player.generatorsMode[index] = 0;
        }
    };

    calcGainLevel(x) {
        const money = x === undefined ? this.player.money : x;
        const dividing = Math.max(1, 19 - this.player.rank.add(2).log2());
        let mny = money.log10() - 17;
        mny = D(mny).pow(this.player.setChip[18]);
        let gainLevel = D(money.mul(mny).log10()).div(dividing).pow_base(2);

        const glMin = D(18).div(dividing).pow_base(2);
        const glMax = this.player.maxLevelGained.div(2);

        if (!glMin.add(0.1).gte(glMax)) {
            if (gainLevel.lt(glMax)) {
                let percent = D(1).sub(gainLevel.sub(glMin).div(glMax.sub(glMin)));
                percent = percent.pow(1 + this.player.levelItems[0] * (1 + this.player.setChip[26] * 2));
                percent = D(1).sub(percent);
                if (gainLevel.neq(glMin) && percent.lt('1e-5')) {
                    gainLevel = gainLevel.mul(1 + this.player.levelItems[0] * (1 + this.player.setChip[26] * 2));
                } else {
                    gainLevel = glMax.sub(glMin).mul(percent).add(glMin);
                }
            }
        }

        if (this.isPerfectChallengeActive(4)) gainLevel = D(gainLevel.log2()).max(1);
        gainLevel = gainLevel.round().max(1);

        gainLevel = gainLevel.mul(1 + this.eachPipedSmallMemory[2] * 0.2);
        if (this.isChallengeBonusActive(12)) gainLevel = gainLevel.mul(2);
        return gainLevel;
    };
    calcGainRank(x) {
        const money = x === undefined ? this.player.money : x;
        let dv = 36 - 0.25 * this.countRemembers() - 1.2 * this.player.levelItems[4] * (1 + 0.2 * this.player.setChip[29]);
        dv = Math.max(dv, 6);
        dv = dv - this.player.crown.add(2).log2() * 0.1;
        dv = Math.max(dv, 3);
        let gainRank = D(money.log10()).div(dv).pow_base(2).round();
        if (this.isPerfectChallengeActive(5)) gainRank = D(gainRank.log10()).max(1);
        if (this.isRankChallengeBonusActive(12)) gainRank = gainRank.mul(3);
        gainRank = gainRank.mul(1 + this.player.setChip[22] * 0.5);
        gainRank = gainRank.mul(1 + this.eachPipedSmallMemory[4] * 0.2);
        return gainRank;
    };
    calcGainCrown(x) {
        const money = x === undefined ? this.player.money : x;
        let dv = 72;
        return D(2).pow(money.log10() / dv).round();
    };
    calcGainDarkLevel(x) {
        const money = x === undefined ? this.player.darkMoney : x;
        let dv = 18 - this.player.crown.add(2).log2();
        dv = Math.max(dv, 1);
        return D(money.log10()).div(dv).pow_base(2).round();
    };

    resetLevelBorder() {
        return D(this.isChallengeActive(0) ? '1e24' : '1e18');
    };
    resetRankBorder() {
        let remember = this.countRemembers();
        if (this.isPerfectChallengeActive(7)) remember = Math.pow(remember, 0.5);
        return D(10).pow((this.isChallengeActive(0) ? 96 : 72) - Math.min(remember / 2.0, 36));
    };
    resetCrownBorder() {
        return D('1e216');
    };

    resetLevel(_force, exit, challenge) {
        const gainLevel = this.calcGainLevel();
        let rankResetTime = this.player.rankResetTime.add(1);
        if (this.isPerfectChallengeActive(4)) rankResetTime = rankResetTime.pow(0.1).round();
        const gainLevelReset = rankResetTime.mul(1 + this.player.setChip[20]).mul(D(exit ? 0 : this.isChallengeBonusActive(8) ? 2 : 1));

        let isChallengeClear = false;
        if (this.player.onChallenge) {
            this.player.onChallenge = false;
            const id = this.calcChallengeId();
            if (!this.player.challengeCleared.includes(id)) {
                this.player.challengeCleared.push(id);
                isChallengeClear = true;
            }
        } else if (challenge) {
            this.player.onChallenge = true;
            if (this.player.challenges[3])
                this.player.generatorsMode = new Array(8).fill(0);
        }
        if (this.isPerfectChallengeActive(9) && (!exit) && (!isChallengeClear)) {
            const randomInt = Math.floor(Math.random() * 100);
            this.configChip(randomInt, 0);
            this.player.disabledChip[randomInt] = true;
        }

        this.player.level = this.player.level.add(exit ? D(0) : gainLevel);
        this.player.leveResetTime = this.player.leveResetTime.add(gainLevelReset);
        this.player.maxLevelGained = this.player.maxLevelGained.max(exit ? D(0) : gainLevel);
        if (this.player.accelLevel > 0) {
            for (let i = 0; i < 8; i++) {
                let crystalNum = Math.floor(this.player.accelerators[i].log10()) - 10;
                if (crystalNum < 0) {crystalNum = 0;}
                if (crystalNum > 100) {crystalNum = 100;}
                this.player.timeCrystal[i] = Math.max(this.player.timeCrystal[i], crystalNum);
            }
        }
        this.resetLevelData()
    };
    //TODO: resetRank is not tested.
    resetRank(force) {
        let gainRank = this.calcGainRank();
        if (!force && !confirm('昇階リセットして、階位' + gainRank + 'を得ますか？')) return;
        if (this.player.onChallenge) {
            this.player.onChallenge = false;
            let id = this.calcChallengeId();
            if (this.player.challengeCleared.length >= 128 && !this.player.rankChallengeCleared.includes(id)) {
                this.player.rankChallengeCleared.push(this.calcChallengeId());
            }
        }
        let gainTime = this.isRankChallengeBonusActive(8) ? D(3) : D(1);
        gainTime = gainTime.mul(this.player.setChip[24] + 1).mul(this.player.crownResetTime.add(1));
        this.player.rank = this.player.rank.add(gainRank);
        this.player.rankResetTime = this.player.rankResetTime.add(gainTime);
        this.resetRankData();
    };
    resetCrown(force, exit) {
        let gainCrown = this.calcGainCrown();
        if (!force && !confirm('昇冠リセットして、冠位' + gainCrown + 'を得ますか？')) return;
        if (!exit) {
            this.player.crown = this.player.crown.add(gainCrown);
            this.player.crownResetTime = this.player.crownResetTime.add(1);
        }
        this.resetCrownData();
    };

    resetLevelData() {
        this.player.money = D(1);

        this.player.generators = new Array(8).fill(D(0));
        this.player.generatorsBought = new Array(8).fill(D(0));
        for (let i = 0; i < 8; i++) this.calcGeneratorCost(i, this.player.generatorsBought[i], true);

        this.player.accelerators = new Array(8).fill(D(0));
        this.player.acceleratorsBought = new Array(8).fill(D(0));
        for (let i = 0; i < 8; i++) this.calcAcceleratorCost(i, this.player.acceleratorsBought[i], true);

        this.player.tickSpeed = 1000;

        if (this.isChallengeBonusActive(0)) this.player.money = D(10001);
        if (this.isChallengeBonusActive(1)) this.player.accelerators[0] = D(10);
        if (this.isRankChallengeBonusActive(0)) this.player.money = this.player.money.add(D('1e9'));
        if (this.isRankChallengeBonusActive(1)) this.player.accelerators[0] = this.player.accelerators[0].add(256);
        this.calcToken();
    };
    resetRankData() {
        this.player.level = D(0);
        this.player.leveResetTime = D(0);
        this.player.levelItems = new Array(5).fill(0);
        this.resetLevelData();
    };
    resetCrownData() {
        this.player.rank = D(0);
        this.player.rankResetTime = D(0);
        this.resetRankData();
    };

    calcChallengeId() {
        let challengeId = 0;
        for (let i = 0; i < 8; i++)
            challengeId = challengeId * 2 + (this.player.challenges[i] ? 1 : 0);
        return challengeId;
    };
    calcPerfectChallengeId() {
        let id = 0;
        for (let i = 9; i >= 0; i--) {
            id = id * 2 + (this.player.pChallenges[i] ? 1 : 0);
        }
        return id;
    };

    startChallenge() {
        this.resetLevel(true, true, true);
    };
    exitChallenge() {
        this.player.onChallenge = false;
        if (this.player.challenges[1]) {
            for (let i = 0; i < 8; i++)
                this.player.generatorsCost[i] = this.calcGeneratorCost(i, this.player.generatorsBought[i]);
        }
    };
    isStartPerfectChallenge() {
        if (!(this.player.challengeCleared.length >= 255 && this.player.rankChallengeCleared.length >= 255)) {
            return false;
        }
        const count = this.player.pChallenges.reduce((x, y) => x + (y ? 1 : 0), 0);
        for (let i = 0; i < 10; i++) {
            if (this.player.statue[i] < count - i) {
                return false;
            }
        }
        return true;
    }
    startPerfectChallenge(reset) {
        if (!this.isStartPerfectChallenge()) return false;
        if (reset) {
            this.resetCrown(true, true);
            this.player.challengeCleared = [];
            this.player.challengeBonuses = [];
            this.player.rankChallengeCleared = [];
            this.player.rankChallengeBonuses = [];
        }
        this.player.onPChallenge = true;
        this.calcToken();
        return true;
    };
    exitPerfectChallenge() {
        const id = this.calcPerfectChallengeId();
        if (this.player.onChallenge) this.exitChallenge();
        this.player.onPChallenge = false;
        this.player.pChallengeCleared[id] = Math.max(this.player.pChallengeCleared[id], this.player.challengeCleared.length);
        this.player.pRChallengeCleared[id] = Math.max(this.player.pRChallengeCleared[id], this.player.rankChallengeCleared.length);
        this.player.challengeCleared = [];
        this.player.rankChallengeCleared = [];
        for (let i = 1; i < 256; i++) {
            this.player.challengeCleared.push(i);
            this.player.rankChallengeCleared.push(i);
        }
        this.player.disabledChip = new Array(SET_CHIP_NUM).fill(false);
        this.calcToken();
        this.checkPChallengeCleared();
    };

    moveWorld(i) {
        if (this.world == i || !this.worldOpened[i]) return;
        this.world = i;
        this.loadPlayer(this.players[this.world]);
    };
    calcMaxPipe() {
        if (this.player.trophies[9]) return 3;
        if (this.player.trophies[7]) return 2;
        return 1;
    };
    openPipe(i) {
        let maxPipe = this.calcMaxPipe();
        if (this.player.worldPipe[i] >= maxPipe) return;
        let havePipe = Math.floor((this.smallMemory - 72) / 3);
        for (let j = 0; j < 10; j++) {
            havePipe -= this.player.worldPipe[j];
        }
        if (havePipe > 0) this.player.worldPipe[i] += 1;
    };

    isStatueBuildable(i) {
        let cost = this.calcStatueCost(i);
        if (this.player.chip[i] < cost) return false;
        return true;
    };
    calcStatueCost(i) {
        return (this.player.statue[i] + 1) * 10000;
    };
    buildStatue(i) {
        let cost = this.calcStatueCost(i);
        if (this.player.chip[i] < cost) return;
        this.player.chip[i] -= cost;
        this.player.statue[i] += 1;
    };

    checkTrophies() {
        if (this.player.leveResetTime.gt(0)) this.player.trophies[0] = true;
        if (this.player.rankResetTime.gt(0)) this.player.trophies[1] = true;
        if (this.player.shine > 0) this.player.trophies[2] = true;
        if (this.player.challengeCleared.includes(238) || this.player.challengeCleared.length >= 100) this.player.trophies[3] = true;
        if (this.player.brightness > 0) this.player.trophies[5] = true;
        if (this.player.remember > 0) this.player.trophies[6] = true;
        if (this.world == 0 && this.countRemembers() > 0) this.player.trophies[6] = true;
        if (this.player.crownResetTime.gt(0)) this.player.trophies[7] = true;
        if (this.player.lightGenerators[0].gt(0)) this.player.trophies[8] = true;
        if (this.player.flicker > 0) this.player.trophies[9] = true;

        if (this.player.money.gt(0)) this.player.smallTrophies[0] = true;
        if (this.player.money.gt(777)) this.player.smallTrophies[1] = true;
        if (this.player.money.gt(7777777)) this.player.smallTrophies[2] = true;
        if (this.player.money.gt('1e19')) this.player.smallTrophies[3] = true;
        if (this.player.money.gt('1e36')) this.player.smallTrophies[4] = true;
        if (this.player.money.gt('1e77')) this.player.smallTrophies[5] = true;
        if (this.player.money.gt('1e81')) this.player.smallTrophies[6] = true;
        if (this.player.money.gt('1e303')) this.player.smallTrophies[7] = true;
        if (this.player.generatorsBought[0].gt(0)) this.player.smallTrophies[8] = true;
        if (this.player.generatorsBought[1].gt(0)) this.player.smallTrophies[9] = true;
        if (this.player.generatorsBought[2].gt(0)) this.player.smallTrophies[10] = true;
        if (this.player.generatorsBought[3].gt(0)) this.player.smallTrophies[11] = true;
        if (this.player.generatorsBought[4].gt(0)) this.player.smallTrophies[12] = true;
        if (this.player.generatorsBought[5].gt(0)) this.player.smallTrophies[13] = true;
        if (this.player.generatorsBought[6].gt(0)) this.player.smallTrophies[14] = true;
        if (this.player.generatorsBought[7].gt(0)) this.player.smallTrophies[15] = true;
        if (this.player.acceleratorsBought[0].gt(0)) this.player.smallTrophies[16] = true;
        if (this.player.acceleratorsBought[1].gt(0)) this.player.smallTrophies[17] = true;
        if (this.player.acceleratorsBought[2].gt(0)) this.player.smallTrophies[18] = true;
        if (this.player.acceleratorsBought[3].gt(0)) this.player.smallTrophies[19] = true;
        if (this.player.acceleratorsBought[4].gt(0)) this.player.smallTrophies[20] = true;
        if (this.player.acceleratorsBought[5].gt(0)) this.player.smallTrophies[21] = true;
        if (this.player.acceleratorsBought[6].gt(0)) this.player.smallTrophies[22] = true;
        if (this.player.acceleratorsBought[7].gt(0)) this.player.smallTrophies[23] = true;
        if (this.player.leveResetTime.gt(200)) this.player.smallTrophies[24] = true;
        if (this.player.leveResetTime.gt(999)) this.player.smallTrophies[25] = true;
        if (this.player.challengeCleared.includes(128)) this.player.smallTrophies[26] = true;
        if (this.player.challengeCleared.includes(64)) this.player.smallTrophies[27] = true;
        if (this.player.challengeCleared.includes(32)) this.player.smallTrophies[28] = true;
        if (this.player.challengeCleared.includes(16)) this.player.smallTrophies[29] = true;
        if (this.player.challengeCleared.includes(8)) this.player.smallTrophies[30] = true;
        if (this.player.challengeCleared.includes(4)) this.player.smallTrophies[31] = true;
        if (this.player.challengeCleared.includes(2)) this.player.smallTrophies[32] = true;
        if (this.player.challengeCleared.includes(1)) this.player.smallTrophies[33] = true;
        if (this.player.challengeCleared.length >= 32) this.player.smallTrophies[34] = true;
        if (this.player.challengeCleared.length >= 64) this.player.smallTrophies[35] = true;
        if (this.player.challengeCleared.length >= 96) this.player.smallTrophies[36] = true;
        if (this.player.challengeCleared.length >= 128) this.player.smallTrophies[37] = true;
        if (this.player.challengeCleared.length >= 160) this.player.smallTrophies[38] = true;
        if (this.player.challengeCleared.length >= 192) this.player.smallTrophies[39] = true;
        if (this.player.challengeCleared.length >= 224) this.player.smallTrophies[40] = true;
        if (this.player.challengeCleared.length >= 255) this.player.smallTrophies[41] = true;
        if (this.player.rankResetTime.gt(1)) this.player.smallTrophies[42] = true;
        if (this.player.rankResetTime.gt(4)) this.player.smallTrophies[43] = true;
        if (this.player.rankResetTime.gt(9)) this.player.smallTrophies[44] = true;
        if (this.player.rankResetTime.gt(99)) this.player.smallTrophies[45] = true;
        if (this.player.rankResetTime.gt(999)) this.player.smallTrophies[46] = true;
        if (this.player.levelItemBought >= 4) this.player.smallTrophies[47] = true;
        if (this.player.levelItemBought >= 108) this.player.smallTrophies[48] = true;
        if (this.player.levelItemBought >= 256) this.player.smallTrophies[49] = true;
        if (this.player.levelItemBought >= 1728) this.player.smallTrophies[50] = true;
        if (this.player.levelItemBought >= 12500) this.player.smallTrophies[51] = true;
        if (this.player.shine >= 100) this.player.smallTrophies[52] = true;
        if (this.player.shine >= 1000) this.player.smallTrophies[53] = true;
        if (this.player.shine >= 10000) this.player.smallTrophies[54] = true;
        if (this.player.shine >= 100000) this.player.smallTrophies[55] = true;
        if (this.player.shine >= 1000000) this.player.smallTrophies[56] = true;
        if (this.player.shine >= 10000000) this.player.smallTrophies[57] = true;
        // if (this.exported.length >= 2) this.player.smallTrophies[58] = true;
        // if (this.player.tweeting.length >= 2) this.player.smallTrophies[59] = true;
        if (this.player.darkGenerators[0].gte(1)) this.player.smallTrophies[60] = true;
        if (this.player.darkGenerators[1].gte(1)) this.player.smallTrophies[61] = true;
        if (this.player.darkGenerators[2].gte(1)) this.player.smallTrophies[62] = true;
        if (this.player.darkGenerators[3].gte(1)) this.player.smallTrophies[63] = true;
        if (this.player.darkGenerators[4].gte(1)) this.player.smallTrophies[64] = true;
        if (this.player.darkGenerators[5].gte(1)) this.player.smallTrophies[65] = true;
        if (this.player.darkGenerators[6].gte(1)) this.player.smallTrophies[66] = true;
        if (this.player.darkGenerators[7].gte(1)) this.player.smallTrophies[67] = true;
        if (this.player.rankChallengeCleared.length >= 32) this.player.smallTrophies[68] = true;
        if (this.player.rankChallengeCleared.length >= 64) this.player.smallTrophies[69] = true;
        if (this.player.rankChallengeCleared.length >= 96) this.player.smallTrophies[70] = true;
        if (this.player.rankChallengeCleared.length >= 128) this.player.smallTrophies[71] = true;
        if (this.player.rankChallengeCleared.length >= 160) this.player.smallTrophies[72] = true;
        if (this.player.rankChallengeCleared.length >= 192) this.player.smallTrophies[73] = true;
        if (this.player.rankChallengeCleared.length >= 224) this.player.smallTrophies[74] = true;
        if (this.player.rankChallengeCleared.length >= 255) this.player.smallTrophies[75] = true;
        if (this.player.brightness >= 10) this.player.smallTrophies[76] = true;
        if (this.player.brightness >= 100) this.player.smallTrophies[77] = true;
        if (this.player.brightness >= 1000) this.player.smallTrophies[78] = true;
        if (this.player.brightness >= 10000) this.player.smallTrophies[79] = true;
        if (this.player.darkMoney.gte(1)) this.player.smallTrophies[80] = true;
        if (this.player.darkMoney.gte(777)) this.player.smallTrophies[81] = true;
        if (this.player.darkMoney.gte(7777777)) this.player.smallTrophies[82] = true;
        if (this.player.darkMoney.gte('1e18')) this.player.smallTrophies[83] = true;
        if (this.player.darkMoney.gte('1e72')) this.player.smallTrophies[84] = true;
        if (this.player.chip[0] > 0) this.player.smallTrophies[85] = true;
        if (this.player.chip[0] >= 210) this.player.smallTrophies[86] = true;
        if (this.player.chip[0] >= 1275) this.player.smallTrophies[87] = true;
        if (this.player.chip[1] > 0) this.player.smallTrophies[88] = true;
        if (this.player.chip[1] >= 210) this.player.smallTrophies[89] = true;
        if (this.player.chip[1] >= 1275) this.player.smallTrophies[90] = true;
        if (this.player.chip[2] > 0) this.player.smallTrophies[91] = true;
        if (this.player.chip[2] >= 210) this.player.smallTrophies[92] = true;
        if (this.player.chip[2] >= 1275) this.player.smallTrophies[93] = true;
        if (this.player.chip[3] > 0) this.player.smallTrophies[94] = true;
        if (this.player.chip[3] >= 210) this.player.smallTrophies[95] = true;
        if (this.player.chip[3] >= 1275) this.player.smallTrophies[96] = true;
        if (this.player.darkLevel.greaterThan(0)) this.player.smallTrophies[97] = true;
        if (this.player.darkLevel.greaterThan('1e3')) this.player.smallTrophies[98] = true;
        if (this.player.darkLevel.greaterThan('1e10')) this.player.smallTrophies[99] = true;

        if (this.player.crownResetTime.gt(0)) {
            if (this.player.crownResetTime.gt(0)) this.player.smallTrophies2nd[0] = true;
            if (this.player.crownResetTime.gte(5)) this.player.smallTrophies2nd[1] = true;
            if (this.player.crownResetTime.gte(20)) this.player.smallTrophies2nd[2] = true;
            if (this.player.crownResetTime.gte(100)) this.player.smallTrophies2nd[3] = true;
            if (this.player.accelLevel >= 1) this.player.smallTrophies2nd[4] = true;
            if (this.player.accelLevel >= 3) this.player.smallTrophies2nd[5] = true;
            if (this.player.accelLevel >= 6) this.player.smallTrophies2nd[6] = true;
            if (this.player.accelLevel >= 10) this.player.smallTrophies2nd[7] = true;
            if (this.player.rank.gt('1e8')) this.player.smallTrophies2nd[8] = true;
            if (this.player.rank.gt('1e10')) this.player.smallTrophies2nd[9] = true;
            if (this.player.rank.gt('1e12')) this.player.smallTrophies2nd[10] = true;
            if (this.player.lightGenerators[0].gte(1)) this.player.smallTrophies2nd[11] = true;
            if (this.player.lightGenerators[1].gte(1)) this.player.smallTrophies2nd[12] = true;
            if (this.player.lightGenerators[2].gte(1)) this.player.smallTrophies2nd[13] = true;
            if (this.player.lightGenerators[3].gte(1)) this.player.smallTrophies2nd[14] = true;
            if (this.player.lightGenerators[4].gte(1)) this.player.smallTrophies2nd[15] = true;
            if (this.player.lightGenerators[5].gte(1)) this.player.smallTrophies2nd[16] = true;
            if (this.player.lightGenerators[6].gte(1)) this.player.smallTrophies2nd[17] = true;
            if (this.player.lightGenerators[7].gte(1)) this.player.smallTrophies2nd[18] = true;
            if (this.player.chip[4] > 0) this.player.smallTrophies2nd[19] = true;
            if (this.player.chip[4] >= 210) this.player.smallTrophies2nd[20] = true;
            if (this.player.chip[4] >= 1275) this.player.smallTrophies2nd[21] = true;
            if (this.player.statue[0] >= 10) this.player.smallTrophies2nd[22] = true;
            if (this.player.statue[1] >= 10) this.player.smallTrophies2nd[23] = true;
            if (this.player.statue[2] >= 10) this.player.smallTrophies2nd[24] = true;
            if (this.player.statue[3] >= 10) this.player.smallTrophies2nd[25] = true;
            if (this.player.crown.gte(100)) this.player.smallTrophies2nd[26] = true
            if (this.player.crown.gte(10000)) this.player.smallTrophies2nd[27] = true
            if (this.player.crown.gte("1e8")) this.player.smallTrophies2nd[28] = true
            if (this.player.lightMoney.gte(1)) this.player.smallTrophies2nd[29] = true
            if (this.player.lightMoney.gte("1e9")) this.player.smallTrophies2nd[30] = true
            if (this.player.lightMoney.gte("1e18")) this.player.smallTrophies2nd[31] = true
            if (this.player.lightMoney.gte("1e36")) this.player.smallTrophies2nd[32] = true
            if (this.player.flicker >= 10) this.player.smallTrophies2nd[33] = true
            if (this.player.flicker >= 100) this.player.smallTrophies2nd[34] = true
            if (this.player.flicker >= 1000) this.player.smallTrophies2nd[35] = true
            if (this.player.flicker >= 10000) this.player.smallTrophies2nd[36] = true
            if (this.player.flicker >= 100000) this.player.smallTrophies2nd[37] = true
            if (this.player.flicker >= 1000000) this.player.smallTrophies2nd[38] = true
            if (this.player.chip[5] > 0) this.player.smallTrophies2nd[39] = true
            if (this.player.chip[5] >= 210) this.player.smallTrophies2nd[40] = true
            if (this.player.chip[5] >= 1275) this.player.smallTrophies2nd[41] = true
            if (this.player.chip[6] > 0) this.player.smallTrophies2nd[42] = true
            if (this.player.chip[6] >= 210) this.player.smallTrophies2nd[43] = true
            if (this.player.chip[6] >= 1275) this.player.smallTrophies2nd[44] = true
            if (this.player.statue[4] >= 10) this.player.smallTrophies2nd[45] = true
            if (this.player.statue[5] >= 10) this.player.smallTrophies2nd[46] = true
            if (this.player.statue[6] >= 10) this.player.smallTrophies2nd[47] = true
            if (this.player.statue[0] >= 64) this.player.smallTrophies2nd[48] = true
            if (this.player.statue[1] >= 64) this.player.smallTrophies2nd[49] = true
            if (this.player.statue[2] >= 64) this.player.smallTrophies2nd[50] = true
            if (this.player.statue[3] >= 64) this.player.smallTrophies2nd[51] = true
            if (this.player.statue[4] >= 64) this.player.smallTrophies2nd[52] = true
            if (this.player.statue[5] >= 64) this.player.smallTrophies2nd[53] = true
            if (this.player.statue[6] >= 64) this.player.smallTrophies2nd[54] = true
        }
    };
    checkMemories() {
        this.memory = 0;
        for (let i = 0; i < 10; i++) {
            if (this.world == i) continue;
            this.memory += this.players[i].trophies.reduce((x, y) => x + (y ? 1 : 0), 0);
        }
    };
    checkPipedSmallMemories() {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            if (this.players[i].worldPipe[this.world] >= 1) {
                let cnt = this.smallMemories[i];
                cnt -= 75;
                cnt *= this.players[i].worldPipe[this.world];
                this.eachPipedSmallMemory[i] = cnt;
                sum += cnt;
            } else {
                this.eachPipedSmallMemory[i] = 0;
            }
        }
        this.pipedSmallMemory = sum;
    };
    checkSmallMemories() {
        for (let i = 0; i < 10; i++) {
            this.smallMemories[i] = this.players[i].smallTrophies.reduce((x, y) => x + (y ? 1 : 0), 0);
            this.smallMemories[i] += this.players[i].smallTrophies2nd.reduce((x, y) => x + (y ? 1 : 0), 0);
        }
        this.smallMemory = this.smallMemories[this.world];
    };
    countRemembers() {
        let cnt = 0;
        for (let i = this.world + 1; i < 10; i++)
            cnt += this.players[i].remember;
        return cnt;
    };
    checkWorlds() {
        this.worldOpened[0] = true;
        if (D(this.players[0].crownResetTime).gt(0)) {
            for (let i = 1; i < 10; i++) {
                this.worldOpened[i] = true;
            }
        }
        if (this.players[0].challengeCleared.includes(238)) this.worldOpened[1] = true;
        if (this.players[0].challengeCleared.length >= 100) this.worldOpened[2] = true;
        if (this.players[0].rankChallengeCleared.length >= 16) this.worldOpened[3] = true;
        if (this.players[0].levelItemBought >= 12500) this.worldOpened[4] = true;
        if (D(this.players[0].darkMoney).gte('1e8')) this.worldOpened[5] = true;
        if (D(this.players[0].rank).gte(262142)) this.worldOpened[6] = true;
        if (this.players[0].rankChallengeCleared.includes(238)) this.worldOpened[7] = true;
        if (this.players[0].challengeCleared.length >= 200) this.worldOpened[8] = true;
        if (this.players[0].rankChallengeCleared.length >= 200) this.worldOpened[9] = true;
    };
    toggleChip(i) {
        let oldChip = this.player.setChip[i];
        for (let j = oldChip + 1; j <= SET_CHIP_KIND; j++) if (this.configChip(i, j)) return true;
        for (let j = 0; j < oldChip; j++) if (this.configChip(i, j)) return true;
        return false;
    };
    configChip(i, j) {
        if (this.player.disabledChip[i]) return false;
        if (this.player.setChip[i] == j) return false;
        if (this.player.chip[j - 1] <= this.chipUsed[j - 1]) return false;
        let oldChip = this.player.setChip[i] - 1;
        if (oldChip != -1) this.player.chip[oldChip] = this.player.chip[oldChip] + this.chipUsed[oldChip];
        this.player.setChip[i] = j;
        if (j != 0) this.player.chip[j - 1] = this.player.chip[j - 1] - (this.chipUsed[j - 1] + 1);
        this.checkUsedChips();
        return true;
    };
    checkUsedChips() {
        this.chipUsed.fill(0);
        for (let v of this.player.setChip) {
            if (v != 0) this.chipUsed[v - 1] = this.chipUsed[v - 1] + 1;
        }
    };
    workTime(val) {
        if (0 <= val && val <= this.player.accelLevel) {
            this.player.accelLevelUsed = val;
        }
    };

    searchLowerBound(value, l, target) {
        const f = x => {
            if (target === 'levelReset') {
                return this.calcGainLevel(x);
            } else if (target === 'rankReset') {
                return this.calcGainRank(x);
            } else if (target === 'crownReset') {
                return this.calcGainCrown(x);
            } else if (target === 'darkLevelReset') {
                return this.calcGainDarkLevel(x);
            }
        };
        if (f(l).gte(value)) return l;
        let r = l.mul(l);
        let cnt = 0;
        while (f(r).lt(value)) r = r.mul(r);
        while (l.add(1).lt(r) && cnt < 60) {
            const m = r.sub(l).lt(4) ? l.add(r).div(2).floor() : l.mul(r).sqrt().floor();
            if (f(m).gte(value))
                r = m;
            else
                l = m;
            cnt += 1;
        }
        return r;
    };

    targetMoney(target, input) {
        try {
            let value = D(input);
            if (target === 'levelReset') {
                value = value.ceil();
                return this.searchLowerBound(value, this.resetLevelBorder(), target);
            } else if (target == 'rankReset') {
                value = value.ceil();
                return this.searchLowerBound(value, this.resetRankBorder(), target);
            } else if (target == 'crownReset') {
                value = value.ceil();
                return this.searchLowerBound(value, this.resetCrownBorder(), target);
            } else if (target == 'darkLevelReset') {
                value = value.ceil();
                return this.searchLowerBound(value, D('1e18'), target);
            } else if (target == 'point') {
                return value;
            }
        } catch (error) {
            return D('NaN');
        }
        return D('NaN');
    };

    calcGoalTicks(targetMoney, update) {
        if (this.player.money.gte(targetMoney)) return D(0);
        if (this.player.generators.every(g => g.eq(0))) return D(Infinity);
        const gExpr = this.calcGeneratorExpr();
        let ok = D(2);
        let ng = D(0);
        while (Nig.calcAfterNTick(gExpr[0], ok).lt(targetMoney)) {
            ng = ok;
            ok = ok.mul(ok);
        }
        let cnt = 0;
        while (ng.add(1).lt(ok) && cnt < 60) {
            const m = ok.sub(ng).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
            if (Nig.calcAfterNTick(gExpr[0], m).lt(targetMoney)) {
                ng = m;
            } else {
                ok = m;
            }
            cnt += 1;
        }
        if (update) this.updateGenerators(D(1), ok, gExpr);
        return ok;
    };

    calcTickFromExpr(aExpr, tick) {
        let acNum = Nig.calcAfterNTick(aExpr[0], tick).mul(D(1.5).pow(this.player.setChip[10]));
        if (this.isRankChallengeBonusActive(13)) {
            for (let i = 1; i < 8; i++) acNum = acNum.mul(Nig.calcAfterNTick(aExpr[i], tick).add(1));
        }
        return acNum;
    }

    tick2sec(tick, update) {
        if (tick.lte(0)) return D(0);
        if (tick.eq(D(Infinity))) return D(Infinity);
        const aExpr = this.calcAcceleratorExpr();
        const delta = D('1e-3');
        const baseTick = D(this.baseTick()).div(1000);
        const aMult = this.isChallengeBonusActive(6) ? (this.isRankChallengeBonusActive(10) ? this.player.acceleratorsBought[0].pow_base(2) : this.player.acceleratorsBought[0].add(1)) : D(1);
        let curTick = D(0);
        let acNum = this.player.accelerators[0].mul(D(1.5).pow(this.player.setChip[10]));
        if (this.isRankChallengeBonusActive(13)) {
            for (let i = 1; i < 8; i++) acNum = acNum.mul(this.player.accelerators[i].add(1));
        }
        let prevDt = baseTick.div(acNum.add(10).mul(aMult).log10());
        let sec = D(0);
        while (curTick.lt(tick)) {
            const prevTick = curTick;
            let ok = curTick.add(1);
            let ng = tick.add(1);
            let cnt = 0;
            while (ok.add(1).lt(ng) && cnt < 60) {
                const m = ng.sub(ok).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
                if (baseTick.div(this.calcTickFromExpr(aExpr, m).add(10).mul(aMult).log10()).add(delta).gt(prevDt)) {
                    ok = m;
                } else {
                    ng = m;
                }
                cnt += 1;
            }
            curTick = ok;
            if (prevTick.eq(curTick)) break;
            const dt = baseTick.div(this.calcTickFromExpr(aExpr, curTick).add(10).mul(aMult).log10());
            sec = sec.add(prevDt.add(dt).div(2).mul(curTick.sub(prevTick)));
            prevDt = dt;
        }
        if (update) this.updateAccelerators(D(1), tick, aExpr);
        return sec;
    };

    calcTickAndSec(targetMoney, update) {
        if (this.player.money.gte(targetMoney)) return { ticks: D(0), sec: D(0) };
        if (targetMoney.eq(D(Infinity))) return { ticks: D(Infinity), sec: D(Infinity) };
        if (this.isRankChallengeBonusActive(9)) {
            const prevInfo = {
                money: this.player.money,
                generators: this.player.generators.slice(),
                tickSpeed: this.player.tickSpeed,
                multByAc: this.multByAc,
            };
            const aExpr = this.calcAcceleratorExpr();
            const baseTick = D(this.baseTick());
            const aMult = this.isChallengeBonusActive(6) ? (this.isRankChallengeBonusActive(10) ? this.player.acceleratorsBought[0].pow_base(2) : this.player.acceleratorsBought[0].add(1)) : D(1);
            let curTick = D(0);
            let acNum = this.player.accelerators[0].mul(D(1.5).pow(this.player.setChip[10]));
            if (this.isRankChallengeBonusActive(13)) {
                for (let i = 1; i < 8; i++) acNum = acNum.mul(this.player.accelerators[i].add(1));
            }
            const baseMult9 = D(50).div(this.baseTick());
            let prevMult9 = baseMult9.mul(acNum.add(10).mul(aMult).log10());
            let prevMult9Mult = prevMult9.mul(prevMult9.max(1));
            let highestA = 0;
            for (let i = 0; i < 8; i++) if (this.player.accelerators[i].gt(0)) highestA = i;

            while (this.player.money.lt(targetMoney)) {
                const delta = prevMult9.lt('0.2') ? D('1e-2') : prevMult9.lt('2') ? D('1e-1') : prevMult9.lt('20') ? D('1') : D('10');

                let ok = curTick.add(1);
                let ng = curTick.add(2);
                let cnt = 0;
                if (highestA > 0) {
                    let curMult9 = baseMult9.mul(this.calcTickFromExpr(aExpr, ng).add(10).mul(aMult).log10());
                    while (curMult9.mul(curMult9.max(1)).lt(prevMult9Mult.add(delta))) {
                        ng = ng.mul(ng);
                        curMult9 = baseMult9.mul(this.calcTickFromExpr(aExpr, ng).add(10).mul(aMult).log10());
                    }
                    while (ok.add(1).lt(ng) && cnt < 60) {
                        const m = ng.sub(ok).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
                        curMult9 = baseMult9.mul(this.calcTickFromExpr(aExpr, m).add(10).mul(aMult).log10());
                        if (curMult9.mul(curMult9.max(1)).lt(prevMult9Mult.add(delta))) {
                            ok = m;
                        } else {
                            ng = m;
                        }
                        cnt += 1;
                    }
                }

                const gExpr = this.calcGeneratorExpr();
                if (highestA === 0) {
                    ok = curTick.add(2);
                    while (Nig.calcAfterNTick(gExpr[0], ok.sub(curTick)).lt(targetMoney)) {
                        ok = ok.mul(ok);
                    }
                }

                if (Nig.calcAfterNTick(gExpr[0], ok.sub(curTick)).gte(targetMoney)) {
                    ng = curTick;
                    cnt = 0;
                    while (ng.add(1).lt(ok) && cnt < 60) {
                        const m = ok.sub(ng).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng.add(1)).sqrt().floor();
                        if (Nig.calcAfterNTick(gExpr[0], m.sub(curTick)).lt(targetMoney)) {
                            ng = m;
                        } else {
                            ok = m;
                        }
                        cnt += 1;
                    }
                }
                const tick = ok.sub(curTick);
                this.player.money = Nig.calcAfterNTick(gExpr[0], tick);
                for (let i = 0; i < 8; i++) this.player.generators[i] = Nig.calcAfterNTick(gExpr[i + 1], tick);
                const tsNum = this.calcTickFromExpr(aExpr, ok).add(10).mul(aMult).log10();
                this.player.tickSpeed = baseTick.div(tsNum);
                this.multByAc = D(50).div(this.player.tickSpeed);
                prevMult9 = baseMult9.mul(tsNum);
                prevMult9Mult = prevMult9.mul(prevMult9.max(1));
                curTick = ok;
            }
            if (update) {
                this.updateAccelerators(D(1), curTick, aExpr);
            } else {
                this.player.money = prevInfo.money;
                this.player.generators = prevInfo.generators;
                this.player.tickSpeed = prevInfo.tickSpeed;
                this.multByAc = prevInfo.multByAc;
            }
            const sec = curTick.mul(0.05);
            return { tick: curTick, sec: sec };
        } else {
            const tick = this.calcGoalTicks(targetMoney, update);
            const sec = this.tick2sec(tick, update);
            return { tick: tick, sec: sec };
        }
    };

    calcDarkGoalTick(targetDarkMoney, mu = D(1)) {
        if (this.player.darkMoney.gte(targetDarkMoney)) return D(0);
        if (this.player.darkGenerators.every(g => g.eq(0))) return D(Infinity);
        const dExpr = this.calcDarkGeneratorExpr(mu);
        let ok = D(2);
        let ng = D(0);
        while (Nig.calcAfterNTick(dExpr[0], ok).lt(targetDarkMoney)) {
            ng = ok;
            ok = ok.mul(ok);
        }
        let cnt = 0;
        while (ng.add(1).lt(ok) && cnt < 60) {
            const m = ok.sub(ng).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
            if (Nig.calcAfterNTick(dExpr[0], m).lt(targetDarkMoney)) {
                ng = m;
            } else {
                ok = m;
            }
            cnt += 1;
        }
        return ok;
    };

    simulate(checkpoints) {
        if (checkpoints.length == 0) return [];
        const cmpEvents = (a, b) => {
            let c = a[0].cmp(b[0]);
            if (c === 0) c = a[1] - b[1];
            if (c === 0) c = b[2] - a[2];
            return c;
        };
        //発生器の購入が間に合わないと、先にチェックポイントを達成することがあるのでチェックポイント専用キューも用意する
        let events = new TinyQueue([], cmpEvents); //[cost, id, index, number]
        let checkpointsQue = new TinyQueue([], (a, b) => a[0].cmp(b[0]));
        let maxCheckpoint = D(0);
        for (let i = 0; i < checkpoints.length; i++) {
            events.push([checkpoints[i], 0, i, 0]);
            checkpointsQue.push([checkpoints[i], i]);
            maxCheckpoint = maxCheckpoint.max(checkpoints[i]);
        }
        for (let i = 0; i < 8; i++) {
            if (!(this.isChallengeActive(6) && (i == 3 || i == 7))) {
                for (let j = this.player.generatorsBought[i]; ; j = j.add(1)) {
                    let c = this.calcGeneratorCost(i, j);
                    if (c.gte(maxCheckpoint)) break;
                    events.push([c, 1, i, j]);
                }
            }
        }
        for (let i = 0; i < 8; i++) {
            if (this.isAcceleratorOpened(i)) {
                if (!this.isChallengeActive(5)) {
                    for (let j = this.player.acceleratorsBought[i]; ; j = j.add(1)) {
                        const c = this.calcAcceleratorCost(i, j);
                        if (c.gte(maxCheckpoint)) break;
                        events.push([c, 2, i, j]);
                    }
                }
            }
        }

        let res = Array.from(checkpoints).fill(null);
        let totalTicks = D(0);
        let totalSec = D(0);
        while (events.length) {
            let [cost, type, index, number] = events.pop();
            //達成済みならcontinue
            if (type === 0) {
                if (res[index] !== null) continue;
            } else if (type === 1) {
                if (this.player.generatorsBought[index].gt(number)) continue;
            } else if (type === 2) {
                if (this.player.acceleratorsBought[index].gt(number)) continue;
            }
            //console.log(totalTicks.toExponential(3), this.player.money.toExponential(3), cost.toExponential(3), type, index, number.toFixed(0))

            //次の目標まで(最低1tick)更新
            let tick = D(1), sec = D(0);
            if (this.player.money.gte(cost)) {
                this.updateGenerators(D(1), tick);
                this.updateAccelerators(D(1), tick)
                sec = this.isRankChallengeBonusActive(9) ? tick.mul(0.05) : this.tick2sec(tick, true);
            } else {
                const tickAndSec = this.calcTickAndSec(cost, true);
                tick = tickAndSec.tick;
                sec = tickAndSec.sec;
            }
            totalTicks = totalTicks.add(tick);
            totalSec = totalSec.add(sec);

            //checkpoint確認
            while (checkpointsQue.length && this.player.money.gte(checkpointsQue.peek()[0])) {
                let [_, k] = checkpointsQue.pop();
                res[k] = {
                    tick: totalTicks,
                    sec: totalSec,
                };
            }

            for (let i = 7; i >= 0; i--) {
                this.buyGenerator(i);
            }
            for (let i = 7; i >= 0; i--) {
                this.buyAccelerator(i);
            }
        }
        res = res.map(item => item === null ? {tick: D(Infinity), sec: D(Infinity)} : item);
        return res;
    };

    simulateChallenges(challengeId, rank, config) {
        let minRes = {
            tickMinimum: {
                tick: D(Infinity),
                sec: D(Infinity),
                challengeBonuses: [],
                rankChallengeBonuses: [],
                accelLevelUsed: 0,
            },
            secMinimum: {
                tick: D(Infinity),
                sec: D(Infinity),
                challengeBonuses: [],
                rankChallengeBonuses: [],
                accelLevelUsed: 0,
            },
            config,
        };
        let accelLevelCandidates = config.searchAccelLevel
            ? Array.from(new Array(this.player.accelLevel + 1).keys())
            : [this.player.accelLevelUsed];
        let challengeBonusesCandidates = config.searchChallengeBonuses
            ? mbCache.get(this.player.challengeCleared.length, false, true)
            : [new Array(15).fill(null).map((_, i) => i).filter(i => this.player.challengeBonuses[i])];
        let rankChallengeBonusesCandidates = config.searchRankChallengeBonuses
            ? mbCache.get(this.player.rankChallengeCleared.length, true, true)
            : [new Array(15).fill(null).map((_, i) => i).filter(i => this.player.rankChallengeBonuses[i])];
        accelLevelCandidates.forEach(accelLevel => {
            challengeBonusesCandidates.forEach(challengeBonuses => {
                rankChallengeBonusesCandidates.forEach(rankChallengeBonuses => {
                    if (this.player.onChallenge) this.exitChallenge();
                    for (let i = 0; i < 8; i++) if (this.player.challenges[i]) this.configChallenge(i);
                    for (let i = 0; i < 15; i++) if (this.player.challengeBonuses[i]) this.toggleReward(i);
                    for (let i = 0; i < 15; i++) if (this.player.rankChallengeBonuses[i]) this.toggleRankReward(i);
                    for (let i = 0; i < 8; i++) this.player.generatorsMode[i] = i;

                    for (let i = 0; i < 8; i++) if ((challengeId & (1 << 7 - i)) !== 0) this.configChallenge(i);
                    this.toggleReward(4);
                    if (config.toggleBonuses) {
                        this.toggleReward(1);
                        this.toggleReward(0);
                        this.toggleRankReward(1);
                        this.toggleRankReward(0);
                    }

                    this.startChallenge();
                    for (let i = 0; i < 2; i++) if (this.player.challengeBonuses[i]) this.toggleReward(i);
                    for (let i = 0; i < 2; i++) if (this.player.rankChallengeBonuses[i]) this.toggleRankReward(i);
                    if (!config.searchChallengeBonuses && this.player.challengeBonuses[4]) this.toggleReward(4);

                    challengeBonuses.forEach(c => this.toggleReward(c));
                    rankChallengeBonuses.forEach(c => this.toggleRankReward(c));
                    this.player.accelLevelUsed = accelLevel;

                    let checkpoints = [rank ? this.resetRankBorder() : this.resetLevelBorder()];
                    let res = this.simulate(checkpoints)[0];
                    if (res.tick.lt(minRes.tickMinimum.tick)) {
                        minRes.tickMinimum = {
                            tick: res.tick,
                            sec: res.sec,
                            challengeBonuses: challengeBonuses.slice(),
                            rankChallengeBonuses: rankChallengeBonuses.slice(),
                            accelLevelUsed: this.player.accelLevelUsed,
                        };
                    }
                    if (res.sec.lt(minRes.secMinimum.sec)) {
                        minRes.secMinimum = {
                            tick: res.tick,
                            sec: res.sec,
                            challengeBonuses: challengeBonuses.slice(),
                            rankChallengeBonuses: rankChallengeBonuses.slice(),
                            accelLevelUsed: this.player.accelLevelUsed,
                        };
                    }
                });
            })
        });
        return minRes;
    };

    simulateDark(checkpoints) {
        if (checkpoints.length === 0) return [];
        let index = Array.from(checkpoints, (_, i) => i);
        index.sort((i, j) => checkpoints[i].cmp(checkpoints[j]));
        let events = [];
        for (let i = 0; i < checkpoints.length; i++) {
            events.push([checkpoints[i], i]);
        }
        events.sort((a, b) => a[0].cmp(b[0]));
        let result = Array.from(checkpoints).fill(null);
        events.forEach(([c, i]) => {
            result[i] = this.calcDarkGoalTick(c);
        });
        return result;
    };

}

const colors = ['#00ff00', '#11ff52', '#23ff9b', '#34ffda', '#46eeff', '#57c2ff', '#699fff', '#7a86ff', '#a18cff', '#ca9dff', '#e9afff', '#ffc0ff'];
const colorbarPower = f => {
    const r = Math.max(0, Math.min(1, f));
    const n = colors.length - 1;
    const p = Math.floor(r * n);
    const q = r * n - p;
    if (p >= n) return colors[n];
    let col = 'rgb(';
    for (let j = 0; j < 3; j++) {
        const l = parseInt(colors[p].slice(j * 2 + 1, j * 2 + 3), 16);
        const r = parseInt(colors[p + 1].slice(j * 2 + 1, j * 2 + 3), 16);
        col += Math.round(l * (1 - q) + r * q);
        col += j < 2 ? ', ' : ')';
    }
    return col;
};

const app = Vue.createApp({
    data() {
        return {
            TROPHY_NUM: TROPHY_NUM,
            SET_CHIP_KIND: SET_CHIP_KIND,
            SET_CHIP_NUM: SET_CHIP_NUM,
            nig: new Nig(),
            itemData: itemData,
            shineChallengeLength: [64, 96, 128, 160, 192, 224],
            brightnessRankChallengeLength: [32, 64, 128, 255],
            flickerPChallengeStage: [1],
            simulatedCheckpoints: Array.from(new Array(10), () => new Map()),
            challengeSimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            rankChallengeSimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            checkpoints: [D('1e18'), D('1e72')],
            simulatedDarkCheckpoints: Array.from(new Array(10), () => new Map()),
            darkCheckpoints: [D('1e18')],
            cpSimulatedTime: Date.now(),
            sampleTick: [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9],
            sampleTickLabel: ['1', '1e1', '1e2', '1e3', '1e4', '1e5', '1e6', '1e7', '1e8', '1e9'],
            sampleTime: [1, 60, 3600, 86400, 2592000, 31536000, 3153600000],
            sampleTimeLabel: ['s', 'm', 'h', 'D', 'M', 'Y', 'C'],
            isPerfectChallengeReset: true,
            hideClearedChallenge: false,
            hideChallengeColor: false,
            showTickMinimum: false,
            challengeConfig: {
                searchChallengeBonuses: true,
                searchRankChallengeBonuses: true,
                searchAccelLevel: true,
                toggleBonuses: true,
            },
            searchClearChallenge: true,
            autoSimulateCheckpoints: false,
            autoSimulateDarkCheckpoints: false,
            checkpointTarget: 'point',
            checkpointValue: '',
            darkCheckpointTarget: 'point',
            darkCheckpointValue: '',
            procMsPerTick: 0,
            verbose: false,
            spoiler: false,
            simulateTableWidth: 80,
        }
    },
    computed: {
        startChallengeMessage() {
            let id = this.nig.calcChallengeId();
            let contents = '挑戦: ' + (this.nig.player.challengeCleared.includes(id) ? '済' : '未');
            if (this.nig.player.rankChallengeCleared.length > 0)
                contents += '  階位挑戦: ' + (this.nig.player.rankChallengeCleared.includes(id) ? '済' : '未');
            return contents;
        },
        startPerfectChallengeMessage() {
            let id = this.nig.calcPerfectChallengeId();
            let contents = '進行度 通常: ' + (this.nig.player.pChallengeCleared[id]);
            contents += '  上位: ' + (this.nig.player.pRChallengeCleared[id]);
            return contents;
        },
        challengeId: function () {
            return function (i, j) {
                let id = 0;
                for (let k = 0; k < 4; k++) {
                    if (j % (1 << k + 1) >= (1 << k)) {
                        id += 1 << 7 - k;
                    }
                    if (i % (1 << k + 1) >= (1 << k)) {
                        id += 1 << 3 - k;
                    }
                }
                return id;
            };
        },
        challengeCell: function () {
            return function (i, j, rank = false) {
                const id = this.challengeId(i, j);
                const nowChallenging = this.nig.player.onChallenge && this.nig.calcChallengeId() == id;
                const clearedChallenge = rank ? this.nig.player.rankChallengeCleared.includes(id) : this.nig.player.challengeCleared.includes(id);
                return {
                    'now-challenging': nowChallenging,
                    'cleared-challenge': clearedChallenge,
                    unchallengeable: i == 0 && j == 0,
                };
            };
        },
        challengesColor: function () {
            return function (i, j, rank = false) {
                const id = this.challengeId(i, j);
                let color = 'transparent';
                const res = rank ? this.rankChallengeSimulated[this.nig.world][id] : this.challengeSimulated[this.nig.world][id];
                if (res !== null) {
                    if (this.showTickMinimum) {
                        const tick = res.tickMinimum.tick;
                        if (tick.eq(D(Infinity))) {
                            color = 'rgb(255, 255, 255)';
                        } else {
                            const f = tick.max(1).log10() / Math.log10(1e10);
                            color = colorbarPower(f);
                        }
                    } else {
                        const sec = res.secMinimum.sec.add(res.secMinimum.tick.mul(this.procMsPerTick * 0.001));
                        if (sec.eq(D(Infinity))) {
                            color = 'rgb(255, 255, 255)';
                        } else {
                            const f = sec.max(1).log10() / Math.log10(3153600000);
                            color = colorbarPower(f);
                        }
                    }
                }
                return { 'background-color': color };
            };
        },
        challengeMessage: function () {
            return function (i, j, rank = false) {
                const id = this.challengeId(i, j);
                const res = rank ? this.rankChallengeSimulated[this.nig.world][id] : this.challengeSimulated[this.nig.world][id];
                let message = 'Uncalculated';
                if (res !== null) {
                    let minResult = this.showTickMinimum ? res.tickMinimum : res.secMinimum;
                    const sec = minResult.sec.add(minResult.tick.mul(this.procMsPerTick * 0.001));
                    message = minResult.tick.toExponential(3) + ' ticks';
                    message += '<br/>(' + sec.toExponential(3) + ' sec)';
                    if ((this.verbose || this.challengeConfig.searchChallengeBonuses) && minResult.challengeBonuses.length > 0) message += '<br/>効力' + minResult.challengeBonuses.map(x => x + 1);
                    if ((this.verbose || this.challengeConfig.searchRankChallengeBonuses) && minResult.rankChallengeBonuses.length > 0) message += '<br/>上位効力' + minResult.rankChallengeBonuses.map(x => x + 1);
                    if ((this.verbose || this.challengeConfig.searchAccelLevel) && this.nig.player.accelLevel > 0) message += '<br/>起動時間回帰力' + minResult.accelLevelUsed;
                    // message += '<br/>id: ' + id;
                }
                return message;
            };
        },
        checkpointMessages() {
            return this.checkpoints.map(checkpoint => {
                const res = this.simulatedCheckpoints[this.nig.world].get(checkpoint);
                if (res === undefined) return checkpoint.toExponential(3) + ' ポイントまで ???';
                const sec = res.sec.add(res.tick.mul(this.procMsPerTick * 0.001));
                let content = checkpoint.toExponential(3) + ' ポイントまで ' + res.tick.toExponential(3) + ' ticks';
                content += ' (' + sec.toExponential(3) + ' sec)';
                content += ' ' + (new Date(this.cpSimulatedTime + Number(sec.mul(1000).toExponential(20)))).toLocaleString() + ' に達成';
                return content;
            });
        },
        darkCheckpointMessages() {
            return this.darkCheckpoints.map(checkpoint => {
                const res = this.simulatedDarkCheckpoints[this.nig.world].get(checkpoint);
                if (res === undefined) return checkpoint.toExponential(3) + ' ポイントまで ???';
                return checkpoint.toExponential(3) + ' ポイントまで ' + res.toExponential(3) + ' ticks';
            });
        },
        targetMoneys() {
            return this.commonTargetMoneys(this.checkpointValue, this.checkpointTarget);
        },
        targetMoneysDesc() {
            return this.commonTargetMoneysDesc(this.targetMoneys);
        },
        targetDarkMoneys() {
            return this.commonTargetMoneys(this.darkCheckpointValue, this.darkCheckpointTarget);
        },
        targetDarkMoneysDesc() {
            return this.commonTargetMoneysDesc(this.targetDarkMoneys);
        },
        gExpr() {
            return this.nig.calcGeneratorExpr();
        },
        aExpr() {
            return this.nig.calcAcceleratorExpr();
        },
        expression: function () {
            return function (i, ty) {
                const e = ty == 0 ? this.gExpr[i] : this.aExpr[i];
                let content = '';
                e.forEach((e, i) => {
                    if (e.gt(0)) {
                        if (content != '') content += ' + ';
                        e.toExponential(1);
                        content += e.toExponential(1).replace('e+', '\\cdot10^{') + '}{}_NC_{' + i + '}';
                    }
                });
                if (content == '') content = '0';
                const name = ty == 0 ? (i == 0 ? 'ポイント' : '発生器' + i) : '時間加速器' + (i + 1);
                return name + ': \\(' + content + '\\)';
            };
        },
        isLightBought() {
            if (this.nig.player.money.gte('1e200') && this.nig.player.crownResetTime.gt(0)) return true;
            if (this.nig.player.lightMoney.gt(0)) return true;
            return this.nig.player.lightGenerators.some(d => d.gt(0));
        },
    },
    methods: {
        formatDecimal(d, places) {
            if (d.lt(D(10).pow(places))) {
                return d.toFixed(0);
            } else {
                return d.toExponential(places);
            }
        },
        commonTargetMoneys(values, target) {
            let [start, stop, opStep] = values.split(':', 3);
            let [op, step] = opStep === undefined ? (target === 'point' ? ['*', '10'] : ['+', '1']) : opStep.startsWith('*') ? [opStep[0], opStep.slice(1)] : ['+', opStep];
            try {
                if (start !== undefined) start = D(start.trim());
                if (stop !== undefined) stop = D(stop.trim());
                if (step !== undefined) step = D(step.trim());
            } catch (error) {
                return [];
            }
            let arr = [];
            if (stop !== undefined) {
                while (arr.length < 100 && start.lte(stop)) {
                    let t = this.nig.targetMoney(target, start);
                    if (!t.gt(0)) break;
                    arr.push(t);
                    start = op === '*' ? start.mul(step) : start.add(step);
                }
            } else {
                let t = this.nig.targetMoney(target, start);
                if (t.gt(0)) arr.push(t);
            }
            return arr;
        },
        commonTargetMoneysDesc(target) {
            if (target.length === 0) {
                return 'Invalid';
            } else if (target.length === 1) {
                return target[0].toExponential(1) + ' ポイント';
            } else {
                return target[0].toExponential(1) + '～' + target[target.length - 1].toExponential(1) + ' ポイント(' + target.length + ')';
            }
        },
        importSave() {
            const prevWorld = this.nig.world;
            const input = window.prompt('データを入力', '');
            if (input == '' || input === null) return;
            let nig = new Nig();
            nig.loadB(input);
            this.nig = nig;
            this.selectWorld(prevWorld);
            this.clearAllCache();
        },
        selectWorld(i) {
            this.nig.save();
            this.nig.moveWorld(i);
            if (this.autoSimulateCheckpoints) this.simulateCheckpoints();
        },
        spendShine(num) {
            this.nig.spendShine(num);
            this.clearCheckpointsCache();
        },
        spendBrightness(num) {
            this.nig.spendBrightness(num);
            this.clearAllCache();
        },
        spendFlicker(num) {
            this.nig.spendFlicker(num);
            this.clearAllCache();
        },
        buyGenerator(i) {
            this.nig.buyGenerator(i);
            this.clearCheckpointsCache();
        },
        buyAccelerator(i) {
            this.nig.buyAccelerator(i);
            this.clearCheckpointsCache();
        },
        buyDarkGenerator(i) {
            this.nig.buyDarkGenerator(i);
            this.clearAllCache();
        },
        buyLightGenerator(i) {
            this.nig.buyLightGenerator(i);
            this.clearAllCache();
        },
        toggleReward(i) {
            this.nig.toggleReward(i);
            this.clearCheckpointsCache();
        },
        toggleRankReward(i) {
            this.nig.toggleRankReward(i);
            this.clearCheckpointsCache();
        },
        buyLevelItems(i) {
            this.nig.buyLevelItems(i);
            this.clearAllCache();
        },
        buildStatue(i) {
            this.nig.buildStatue(i);
        },
        changeMode(i) {
            this.nig.changeMode(i);
            this.clearCheckpointsCache();
        },
        resetGeneratorMode(i) {
            this.nig.resetGeneratorMode(i);
            this.clearCheckpointsCache();
        },
        toggleChallenge() {
            if (this.nig.player.onChallenge) {
                this.nig.exitChallenge();
            } else {
                this.nig.startChallenge();
            }
            this.clearCheckpointsCache();
        },
        togglePerfectChallenge() {
            if (this.nig.player.onPChallenge) {
                this.nig.exitPerfectChallenge();
            } else {
                this.nig.startPerfectChallenge(this.isPerfectChallengeReset);
            }
            this.clearAllCache();
        },
        toggleChip(i) {
            this.nig.toggleChip(i);
            this.clearAllCache();
        },
        configChip(i, j) {
            this.nig.configChip(i, j);
            this.clearAllCache();
        },
        workTime(i) {
            this.nig.workTime(i);
            this.clearCheckpointsCache();
        },
        clearCheckpointsCache() {
            this.simulatedCheckpoints[this.nig.world].clear();
            this.simulatedDarkCheckpoints[this.nig.world].clear();
            if (this.autoSimulateCheckpoints) this.simulateCheckpoints();
            if (this.autoSimulateDarkCheckpoints) this.simulateDarkCheckpoints();
        },
        clearAllCache() {
            for (let i = 0; i < 10; i++) {
                this.simulatedCheckpoints[i].clear();
                this.simulatedDarkCheckpoints[i].clear();
                this.challengeSimulated[i] = new Array(256).fill(null);
                this.rankChallengeSimulated[i] = new Array(256).fill(null);
            }
            if (this.autoSimulateCheckpoints) this.simulateCheckpoints();
            if (this.autoSimulateDarkCheckpoints) this.simulateDarkCheckpoints();
        },
        addCheckpoint() {
            this.targetMoneys.forEach(targetMoney => this.checkpoints.push(targetMoney));
        },
        removeCheckpoint(i) {
            this.checkpoints.splice(i, 1);
        },
        simulateCheckpoints() {
            setTimeout(() => {
                if (this.checkpoints.length == 0) return;
                const res = this.nig.clone().simulate(this.checkpoints);
                this.cpSimulatedTime = Date.now();
                res.forEach((r, i) => this.simulatedCheckpoints[this.nig.world].set(this.checkpoints[i], r));
            }, 0);
        },
        simulateChallenges(challengeId, rank, rec) {
            if (challengeId <= 0 || 256 <= challengeId) return;
            let sim = rank ? this.rankChallengeSimulated : this.challengeSimulated;
            let update = sim[this.nig.world][challengeId] === null;
            if (!update) update ||= sim[this.nig.world][challengeId].config !== this.challengeConfig;
            if (!update) update ||= !this.challengeConfig.searchChallengeBonuses && sim[this.nig.world][challengeId].secMinimum.challengeBonuses !== new Array(15).fill(null).map((_, i) => i).filter(i => this.nig.player.challengeBonuses[i]);
            if (!update) update ||= !this.challengeConfig.searchRankChallengeBonuses && sim[this.nig.world][challengeId].secMinimum.rankChallengeBonuses !== new Array(15).fill(null).map((_, i) => i).filter(i => this.nig.player.rankChallengeBonuses[i]);
            if (!update) update ||= !this.challengeConfig.searchAccelLevel && sim[this.nig.world][challengeId].secMinimum.accelLevelUsed !== this.nig.player.accelLevelUsed;
            if (!this.searchClearChallenge && rec) {
                let cleared = rank ? this.nig.player.rankChallengeCleared : this.nig.player.challengeCleared;
                update &&= !cleared.includes(challengeId);
            }

            // simulateする場合のみsetTimeoutを挟む
            if (update) {
                setTimeout(() => {
                    sim[this.nig.world][challengeId] = this.nig.clone().simulateChallenges(challengeId, rank, JSON.parse(JSON.stringify(this.challengeConfig)));
                    if (rec) this.simulateChallenges(challengeId + 1, rank, rec);
                }, 0);
            } else {
                if (rec) this.simulateChallenges(challengeId + 1, rank, rec);
            }
        },
        simulateChallengeOne(i, j, rank) {
            this.simulateChallenges(this.challengeId(i, j), rank, false);
        },
        simulateChallengesAll(rank) {
            this.simulateChallenges(1, rank, true);
        },
        addDarkCheckpoint() {
            this.targetDarkMoneys.forEach(target_money => this.darkCheckpoints.push(target_money));
        },
        removeDarkCheckpoint(i) {
            this.darkCheckpoints.splice(i, 1);
        },
        simulateDarkCheckpoints() {
            setTimeout(() => {
                if (this.darkCheckpoints.length === 0) return;
                const res = this.nig.clone().simulateDark(this.darkCheckpoints);
                res.forEach((r, i) => this.simulatedDarkCheckpoints[this.nig.world].set(this.darkCheckpoints[i], r));
            }, 0);
        },
        scaleSampleTime(t) {
            const r = Math.log10(t) / Math.log10(3153600000) * 100;
            return {
                position: 'absolute',
                left: '' + r + '%',
                transform: 'translateX(-50%)',
                '-webkit-transform': ' translateX(-50%)',
                '-ms-transform': ' translateX(-50%)',
            }
        },
        buttonSelectedClass(cond) {
            return {
                'btn-dark': cond,
                'btn-outline-dark': !cond,
            };
        },
        chipColoredButtonClass(j) {
            if (j === 0) {
                return {};
            } else if (j >= 9) {
                let color = ['silver', 'gold'][j - 9];
                return {
                    'background-color': color,
                    'background-image': 'linear-gradient(135deg,transparent 20%,40%,rgba(255,255,255,1) 50%,60%,transparent 80%)'
                }

            } else {
                let color = [
                    '#cd7f32', 'silver', 'gold',
                    '#E5E4E2', '#EE82EE', '#FF3333',
                    '#42FFDD', '#38B48B'
                ][j - 1];
                return {
                    'background-color': color,
                };
            }
        },
        scaleChallengeTable(c) {
            this.simulateTableWidth = Math.max(20, Math.min(100, this.simulateTableWidth * c));
            document.querySelector(':root').style.setProperty('--challenge-width', `${this.simulateTableWidth}vh`);
        },
    },
    mounted() {
        setTimeout(() => renderMathInElement(document.getElementById('gaExpression'), { delimiters: [{ left: '\\(', right: '\\)', display: false }] }), 0);
    },
    updated() {
        setTimeout(() => renderMathInElement(document.getElementById('gaExpression'), { delimiters: [{ left: '\\(', right: '\\)', display: false }] }), 0);
    },
});
app.config.isCustomElement = tag => {
    const custom = ['mi', 'mrow', 'annotation', 'semantics', 'math'];
    return custom.includes(tag);
};
app.mount('#app');
