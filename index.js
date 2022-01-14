/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./config";
import gui, { blockMaxAge, npcPricing, blockToMCBlockName, bazaarFarmingCompression, playerInformation, farmingBlockTypes, hoeStats, collection, globalStats, blocksToCollectionType } from './utils/constants';
import { initializeToolInfo, renderToolInfo } from "./displays/toolInfo";
import { getToolInfoWindow, getXpInfoWindow, getJacobTimerWindow, getJacobTimerTimer } from "./displays/elementaDisplay";
import { aggregateFarmingFortune, updateGlobalFarmingStats, updateHoeStats } from "./updateInformation";
import { getApiData, getBazaarData, getJacobEvents } from "./utils/getApiData";
import { addCommas, memorySizeOf, addCropDrop, checkInput, getCropDrop, resetGlobalFarmingInformation, updateSetting } from "./utils/utils";
import { initializeXpInfo, renderXpInfo } from "./displays/xpInfo";
import { guiMover, initiateGuiMover } from "./displays/guiMover";
import { calculateXpPerHour } from "./features/xpPerHour";
import { calculateYieldPerHour } from "./features/yield";
import {
    Window
} from "Elementa/index";

// init variables
let API_C = {
    SUGAR_CANE: "",
    POTATO_ITEM: "",
    CARROT_ITEM: "",
    WHEAT: "",
    NETHER_STALK: "",
    PUMPKIN: "",
    MELON: "",
    'INK_SACK:3': "",
    MUSHROOM_COLLECTION: "",
    CACTUS: ""
};

let bazaarObject = {
    'cocoa': 0,
    'wart': 0,
    'carrot': 0,
    'pumpkin': 0,
    'cane': 0,
    'wheat': 0,
    'potato': 0,
    'melon': 0,
    'mushroom': 0
};

globalStats.timeLeftUntilNextLevel = "";
let blockLookingAt = "";

// xp feature
let xpPerHour = 0;
let totalXP = 0;
let startXpPerHour = undefined;
let lastXpPerHour = undefined;

// yield feature
let yieldPerHour = 0;
let totalYield = 0;
let startYieldPerHour = undefined;
let lastYieldPerHour = undefined;
let lastBlockFarmed = undefined;
let lastToolUsed = undefined;

let nonFarmingDingSoundCounter = 0;

let cropIncome = 0;
let cropIncomeStart = undefined;
let cropIncomeLast = undefined;

let lastCropAmount = 0;

let preload = 0;
const mainWindow = new Window();
let toolInfoWindow = getToolInfoWindow();
let xpInfoWindow = getXpInfoWindow();
let jacobTimerWindow = getJacobTimerWindow();
let jacobTimerText = getJacobTimerTimer();
let lastTimeImageShown = Date.now();
let lastCrops = globalStats.nextJacobCrops;
let jacobTimerWasDisabled = false;

let startBlockBreakPerSecond;
let lastBlockBreakPerSecond;
let blockBreaksInTimeFrame;

function guiPreload() {
    if (!jacobTimerWindow) {
        getJacobEvents();
        jacobTimerWindow = getJacobTimerWindow();
        jacobTimerText = getJacobTimerTimer();
    }
    if (xpInfoWindow !== undefined && preload === 0 && jacobTimerWindow !== undefined) {
        mainWindow.addChildren(toolInfoWindow, xpInfoWindow, jacobTimerWindow, jacobTimerText);
        preload = 1;
    } else {
        toolInfoWindow = getToolInfoWindow();
        xpInfoWindow = getXpInfoWindow();
        jacobTimerWindow = getJacobTimerWindow();
        jacobTimerText = getJacobTimerTimer();
    }
}


if (!Settings.firstRun) {
    ChatLib.chat("§eThank you for downloading HoeUtilitiesV2!");
    ChatLib.chat("§aType §6/hu2 §ato open the Settings menu.");
    ChatLib.chat("§aType §6/hu2 help §ato see a list of commands.");
    ChatLib.chat("§aType §6/hu2 gui §ato move the gui around.");
    ChatLib.chat("§aType §6/hu2debug §ato print out a breakdown of your farming fortune.");
    ChatLib.chat("§aCertain features might not work if you haven't set your api key yet!");
    const clickableMessage = new Message(
        "§aIf you have any issues, please report them on the ",
        new TextComponent("github page.").setClick("open_url", "https://github.com/Dawjaw/HoeUtilitiesV2"),
        "."
    );
    ChatLib.chat(clickableMessage);
}

