import Settings from "../config";
import {baseCropDrops, playerInformation, collectionTypeToBlocks, colors, units, configLocation, hoeStats, collection, globalStats} from "./constants";
const Color = Java.type("java.awt.Color");


export function addCommas(str) {
    str = String(str);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function checkInput(input, words) {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
}

export const getCultivatingCount = () => {
    try {
        return Player.getHeldItem()
            .getItemStack()
            .func_77978_p()
            .func_74775_l("ExtraAttributes")
            .func_74762_e("farmed_cultivating");
    } catch (e) {
        return null;
    }
};

export function getScale(max, value) {
    return (value / max) * 100;
}

export function calcRotation(plane) {
    let rawRotation = undefined;
    if (plane === "Yaw"){
        rawRotation = Math.round(Player.getYaw()*10)/10;
    } else {
        rawRotation = Math.round(Player.getPitch()*10)/10;
    }
    let _baseDir = 67.5;
    let dir = '';
    if (plane === "Yaw") {
        if (rawRotation <= _baseDir && rawRotation >= -_baseDir) dir += 'S';
        if (rawRotation >= _baseDir+45 || rawRotation <= -_baseDir-45) dir += 'N';
        if (rawRotation >= _baseDir-45 && rawRotation <= _baseDir+90) dir += 'W';
        if (rawRotation <= -_baseDir+45 && rawRotation >= -_baseDir-90) dir += 'E';
    } else {
        if (rawRotation >= 0) dir += 'Down';
        if (rawRotation <= 0) dir += 'Up';
    }

    if (Settings.rotationOutput === 0) {
        return rawRotation+(dir !== '' ? ` (${dir})` : '');
    }
    else {
        if (rawRotation <= -90) {
            return Math.round(rawRotation*-10-1800)/10+'°'+(dir !== '' ? ` (${dir})` : '');
        }
        else if (rawRotation >= 90) {
            return Math.round(1800-rawRotation*10)/10+'°'+(dir !== '' ? ` (${dir})` : '');
        }
        else return rawRotation+'°'+(dir !== '' ? ` (${dir})` : '');
    }
}

export function getMaxEfficiencyYield(cropRate, crop) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    let randomDrops = 0;
    let unit = units[Settings.maxYieldUnit];
    let unitModif, precisionModif;
    switch(unit) {
        case '/h':
            unitModif = 20 * 60 * 60;
            precisionModif = 1;
            break;
        case '/event':
            unitModif = 20 * 60 * 20;
            precisionModif = 1;
            break;
        case '/min':
            unitModif = 20 * 60;
            precisionModif = 10;
            break;
        case '/s':
            unitModif = 20;
            precisionModif = 10;
            break;
        case '/harvest':
            unitModif = 1;
            precisionModif = 100;
            break;
    }
    if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        randomDrops = (64*0.00114 + 160*0.00043 + 10*160*0.00007 + 64*160*0.00001) * unitModif;
    }
    else if (heldItem.getString('id').match(/MELON_DICER/)) {
        randomDrops = (160*0.00114 + 5*160*0.00043 + 50*160*0.00007 + 2*160*160*0.00001) * unitModif;
    }
    return addCommas(Math.round((cropRate/100 * baseCropDrops[crop] * precisionModif) / precisionModif * unitModif + randomDrops))+unit;
}

export function addCropDrop(blockBroken){
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    let randomDrops = 0;
    if (heldItem.getString('id').match(/PUMPKIN_DICER/) && blockBroken === 'pumpkin') {
        randomDrops = (64*0.00114 + 160*0.00043 + 10*160*0.00007 + 64*160*0.00001);
    }
    else if (heldItem.getString('id').match(/MELON_DICER/) && blockBroken === 'melon') {
        randomDrops = (160*0.00114 + 5*160*0.00043 + 50*160*0.00007 + 2*160*160*0.00001);
    }
    globalStats.currentLevelXP += globalStats.xpGained;
    globalStats.xpUntilNextLevel -= globalStats.xpGained;
    collection[blockBroken] += (playerInformation.total / 100 * baseCropDrops[blockBroken]) + randomDrops;
}

export function getCropDrop(blockBroken){
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    let randomDrops = 0;
    if (heldItem.getString('id').match(/PUMPKIN_DICER/) && blockBroken === 'pumpkin') {
        randomDrops = (64*0.00114 + 160*0.00043 + 10*160*0.00007 + 64*160*0.00001);
    }
    else if (heldItem.getString('id').match(/MELON_DICER/) && blockBroken === 'melon') {
        randomDrops = (160*0.00114 + 5*160*0.00043 + 50*160*0.00007 + 2*160*160*0.00001);
    }
    return (playerInformation.total / 100 * baseCropDrops[blockBroken]) + randomDrops;
}

export function getColor(color){
    let red = color.getRed();
    let green = color.getGreen();
    let blue = color.getBlue();
    let alpha = (color.getAlpha() !== undefined) ? color.getAlpha() : 255;
    return Renderer.color(red, green, blue, alpha);
}

export function getJavaColor(color){
    return new Color(color.getRed()/255, color.getGreen()/255, color.getBlue()/255, (color.getAlpha()/255) ? color.getAlpha()/255 : 0);
}

export function resetGlobalFarmingInformation() {
    globalStats.elephant = 0
    globalStats.fFD = 0
    hoeStats.tierBonus = 0
    hoeStats.cultivating = 0
    hoeStats.harvesting = 0
    hoeStats.itemRate = 0
    hoeStats.turbo = 0
    hoeStats.rarity = 0
}

export function doThings() {
    console.log("done");
}

export function buildDisplayLine(string, value){
    let pc = null;
    for (let setting in Settings){
        if(setting.toString().toLowerCase().includes('primary'+playerInformation.crop)) pc = colors[Settings[setting].toString()];
    }

    let sc = null;
    for (let setting in Settings){
        if(setting.toString().toLowerCase().includes('secondary'+playerInformation.crop)) sc = colors[Settings[setting].toString()];
    }
    if(value === null) {
        return `${pc}${string}`
    }
    return ` ${pc}[${sc}${string}${pc}]§f: ${value}`;
}

export function updateSetting(setting, value){
    let lineBuffer = "";
    let fileBuffer = "";
    let file = FileLib.read(configLocation);

    for (let i in file){
        if(file[i] !== "\n"){
            lineBuffer = lineBuffer.concat(file[i]);
        } else{
            if(lineBuffer.includes(setting)){
                lineBuffer = `${lineBuffer.split(setting.charAt(0))[0]}${setting} = ${value}\r\n`;
                fileBuffer = fileBuffer.concat(lineBuffer);
                lineBuffer = "";
            } else{
                fileBuffer = fileBuffer.concat(lineBuffer+="\n");
                lineBuffer = "";
            }
        }
    }
    FileLib.write(configLocation, fileBuffer);
}

// made by https://gist.github.com/zensh/4975495
export function memorySizeOf(obj) {
    var bytes = 0;

    function sizeOf(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
            case 'number':
                bytes += 8;
                break;
            case 'string':
                bytes += obj.length * 2;
                break;
            case 'boolean':
                bytes += 4;
                break;
            case 'object':
                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                if(objClass === 'Object' || objClass === 'Array') {
                    for(var key in obj) {
                        if(!obj.hasOwnProperty(key)) continue;
                        sizeOf(obj[key]);
                    }
                } else bytes += obj.toString().length * 2;
                break;
            }
        }
        return bytes;
    };

    function formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(obj));
};