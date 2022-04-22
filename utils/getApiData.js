import Settings from '../config'
import {bazaarFarmingNames, bazaarNameToCropName, petLevel, skillCurves, collection, globalStats, petInformation} from "./constants";
import Promise from "../../PromiseV2";
import request from "../../requestV2";

let API_N = {}

const sendRequest = (url) => {
    const returnedPromise = request({
        url,
        headers: {
            "User-Agent": "Mozilla/5.0 (ChatTriggers)"
        }
    });
    return new Promise((resolve, reject) => {
        returnedPromise.then((response) => resolve(JSON.parse(response))).catch((error) => reject(error));
    });
}

export function getApiData(API_C) {
    try {
        if (Settings.apiKey.length !== 36) {
            ChatLib.chat("§ePlease set your api key by generating a new key with §b/api new §eor using §b/hu2 key yourkey §e!");
            return API_C;
        }
        if (API_C === undefined) {
            API_C = {
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
        }

        let uuid = Player.getUUID();
        let shortUUID = uuid.split("-").join("");

        sendRequest('https://api.hypixel.net/skyblock/profiles?key=' + Settings.apiKey + '&uuid=' + uuid)
            .then(json => {
                if (json.profiles === undefined) {
                    ChatLib.chat("&6Couldn't find any Skyblock profiles for this player.");
                    return API_C;
                }

                let last_time = 0;
                let profile_in_use;
                json.profiles.forEach(response => {
                    if (last_time < response.members[shortUUID].last_save) {
                        last_time = response.members[shortUUID].last_save
                        profile_in_use = response.members[shortUUID];
                    }
                });
                globalStats.anita = (profile_in_use.jacob2.perks.double_drops !== undefined) ? profile_in_use.jacob2.perks.double_drops : 0;
                globalStats.farmingCap = (profile_in_use.jacob2.perks.farming_level_cap !== undefined) ? profile_in_use.jacob2.perks.farming_level_cap : 0;

                API_N = (profile_in_use.collection !== undefined) ? profile_in_use.collection : undefined;

                try {
                    if (API_N !== undefined) {
                        // set collections/update only updates if there are new values
                        collection.cane = (API_N.SUGAR_CANE !== API_C.SUGAR_CANE) ? API_N.SUGAR_CANE : API_C.SUGAR_CANE;
                        collection.potato = (API_N.POTATO_ITEM !== API_C.POTATO_ITEM) ? API_N.POTATO_ITEM : API_C.POTATO_ITEM;
                        collection.carrot = (API_N.CARROT_ITEM !== API_C.CARROT_ITEM) ? API_N.CARROT_ITEM : API_C.CARROT_ITEM;
                        collection.wheat = (API_N.WHEAT !== API_C.WHEAT) ? API_N.WHEAT : API_C.WHEAT;
                        collection.wart = (API_N.NETHER_STALK !== API_C.NETHER_STALK) ? API_N.NETHER_STALK : API_C.NETHER_STALK;
                        collection.pumpkin = (API_N.PUMPKIN !== API_C.PUMPKIN) ? API_N.PUMPKIN : API_C.PUMPKIN;
                        collection.melon = (API_N.MELON !== API_C.MELON) ? API_N.MELON : API_C.MELON;
                        collection.cocoa = (API_N['INK_SACK:3'] !== API_C['INK_SACK:3']) ? API_N['INK_SACK:3'] : API_C['INK_SACK:3'];
                        collection.mushroom = (API_N.MUSHROOM_COLLECTION !== API_C.MUSHROOM_COLLECTION) ? API_N.MUSHROOM_COLLECTION : API_C.MUSHROOM_COLLECTION;
                        collection.cactus = (API_N.CACTUS !== API_C.CACTUS) ? API_N.CACTUS : API_C.CACTUS;
                    }
                } catch (e) {
                    console.log("Error Parsing API Data", e.stack);
                    console.log("Error", e.name);
                    console.log("Error", e.message);
                    console.log(JSON.stringify(API_N));
                    console.log(JSON.stringify(API_C));
                }
                if (API_N !== undefined) {
                    API_C = API_N;
                }

                globalStats.farmingExpCap = (profile_in_use.experience_skill_farming !== undefined) ? profile_in_use.experience_skill_farming : undefined;

                let level = 0;
                //console.log(JSON.stringify(profile_in_use.pets));
                profile_in_use.pets.forEach(pet => {
                    if (pet.active && (pet.type.toString() === "ELEPHANT" || pet.type.toString() === "MOOSHROOM_COW")) {
                        petLevel.forEach(xpRequired => {
                            if (pet.exp > xpRequired) {
                                level += 1;
                            }
                            if (level >= 100) {
                                level = 100;
                            }
                        });
                        petInformation.activePet = pet.type.toString();
                        petInformation.petLevel = level;
                        if (pet.heldItem === "MINOS_RELIC") {
                            petInformation.minosRelic = true;
                        } else {
                            petInformation.minosRelic = false;
                        }
                    } else {
                        petInformation.activePet = "";
                        petInformation.petLevel = 0;
                        petInformation.minosRelic = false;
                    }
                });

                if (globalStats.farmingExpCap !== undefined) {
                    let farmingLevel = 0;
                    skillCurves.forEach(exp => {
                        if (exp <= globalStats.farmingExpCap) farmingLevel += 1;
                    })
                    globalStats.farmingLevel = farmingLevel;
                }
                return API_C;
            }).catch((e => console.log(e)));    

    } catch (e) {
        console.log("Error API General", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }

}

export function getBazaarData(return_price) {
    let price_sheet = [];
    if (Settings.apiKey.length !== 36) {
        ChatLib.chat("§ePlease set your api key by generating a new key with §b/api new §eor using §b/hu2 key yourkey §e!");
        return return_price;
    }
    sendRequest('https://sky.lea.moe/api/bazaar')
        .then(json => {
            json.forEach(value => {
                price_sheet.push({key: value.id.toString(), value: value.sellPrice});
            });
            bazaarFarmingNames.forEach(key => {
                let val = price_sheet.find(o => o.key === key).value;
                let name = price_sheet.find(o => o.key === key).key;
                let new_value = bazaarNameToCropName[name]
                return_price[new_value] = val
            });
            return_price['mushroom'] = (price_sheet.find(o => o.key === "ENCHANTED_RED_MUSHROOM").value + price_sheet.find(o => o.key === "ENCHANTED_BROWN_MUSHROOM").value) / 2;
        }).catch(e => {
        console.log("Error bazaar parsing", e.stack);
        console.log("Error", e);
        console.log("Error", e.message);
    });
    return return_price;
}

export function getJacobEvents() {
    try {
        sendRequest('https://dawjaw.net/jacobs')
            .then(json => {
                //globalStats.jacobEvents = json;
                globalStats.jacobEvents = json;
            }).catch(e => {
                console.log("Error JacobEvent", e.stack);
                console.log("Error JacobEvent", e.name);
                console.log("Error JacobEvent", e.message);
        });
    } catch(e) {
        console.log("Error JacobEvent", e.stack);
        console.log("Error JacobEvent", e.name);
        console.log("Error JacobEvent", e.message);
    }
}