//commands
register("command", () => printDebugInfo()).setName("hu2debug");

register("command", (arg1, arg2) => {
    if (arg1 === undefined && arg2 === undefined) Settings.openGUI();
    if (arg1 === "gui" && arg2 === undefined) {
        gui.open();
    }
    if (arg1 === "key" && arg2 !== undefined && arg2.length === 36) {
        Settings.apiKey = arg2;
        updateSetting("apikey", `"${arg2}"`);
        ChatLib.chat("§eSet api key!")
        ChatLib.command("ct load", true);
    } else if (arg1 === "key" && arg2 === undefined) ChatLib.chat("§eInvalid command usage or invalid key");
    if (arg1 === "help") {
        ChatLib.chat("§aType §6/hu2 §ato open the Settings menu.");
        ChatLib.chat("§aType §6/hu2 help §ato see a list of commands.");
        ChatLib.chat("§aType §6/hu2 gui §ato move the gui around.");
        ChatLib.chat("§aType §6/hu2debug §ato print out a breakdown of your farming fortune.");
        const clickableMessage = new Message(
            "§aIf you have any issues, please report them on the ",
            new TextComponent("github page.").setClick("open_url", "https://github.com/Dawjaw/HoeUtilitiesV2"),
            "."
        );
        ChatLib.chat(clickableMessage);
    }
}).setName("hu2");

register('chat', (key) => {
    Settings.apiKey = key;
    updateSetting("apikey", `"${key}"`);
    ChatLib.chat("§eSet api key!")
    ChatLib.command("ct load", true);
}).setCriteria("Your new API key is ${key}");

// api
API_C = getApiData(API_C);
bazaarObject = getBazaarData(bazaarObject);
getJacobEvents();

// gui initialization
export let toolInfo = initializeToolInfo();
export let xpInfo = initializeXpInfo();

// cache images 
if (!Settings.firstRun) {
    const image1 = new Image("carrot.png", "https://jacobs.jeanlaurent.fr/assets/img/carrot.png");
    const image2 = new Image("melon.png", "https://jacobs.jeanlaurent.fr/assets/img/melon.png");
    const image3 = new Image("cocoa.png", "https://jacobs.jeanlaurent.fr/assets/img/cocoa_beans.png");
    const image4 = new Image("pumpkin.png", "https://jacobs.jeanlaurent.fr/assets/img/pumpkin.png");
    const image5 = new Image("cane.png", "https://jacobs.jeanlaurent.fr/assets/img/sugar_cane.png");
    const image6 = new Image("cactus.png", "https://jacobs.jeanlaurent.fr/assets/img/cactus.png");
    const image7 = new Image("potato.png", "https://jacobs.jeanlaurent.fr/assets/img/potato.png");
    const image8 = new Image("mushroom.png", "https://jacobs.jeanlaurent.fr/assets/img/mushroom.png");
    const image9 = new Image("wheat.png", "https://jacobs.jeanlaurent.fr/assets/img/wheat.png");
    const image10 = new Image("wart.png", "https://jacobs.jeanlaurent.fr/assets/img/nether_wart.png");
}

updateSetting("firstrun", true);

