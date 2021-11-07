
export default gui = new Gui();

export const skillCurves = [50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925/* 10 */, 14925, 22425, 32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425/* 20 */, 822425, 1222425, 1722425, 2322425, 3022425, 3822425, 4722425, 5722425, 6822425, 8022425/* 30 */, 9322425, 10722425, 12222425, 13822425, 15522425, 17322425, 19222425, 21222425, 23322425, 25522425/* 40 */, 27822425, 30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472425, 51172425, 55172425/* 50 */, 59472425, 64072425, 68972452, 74172425, 79672425, 85472425, 91572425, 97972425, 104672425, 111672425/* 60 */];

export const rarities = {
    COMMON: 5,
    UNCOMMON: 7,
    RARE: 9,
    EPIC: 13,
    LEGENDARY: 16,
    MYTHIC: 20,
}

export const bountiful = {
    COMMON: 1,
    UNCOMMON: 2,
    RARE: 3,
    EPIC: 5,
    LEGENDARY: 7,
    MYTHIC: 10,
}

export let playerInformation = {
    toolIsEquipped: false,
    toolType: "",
    crop: "",
    total: 0,
    getters: { 
        getToolIsEquipped: () => playerInformation._toolIsEquipped,
        getToolType: () => playerInformation._toolType,
        getCrop: () => playerInformation._crop,
        getTotal: () => playerInformation._total,
    },
    setters: {
        setToolIsEquipped: (toolIsEquipped) => playerInformation._toolIsEquipped = toolIsEquipped,
        setToolType: (toolType) => playerInformation._toolType = toolType,
        setCrop: (crop) => playerInformation._crop = crop,
        setTotal: (total) => playerInformation._total = total,
    },
}

export let hoeStats = {
    tierBonus: 0,
    cultivating: 0,
    harvesting: 0,
    itemRate: 0,
    turbo: 0,
    rarity: 0,
    counter: 0,
    bountiful: false,
    getters: {
        getTierBonus: () => hoeStats._tierBonus,
        getCultivating: () => hoeStats._cultivating,
        getHarvesting: () => hoeStats._harvesting,
        getItemRate: () => hoeStats._itemRate,
        getTurbo: () => hoeStats._turbo,
        getRarity: () => hoeStats._rarity,
        getCounter: () => hoeStats._counter,
        getBountiful: () => hoeStats._bountiful,
    },
    setters: {
        setTierBonus: (tierBonus) => hoeStats._tierBonus = tierBonus,
        setCultivating: (cultivating) => hoeStats._cultivating = cultivating,
        setHarvesting: (harvesting) => hoeStats._harvesting = harvesting,
        setItemRate: (itemRate) => hoeStats._itemRate = itemRate,
        setTurbo: (turbo) => hoeStats._turbo = turbo,
        setRarity: (rarity) => hoeStats._rarity = rarity,
        setCounter: (counter) => hoeStats._counter = counter,
        setBountiful: (bountiful) => hoeStats._bountiful = bountiful,
    },
}

export let collection = {
    cane: 0,
    potato: 0,
    carrot: 0,
    wheat: 0,
    wart: 0,
    pumpkin: 0,
    melon: 0,
    cocoa: 0,
    mushroom: 0,
    cactus: 0,
    getters: {
        getCane: () => collection._cane,
        getPotato: () => collection._potato,
        getCarrot: () => collection._carrot,
        getWheat: () => collection._wheat,
        getWart: () => collection._wart,
        getPumpkin: () => collection._pumpkin,
        getMelon: () => collection._melon,
        getCocoa: () => collection._cocoa,
        getMushroom: () => collection._mushroom,
        getCactus: () => collection._cactus,
    },
    setters: {
        setCane: (cane) => collection._cane = cane,
        setPotato: (potato) => collection._potato = potato,
        setCarrot: (carrot) => collection._carrot = carrot,
        setWheat: (wheat) => collection._wheat = wheat,
        setWart: (wart) => collection._wart = wart,
        setPumpkin: (pumpkin) => collection._pumpkin = pumpkin,
        setMelon: (melon) => collection._melon = melon,
        setCocoa: (cocoa) => collection._cocoa = cocoa,
        setMushroom: (mushroom) => collection._mushroom = mushroom,
        setCactus: (cactus) => collection._cactus = cactus,
    },
}

export const cropToImage = {
    "Carrot": "carrot",
    "Melon": "melon",
    "Wheat": "wheat",
    "Nether Wart": "wart",
    "Pumpkin": "pumpkin",
    "Sugar Cane": "cane",
    "Cactus": "cactus",
    "Potato": "potato",
    "Mushroom": "mushroom",
    "Cocoa Beans": "cocoa"
}

