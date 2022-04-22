import Settings from "./config";
import { toolToTurboEnchant, playerInformation, turboEnchants, rarities, skillCurves, hoeStats, globalStats, bountiful, petInformation } from "./utils/constants";
import { addCommas } from "./utils/utils";

function checkInput(input, words) {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
}

export function updateHoeStats() {

    if (Player.getHeldItem()?.getRawNBT() === null) return;
    try {
        if (Player.getHeldItem().getRawNBT().match(/Lore:(\[.+\])/)[1].replace(/\d+:/g, '') === null) return;
    } catch (e) {
        return;
    }
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    const cultivating_level = heldItem.getCompoundTag("enchantments").getLong("cultivating");
    const lore = JSON.parse(Player.getHeldItem().getRawNBT().match(/Lore:(\[.+\])/)[1].replace(/\d+:/g, ''));

    hoeStats.counter = undefined;
    if (heldItem.getLong('mined_crops')) hoeStats.counter = heldItem.getLong('mined_crops');

    // Tier bonus
    if (heldItem.getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)) {
        const hoeBonusValues = [10, 25, 50];
        let tier = heldItem.getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)[1];
        hoeStats.tierBonus = hoeBonusValues[tier - 1];
    }
    else if (heldItem.getString('id').match(/COCO_CHOPPER/)) {
        hoeStats.tierBonus = 20;
    }
    else if (heldItem.getString('id').match(/FUNGI_CUTTER/)) {
        hoeStats.tierBonus = 30;
    }

    // cultivating
    if (heldItem.getString('farmed_cultivating') !== null) {
        hoeStats.cultivating = cultivating_level;
    }

    // harvesting
    let harvesting = 0;
    if (heldItem.getCompoundTag('enchantments').getLong('harvesting')) {
        harvesting = heldItem.getCompoundTag('enchantments').getLong('harvesting') * 12.5
    }
    hoeStats.harvesting = harvesting;

    // item rate
    hoeStats.itemRate = 0;
    if (heldItem.getString('id').match(/HOE_(CANE|POTATO|CARROT|WHEAT|WART)_[23]/)) {
        let str = lore
        str = ChatLib.removeFormatting(str);
        let split_str = str.split(",");
        for (let sp in split_str) {
            if (split_str[sp].includes("Farming Fortune")) {
                if (!isNaN(split_str[sp].split(" ")[0].replace("+", ""))) {
                    hoeStats.itemRate += Number(split_str[sp].split(" ")[0].replace("+", ""));
                }
            }
        }
    }

    if (heldItem.getString('id').match("COCO_CHOPPER")) {
        hoeStats.itemRate += 20;
    }

    // Turbo
    turboEnchants.forEach(enchant => {
        if (heldItem.getCompoundTag('enchantments').getInteger(enchant) && toolToTurboEnchant[playerInformation.crop] === enchant) {
            hoeStats.turbo = heldItem.getCompoundTag('enchantments').getInteger(enchant) * 5;
        }
    });

    // get rarity, made by joker876
    const substrings = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"]
    let str = JSON.stringify(lore, null, 2); // spacing level = 2
    let rarity;
    for (let i = 1; i <= 6; i++) {
        if (substrings.some(v => str.includes(v))) {
            if (lore[lore.length - i]) {
                if (lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)) {
                    rarity = lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)[1];
                }
            }
        }
    }

    if (heldItem.getString('modifier') === 'blessed') {
        hoeStats.rarity = rarities[rarity];
        hoeStats.bountiful = false;
    } else if (heldItem.getString('modifier') === 'bountiful') {
        hoeStats.rarity = bountiful[rarity];
        hoeStats.bountiful = true;
    } else {
        hoeStats.rarity = 0;
        hoeStats.bountiful = false;
    }
}

export function aggregateFarmingFortune() {
    playerInformation.total = 0;
    playerInformation.total += 100;
    playerInformation.total += Number((globalStats.farmingLevel * 4 === undefined) ? 0 : (globalStats.farmingLevel * 4));
    playerInformation.total += Number((petInformation.fortuneBonus === undefined) ? 0 : petInformation.fortuneBonus);
    playerInformation.total += Number((globalStats.fFD === undefined) ? 0 : globalStats.fFD);
    playerInformation.total += Number((globalStats.anita * 2 === undefined) ? 0 : (globalStats.anita * 2));
    playerInformation.total += Number((hoeStats.tierBonus === undefined) ? 0 : hoeStats.tierBonus);
    playerInformation.total += Number((hoeStats.cultivating === undefined) ? 0 : hoeStats.cultivating);
    playerInformation.total += Number((hoeStats.harvesting === undefined) ? 0 : hoeStats.harvesting);
    playerInformation.total += Number((hoeStats.itemRate === undefined) ? 0 : hoeStats.itemRate);
    playerInformation.total += Number((hoeStats.turbo === undefined) ? 0 : hoeStats.turbo);
    playerInformation.total += Number((hoeStats.rarity === undefined) ? 0 : hoeStats.rarity);
}