// gui move
initiateGuiMover(toolInfo, xpInfo);
register('renderOverlay', guiMover);
register("renderOverlay", () => {
    try {
        if (preload === 1) {
            if (jacobTimerWasDisabled) {
                jacobTimerWindow = getJacobTimerWindow();
                lastCrops = "disabled";
                mainWindow.clearChildren();
            }
            if (playerInformation.toolIsEquipped && !Settings.showLegacyGUI) {
                mainWindow.removeChild(toolInfoWindow);
                mainWindow.removeChild(xpInfoWindow);
                if (Settings.showToolInfo) {
                    toolInfoWindow = getToolInfoWindow();
                    mainWindow.addChild(toolInfoWindow);
                }
                if (Settings.showXpInfo) {
                    xpInfoWindow = getXpInfoWindow();
                    mainWindow.addChild(xpInfoWindow);
                }
            } else {
                mainWindow.removeChild(toolInfoWindow);
                mainWindow.removeChild(xpInfoWindow);
            }
            if(!Settings.showJacobTimer) {
                jacobTimerWasDisabled = true;
            }
            if(Settings.showJacobTimer && jacobTimerWindow && lastCrops !== JSON.stringify(globalStats.nextJacobCrops)) {
                mainWindow.removeChild(jacobTimerWindow);
                jacobTimerWindow = getJacobTimerWindow();
                mainWindow.addChild(jacobTimerWindow);
                lastCrops = JSON.stringify(globalStats.nextJacobCrops);
            } 
            if(Settings.showJacobTimer && jacobTimerText) {
                mainWindow.removeChild(jacobTimerText);
                jacobTimerText = getJacobTimerTimer();
                mainWindow.addChild(jacobTimerText);
            }
            if(gui.isOpen()) {
                mainWindow.removeChild(jacobTimerWindow);
                jacobTimerWindow = getJacobTimerWindow();
                mainWindow.addChild(jacobTimerWindow);
                lastCrops = JSON.stringify(globalStats.nextJacobCrops);
            }
            if(!playerInformation.toolIsEquipped){
            }
            mainWindow.draw();
        }
    } catch (e) {
        console.log("Error renderOverlay", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }
});

let tickStep = 0;
register('tick', () => {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    playerInformation.toolIsEquipped = !!heldItem.getString('id').match(/HOE_(CANE|POTATO|CARROT|WHEAT|WARTS)|DICER|COCO_CHOPPER|CACTUS_KNIFE|FUNGI_CUTTER|ROOKIE_HOE|DIAMOND_HOE/);
    if (playerInformation.toolIsEquipped) {
        playerInformation.toolType = (['pumpkin', 'melon', 'cocoa'].includes(playerInformation.crop)) ? 'Axe' : 'Hoe';
    }

    // render lines
    tickStep++;
    if (tickStep === 3) {
        xpPerHour = calculateXpPerHour(startXpPerHour, lastXpPerHour, totalXP);
        globalStats.xpPerHour = xpPerHour;
        yieldPerHour = calculateYieldPerHour(startYieldPerHour, lastYieldPerHour, totalYield);
        globalStats.yieldPerHour = yieldPerHour;
        tickStep = 0;
        toolInfo = renderToolInfo(toolInfo, yieldPerHour, cropIncome);
        xpInfo = renderXpInfo(xpInfo, xpPerHour);
    }
});

register('step', () => {
    // update Hoe Information
    if (!Player.lookingAt().toString().startsWith("Entity") && !Player.lookingAt().toString().startsWith("BlockType")) { 
        if (ChatTriggers.MODVERSION.split(".")[0] === "1") {
            if (checkInput(Player.lookingAt().getRegistryName().toString().split(':')[1], farmingBlockTypes)) {
                blockLookingAt = Player.lookingAt().getRegistryName().toString().split(':')[1];
                playerInformation.crop = blocksToCollectionType[blockLookingAt];
            }
        } else {    
            if (checkInput(Player.lookingAt().getType().getRegistryName().toString().split(':')[1], farmingBlockTypes)) {
                blockLookingAt = Player.lookingAt().getType().getRegistryName().toString().split(':')[1];
            }
        }
    }

    resetGlobalFarmingInformation();
    if (playerInformation.toolIsEquipped) {
        updateHoeStats();
    }

    updateGlobalFarmingStats(xpPerHour);
    aggregateFarmingFortune();
    resetLiveCounters();
    handleJacobsEvents();

    if (preload === 0) guiPreload();
}).setDelay(1);

register('step', () => {
    if (World.isLoaded()) {
        new Thread(() => {
            API_C = getApiData(API_C);
        }).start();
    }
}).setDelay(90);

register('step', () => {
    if (World.isLoaded()) {
        new Thread(() => {
            bazaarObject = getBazaarData(bazaarObject);
        }).start();
    }
    getJacobEvents();
}).setDelay(240);

// convert milliseconds to minutes and seconds
function convertSecondsToMinutesAndSeconds(milliseconds) {
    let seconds = milliseconds;
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function handleJacobsEvents() {
    if (globalStats.jacobEvents) {
        for (jEvent of globalStats.jacobEvents) {
            let currentTime = Math.floor((new Date()).getTime() / 1000);
            let eventTime = jEvent['time'];
            if (currentTime < eventTime) {
                let dateObject = new Date(eventTime * 1000);
                let humanDateFormat = dateObject.toLocaleString()
                let delta = eventTime - currentTime;
                globalStats.timeUntilJacobs = convertSecondsToMinutesAndSeconds(delta);
                let eventString = [];
                jEvent['crops'].forEach((crop) => {
                    eventString.push(crop);
                });
                globalStats.nextJacobCrops = eventString;
                break;
            }
        }
    } else {
        if(FileLib.exists("./config/ChatTriggers/modules/HoeUtilitiesV2/jacobs.json")) {
            globalStats.jacobEvents = JSON.parse(FileLib.read("./config/ChatTriggers/modules/HoeUtilitiesV2/jacobs.json"));
        }
    }
}

function handleBlockBreakEvent() {
    calculateCoinsPerHour();
    handleYieldPerHour();
    handleXPPerHour();
    addCropDrop(playerInformation.crop);
    blockBreaksInTimeFrame++;
    handleBlockBreaksPerSecond();
}

// working block break trigger used in 2.0.0+ versions
register('blockBreak', (block, player, event) => {
    if (ChatTriggers.MODVERSION.split(".")[0] === "2") {
        const ageBlockList = ['carrot', 'potato', 'wheat', 'cocoa', 'wart'];
        const nonAgeBlockList = ['mushroom', 'melon', 'pumpkin', 'cane'];
        playerInformation.crop = blocksToCollectionType[block.type.getRegistryName().split(":")[1]];
        if(nonAgeBlockList.includes(playerInformation.crop)) {
            handleBlockBreakEvent();
        } if(ageBlockList.includes(playerInformation.crop)) {
            let blockAge = block.getState().toString().match(/[0-9]+/)[0];
            if(blockAge === blockMaxAge[playerInformation.crop]) {
                handleBlockBreakEvent();
            }
        }
    }
});

// trigger to increase Collection
let S29PacketSoundEffect = Java.type("net.minecraft.network.play.server.S29PacketSoundEffect").class.toString();
register('packetReceived', (packet, event) => {
    if (ChatTriggers.MODVERSION.split(".")[0] === "1") {
        if (packet.class.toString().equals(S29PacketSoundEffect)) {
            if (packet.func_149212_c().equals("random.orb")) {
                if (packet.func_149209_h().toString() !== "1.4920635223388672") {
                    let reduced = false;
                    if (nonFarmingDingSoundCounter > 0) {
                        if (!reduced) {
                            nonFarmingDingSoundCounter--;
                            return;
                        }
                        nonFarmingDingSoundCounter -= 1;
                    }
                    handleBlockBreakEvent();
                }
            }
        }
    }
});


function handleBlockBreaksPerSecond() {
    if(!startBlockBreakPerSecond) {
        startBlockBreakPerSecond = Date.now();
        blockBreaksInTimeFrame = 0;
        globalStats.blockPerSeconds = 0;
    } 
    if (((Date.now() / 1000) - (lastBlockBreakPerSecond / 1000)) > 30) {
        startBlockBreakPerSecond = Date.now();
        blockBreaksInTimeFrame = 0;
        globalStats.blockPerSeconds = 0;
        lastBlockBreakPerSecond = undefined;
    } 
    if(startBlockBreakPerSecond) { 
        lastBlockBreakPerSecond = Date.now();
        let diff = (lastBlockBreakPerSecond / 1000) - (startBlockBreakPerSecond / 1000);
        globalStats.blockPerSeconds = (blockBreaksInTimeFrame / diff);
    }
}


register("actionBar", (message, e) => {
    if (message.includes('Farming')) {
        globalStats.xpGained = Number(message.split("+")[1].split(" ")[0]);
        if (message.split("(")[1].split(")")[0].includes("%")) {
            globalStats.currentXP = message.split("(")[1].split(")")[0].replace("%", "");
        } else {
            globalStats.currentXP = message.split("(")[1].split(")")[0].replace("/0", "");
        }
    }
}).setCriteria("${message}");

function handleXPPerHour() {
    if (globalStats.xpGained !== undefined) {
        if (startXpPerHour === undefined) {
            startXpPerHour = Date.now();
        }
        totalXP += parseFloat(ChatLib.removeFormatting(globalStats.xpGained));
        lastXpPerHour = Date.now();
    }
}

function resetLiveCounters() {
    if (((Date.now() / 1000) - (lastXpPerHour / 1000)) > 30) {
        totalXP = 0;
        startXpPerHour = undefined;
        xpPerHour = undefined;
        globalStats.xpPerHourExpected = undefined;
        globalStats.xpGained = 0;
    }
    if (((Date.now() / 1000) - (lastYieldPerHour / 1000)) > 30) {
        totalYield = 0;
        lastBlockFarmed = undefined;
        startYieldPerHour = undefined;
        lastToolUsed = undefined;
    }
    if (((Date.now() / 1000) - (cropIncomeLast / 1000)) > 15) {
        cropIncome = 0;
        cropIncomeLast = undefined;
        cropIncomeStart = undefined;
    }
}

function calculateCoinsPerHour() {
    if (bazaarObject[playerInformation.crop] && bazaarObject[playerInformation.crop] && yieldPerHour) {
        if (!cropIncomeStart) cropIncomeStart = Date.now();
        let enchDrops = Number(yieldPerHour.split(",").join("")) / Number(bazaarFarmingCompression[playerInformation.crop]);
        let cropPrice = (npcPricing[playerInformation.crop] >= bazaarObject[playerInformation.crop]) ? npcPricing[playerInformation.crop] : bazaarObject[playerInformation.crop];
        let cropGain = enchDrops * cropPrice;
        let drops = getCropDrop(playerInformation.crop);
        let bountifulBonus = 0;
        if (hoeStats.bountiful) {
            let c1 = drops * 0.2;
            bountifulBonus = (c1 * 20 * 60 * 60);
        }
        cropIncome = cropGain;
        let totalCropIncome = addCommas(Math.round(cropGain + bountifulBonus));
        globalStats.cropGain = totalCropIncome;
        cropIncomeLast = Date.now();
    }
}

function handleYieldPerHour() {
    if (lastBlockFarmed === undefined) {
        if (blockLookingAt === "air") return;
        lastBlockFarmed = blockLookingAt;
        startYieldPerHour = Date.now();
        lastToolUsed = playerInformation.crop;
    }
    if (lastToolUsed !== playerInformation.crop) {
        totalYield = 0;
        lastBlockFarmed = undefined;
        startYieldPerHour = undefined;
        lastToolUsed = undefined;
    }
    if (lastToolUsed !== undefined && lastBlockFarmed !== undefined) {
        totalYield += getCropDrop(playerInformation.crop);
        lastYieldPerHour = Date.now();
    }
}

function printDebugInfo() {
    ChatLib.chat("§cFarming Fortune overview")
    ChatLib.chat("§2Base Farming Fortune: §f" + 100);
    ChatLib.chat("§2Tier Bonus: §f" + hoeStats.tierBonus);
    ChatLib.chat("§2Cultivating Bonus: §f" + hoeStats.cultivating);
    ChatLib.chat("§2Rarity Bonus: §f" + hoeStats.rarity);
    ChatLib.chat("§2Level Bonus: §f" + (globalStats.farmingLevel * 4));
    ChatLib.chat("§2Harvesting Bonus: §f" + hoeStats.harvesting);
    ChatLib.chat("§2Farming For Dummies Bonus: §f" + globalStats.fFD);
    ChatLib.chat("§2Turbo Bonus: §f" + hoeStats.turbo);
    ChatLib.chat("§2Item Specific Bonus: §f" + hoeStats.itemRate);
    ChatLib.chat("§2Elephant Bonus: §f" + globalStats.elephant);
    ChatLib.chat("§2Anita Bonus: §f" + (globalStats.anita * 2));
    ChatLib.chat("§9TOTAL: §f" + playerInformation.total);
}