export let mouseInformation = {
    x: undefined,
    y: undefined,
    toolInfo: undefined,
    xpInfo: undefined,
    jacob: undefined,
    getters: {
        getX: () => mouseInformation._x,
        getY: () => mouseInformation._y,
        getToolInfo: () => mouseInformation._toolInfo,
        getXpInfo: () => mouseInformation._xpInfo,
        getJacob: () => mouseInformation._jacob,
    },
    setters: {
        setX: (x) => mouseInformation._x = x,
        setY: (y) => mouseInformation._y = y,
        setToolInfo: (toolInfo) => mouseInformation._toolInfo = toolInfo,
        setXpInfo: (xpInfo) => mouseInformation._xpInfo = xpInfo,
        setJacob: (jacob) => mouseInformation._jacob = jacob,
    },
}

export let elementaStuff = {
    isGuiMovable: false,
    toolInfoOffset: 0,
    toolInfoElementCounter: 0,
    getters: {
        getIsGuiMovable: () => elementaStuff._isGuiMovable,
        getToolInfoOffset: () => elementaStuff._toolInfoOffset,
        getToolInfoElementCounter: () => elementaStuff._toolInfoElementCounter,
    },
    setters: {
        setIsGuiMovable: (isGuiMovable) => elementaStuff._isGuiMovable = isGuiMovable,
        setToolInfoOffset: (toolInfoOffset) => elementaStuff._toolInfoOffset = toolInfoOffset,
        setToolInfoElementCounter: (toolInfoElementCounter) => elementaStuff._toolInfoElementCounter = toolInfoElementCounter,
    },
}

export let globalStats = {
    timeLeftUntilNextLevel: 0,
    anita: 0,
    farmingCap: 0,
    farmingExpAPI: 0,
    apiElephantLevel: 0,
    farmingLevel: 0,
    elephant: 0,
    fFD: 0,
    xpGained: undefined,
    currentXP: undefined,
    currentLevel: undefined,
    currentLevelXP: undefined,
    xpRequiredForNextLevel: undefined,
    xpUntilNextLevel: undefined,
    xpPerHourExpected: 0,
    xpPerHour: 0,
    oldPercentage: undefined,
    yieldPerHour: "",
    cropGain: 0,
    jacobEvents: undefined,
    timeUntilJacobs: "",
    nextJacobCrops: undefined,
    getters: {
        getTimeLeftUntilNextLevel: () => globalStats._timeLeftUntilNextLevel,
        getAnita: () => globalStats._anita,
        getFarmingCap: () => globalStats._farmingCap,
        getFarmingExpAPI: () => globalStats._farmingExpAPI,
        getApiElephantLevel: () => globalStats._apiElephantLevel,
        getFarmingLevel: () => globalStats._farmingLevel,
        getElephant: () => globalStats._elephant,
        getFD: () => globalStats._fFD,
        getXpGained: () => globalStats._xpGained,
        getCurrentXP: () => globalStats._currentXP,
        getCurrentLevel: () => globalStats._currentLevel,
        getCurrentLevelXP: () => globalStats._currentLevelXP,
        getXpRequiredForNextLevel: () => globalStats._xpRequiredForNextLevel,
        getXpUntilNextLevel: () => globalStats._xpUntilNextLevel,
        getXpPerHourExpected: () => globalStats._xpPerHourExpected,
        getXpPerHour: () => globalStats._xpPerHour,
        getOldPercentage: () => globalStats._oldPercentage,
        getYieldPerHour: () => globalStats._yieldPerHour,
        getCropGain: () => globalStats._cropGain,
        getJacobEvents: () => globalStats._jacobEvents,
        getTimeUntilJacobs: () => globalStats._timeUntilJacobs,
        getNextJacobCrops: () => globalStats._nextJacobCrops,
    },
    setters: {
        setTimeLeftUntilNextLevel: (timeLeftUntilNextLevel) => globalStats._timeLeftUntilNextLevel = timeLeftUntilNextLevel,
        setAnita: (anita) => globalStats._anita = anita,
        setFarmingCap: (farmingCap) => globalStats._farmingCap = farmingCap,
        setFarmingExpAPI: (farmingExpAPI) => globalStats._farmingExpAPI = farmingExpAPI,
        setApiElephantLevel: (apiElephantLevel) => globalStats._apiElephantLevel = apiElephantLevel,
        setFarmingLevel: (farmingLevel) => globalStats._farmingLevel = farmingLevel,
        setElephant: (elephant) => globalStats._elephant = elephant,
        setFD: (fFD) => globalStats._fFD = fFD,
        setXpGained: (xpGained) => globalStats._xpGained = xpGained,
        setCurrentXP: (currentXP) => globalStats._currentXP = currentXP,
        setCurrentLevel: (currentLevel) => globalStats._currentLevel = currentLevel,
        setCurrentLevelXP: (currentLevelXP) => globalStats._currentLevelXP = currentLevelXP,
        setXpRequiredForNextLevel: (xpRequiredForNextLevel) => globalStats._xpRequiredForNextLevel = xpRequiredForNextLevel,
        setXpUntilNextLevel: (xpUntilNextLevel) => globalStats._xpUntilNextLevel = xpUntilNextLevel,
        setXpPerHourExpected: (xpPerHourExpected) => globalStats._xpPerHourExpected = xpPerHourExpected,
        setXpPerHour: (xpPerHour) => globalStats._xpPerHour = xpPerHour,
        setOldPercentage: (oldPercentage) => globalStats._oldPercentage = oldPercentage,
        setYieldPerHour: (yieldPerHour) => globalStats._yieldPerHour = yieldPerHour,
        setCropGain: (cropGain) => globalStats._cropGain = cropGain,
        setJacobEvents: (jacobEvents) => globalStats._jacobEvents = jacobEvents,
        setTimeUntilJacobs: (timeUntilJacobs) => globalStats._timeUntilJacobs = timeUntilJacobs,
        setNextJacobCrops: (nextJacobCrops) => globalStats._nextJacobCrops = nextJacobCrops,
    },
}