export function updateGlobalFarmingStats(xpPerHour) {
    if(!World.isLoaded()) return;
    // get FFD
    if (Player.getHeldItem()) {
        const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
        globalStats.fFD = heldItem.getInteger('farming_for_dummies_count');
    }

    let playerName = Player.getName();
    const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
    World.getAllEntitiesOfType(ArmorStand.class)?.forEach(entity => {
        if (entity.getName() === undefined || entity.getName() === null) return;
        entity = ChatLib.removeFormatting(entity.getName());
        if (entity.includes(playerName) && (entity.includes("Elephant") || entity.includes("Mooshroom Cow"))) {
            petInformation.petLevel = Number(entity.split(" ")[0].replace('[Lv', '').replace("]", ""));
            entity.includes("Elephant") ? petInformation.activePet === "ELEPHANT" : petInformation.activePet === "MOOSHROOM_COW";
        }
    });

    // get Xp info
    TabList.getNames().forEach(name => {
        try {
            if (name.includes("Skills") && name.includes("Farming") && globalStats.currentXP !== undefined) {
                if (globalStats.oldPercentage !== Number(parseFloat(ChatLib.removeFormatting(globalStats.currentXP)) / 100)) {
                    if (globalStats.farmingLevel === undefined) globalStats.farmingLevel = Number(name.split(" ")[2].replace(":", ""));
                    let currentLevel = Number(name.split(" ")[2].replace(":", ""));
                    let percentage = Number(parseFloat(ChatLib.removeFormatting(globalStats.currentXP)) / 100);
                    globalStats.oldPercentage = percentage;
                    let xpTotalXPForNextLevel = skillCurves[currentLevel];
                    let xpRequiredForNextLevel = skillCurves[currentLevel] - skillCurves[currentLevel - 1];

                    globalStats.currentLevel = currentLevel;
                    globalStats.currentLevelXP = (xpRequiredForNextLevel !== undefined && xpRequiredForNextLevel !== NaN) ? Math.round(xpRequiredForNextLevel * percentage) : globalStats.currentXP;
                    globalStats.xpRequiredForNextLevel = xpRequiredForNextLevel;
                    globalStats.xpUntilNextLevel = xpRequiredForNextLevel - globalStats.currentLevelXP
                }
                globalStats.xpPerHourExpected = (globalStats.xpGained * 20 * 60 * 60);
            }
            if (name.includes("Strength")) {
                let re = /(\d+)/;
                playerInformation.strength = re.exec(ChatLib.removeFormatting(name))[0];
            }
        } catch (e) {
            console.log("Error Update Information TabList", e.stack);
            console.log("Error", e.name);
            console.log("Error", e.message);
        }
    });

    let timeLeft = timeLeftUntilNextLevelInHoursMinutesSeconds((xpPerHour) ? xpPerHour : 0, globalStats.currentLevelXP, globalStats.xpRequiredForNextLevel);
    let string = `${timeLeft['hours']}:${timeLeft['minutes']}:${timeLeft['seconds']}`;
    globalStats.timeLeftUntilNextLevel = string;

    if(petInformation.activePet) {
        if(petInformation.activePet === "ELEPHANT") {
            petInformation.fortuneBonus = petInformation.petLevel * 1.8;
        }
        else {
            let petAttribute = 0;
            let minosBonus = 0;
            let strengthBonus = 0;
            petAttribute = Math.floor(petInformation.petLevel * 0.5);
            if (petInformation.minosRelic) {
                minosBonus = Math.floor(petAttribute * 0.33);
            }
            strengthBonus += Math.floor(playerInformation.strength / 10);
            petInformation.fortuneBonus = petAttribute + minosBonus + strengthBonus;
            //console.log(`attr: ${petAttribute} | minos: ${minosBonus} |  str: ${strengthBonus}`);
        }
    }

    //console.log(JSON.stringify(petInformation));
}

function timeLeftUntilNextLevelInHoursMinutesSeconds(xpPerHour, currentXP, xpRequiredForNextLevel) {
    let timeLeft = (xpRequiredForNextLevel - currentXP) / xpPerHour;
    let hours = Math.floor(timeLeft);
    let minutes = Math.floor(((timeLeft - hours) * 60 * 60) / 60);
    let seconds = Math.floor((timeLeft - hours) * 60 * 60 - minutes * 60);
    return {
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