export function distanceBetween3D(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

export const cultivating = {
    1: 0,
    2: 1000,
    3: 5000,
    4: 25000,
    5: 100000,
    6: 300000,
    7: 1500000,
    8: 5000000,
    9: 20000000,
    10: 100000000
}

export const baseCropDrops = {
    cane: 2,
    potato: 3,
    carrot: 3,
    wheat: 1,
    wart: 2.5,
    pumpkin: 1,
    melon: 5,
    cocoa: 3,
    mushroom: 1,
    cactus: 2
}

export const colors = {
    0: '&0',
    1: '&1',
    2: '&2',
    3: '&3',
    4: '&4',
    5: '&5',
    6: '&6',
    7: '&7',
    8: '&8',
    9: '&9',
    10: '&a',
    11: '&b',
    12: '&c',
    13: '&d',
    14: '&e',
    15: '&f',
}

export const primaryColorTable = {
    'cane': 'primaryCaneColor',
    'potato': 'primaryPotatoColor',
    'carrot': 'primaryCarrotColor',
    'wheat': 'primaryWheatColor',
    'wart': 'primaryWartColor',
    'pumpkin': 'primaryPumpkinColor',
    'melon': 'primaryMelonColor',
    'cocoa': 'primaryCocoaColor',
    'mushroom': 'primaryMushroomColor',
    'cactus': 'primaryCactusColor'
}

export const toolIds = ["HOE_CANE", "HOE_POTATO", "HOE_CARROT", "HOE_WHEAT", "HOE_WARTS", "PUMPKIN_DICER", "MELON_DICER", "COCO_CHOPPER", "FUNGI_CUTTER"]

export const turboEnchants = ["turbo_cane", "turbo_potato", "turbo_carrot", "turbo_wheat", "turbo_warts", "turbo_pumpkin", "turbo_melon", "turbo_coco", "turbo_mushrooms", "turbo_cactus"]

export const toolToTurboEnchant = {
    'cocoa': 'turbo_coco',
    'wart': 'turbo_warts',
    'carrot': 'turbo_carrot',
    'pumpkin': 'turbo_pumpkin',
    'cane': 'turbo_cane',
    'wheat': 'turbo_wheat',
    'mushroom': 'turbo_mushrooms',
    'cactus': 'turbo_cactus',
    'potato': 'turbo_potato',
    'melon': 'turbo_melon'
}

export const units = ['/h', '/event', '/min', '/s', '/harvest']

export const alignment = ['LEFT', 'CENTER', 'RIGHT']

export const farmingBlockTypes = ['cocoa', 'nether_wart', 'carrots', 'pumpkin', 'reeds', 'wheat', 'brown_mushroom', 'red_mushroom', 'cactus', 'potatoes', 'melon_block']

export const blocksToCollectionType = {
    'cocoa': 'cocoa',
    'nether_wart': 'wart',
    'carrots': 'carrot',
    'pumpkin': 'pumpkin',
    'reeds': 'cane',
    'wheat': 'wheat',
    'brown_mushroom': 'mushroom',
    'red_mushroom': 'mushroom',
    'cactus': 'cactus',
    'potatoes': 'potato',
    'melon_block': 'melon'
}

export const blockMaxAge = {
    'carrot': '7',
    'potato': '7',
    'wheat': '7',
    'cocoa': '2',
    'wart': '3',
}

export const collectionTypeToBlocks = {
    'cocoa': 'cocoa',
    'wart': 'nether_wart',
    'carrot': 'carrots',
    'pumpkin': 'pumpkin',
    'cane': 'reeds',
    'wheat': 'wheat',
    'mushroom': 'red_mushroom',
    'cactus': 'cactus',
    'potato': 'potatoes',
    'melon': 'melon_block'
}

export const blockToMCBlockName = {
    'cocoa': 'Cocoa Beans',
    'wart': 'Nether Wart',
    'carrot': 'Carrot',
    'pumpkin': 'Pumpkin',
    'reeds': 'Sugar Cane',
    'wheat': 'Wheat',
    'mushroom': 'Mushroom',
    'cactus': 'Cactus',
    'potato': 'Potato',
    'melon': 'Melon'
}

export const farmingBlockDrops = [
    "Enchanted Bread",
    "Enchanted Hay Bale",
    "Tightly-Tied",
    "Hay Bale",
    "Enchanted Carrot",
    "Enchanted Potato",
    "Enchanted Baked Potato",
    "Enchanted Pumpkin",
    "Polished Pumpkin",
    "Enchanted Melon",
    "Enchanted Melon Block",
    "Enchanted Seeds",
    "Enchanted Red Mushroom",
    "Enchanted Brown Mushroom",
    "Enchanted Red Mushroom Block",
    "Enchanted Brown Mushroom Block",
    "Enchanted Cocoa Beans",
    "Enchanted Sugar",
    "Enchanted Paper",
    "Enchanted Sugar Cane",
    "Enchanted Nether Wart",
    "Mutant Nether Wart"
]

export const bazaarFarmingCompression = {
    "potato": 160,
    "carrot": 160,
    "wart": 160,
    "cane": 51200,
    "melon": 160,
    "pumpkin": 160,
    "cocoa": 160,
    "wheat": 1296,
    "mushroom": 160
}

export const npcPricing = {
    "potato": 160,
    "carrot": 160,
    "wart": 480,
    "cane": 25600,
    "melon": 160,
    "pumpkin": 640,
    "cocoa": 480,
    "wheat": 1296,
    "mushroom": 640
}

export const bazaarFarmingNames = [
    "ENCHANTED_POTATO",
    "ENCHANTED_CARROT",
    "ENCHANTED_NETHER_STALK",
    "ENCHANTED_SUGAR_CANE",
    "ENCHANTED_MELON",
    "ENCHANTED_PUMPKIN",
    "ENCHANTED_COCOA",
    "ENCHANTED_HAY_BLOCK"
]

export let bazaarNameToCropName = {
    'ENCHANTED_COCOA': 'cocoa',
    'ENCHANTED_NETHER_STALK': 'wart',
    'ENCHANTED_CARROT': 'carrot',
    'ENCHANTED_PUMPKIN': 'pumpkin',
    'ENCHANTED_SUGAR_CANE': 'cane',
    'ENCHANTED_HAY_BLOCK': 'wheat',
    'ENCHANTED_POTATO': 'potato',
    'ENCHANTED_MELON': 'melon'
}

export const configLocation = "./config/ChatTriggers/modules/HoeUtilitiesV2/config.toml";

export const petLevel = [
    0,
    660,
    1390,
    2190,
    3070,
    4030,
    5080,
    6230,
    7490,
    8870,
    10380,
    12030,
    13830,
    15790,
    17920,
    20230,
    22730,
    25430,
    28350,
    31510,
    34930,
    38630,
    42630,
    46980,
    51730,
    56930,
    62630,
    68930,
    75930,
    83730,
    92430,
    102130,
    112930,
    124930,
    138230,
    152930,
    169130,
    186930,
    206430,
    227730,
    250930,
    276130,
    303530,
    333330,
    365730,
    400930,
    439130,
    480530,
    525330,
    573730,
    625930,
    682130,
    742530,
    807330,
    876730,
    950930,
    1030130,
    1114830,
    1205530,
    1302730,
    1406930,
    1518630,
    1638330,
    1766530,
    1903730,
    2050430,
    2207130,
    2374830,
    2554530,
    2747230,
    2953930,
    3175630,
    3413330,
    3668030,
    3940730,
    4232430,
    4544130,
    4877830,
    5235530,
    5619230,
    6030930,
    6472630,
    6949330,
    7466030,
    8027730,
    8639430,
    9306130,
    10032830,
    10824530,
    11686230,
    12622930,
    13639630,
    14741330,
    15933030,
    17219730,
    18606430,
    20103130,
    21719830,
    23466530,
    25353230]

