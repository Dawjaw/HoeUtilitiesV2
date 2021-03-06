import Settings from "../config";
import {
    addCommas,
    buildDisplayLine,
    calcRotation,
    getColor,
    getCultivatingCount,
    getMaxEfficiencyYield
} from "../utils/utils";
import {alignment, units, hoeStats, collection, playerInformation} from "../utils/constants";

export function initializeToolInfo() {

    return new Display()
        .setShouldRender(false)
        .setBackground('full')
        .setBackgroundColor(getColor(Settings.toolInfoBackgroundColor));
}

export function renderToolInfo(toolInfo, liveYield, cropGain) {
    if (!Settings.showToolInfo || !playerInformation.toolIsEquipped || !Settings.showLegacyGUI) {
        toolInfo.setShouldRender(false);
        return toolInfo;
    }
    // init vars for gui
    let displayLines = [];
    let counter = (hoeStats.counter !== undefined) ? hoeStats.counter : undefined;

    // prepare gui
    toolInfo.clearLines();
    toolInfo.setShouldRender(true);

    // add lines
    displayLines.push(new DisplayLine(buildDisplayLine(`&lTool Info`, null)).setScale(0.25 + (Settings.toolInfoScale/100)));
    if (counter !== undefined) displayLines.push(new DisplayLine(buildDisplayLine(`Counter`, addCommas(counter))));
    if (hoeStats.cultivating !== undefined) displayLines.push(new DisplayLine(buildDisplayLine(`Cultivating`, addCommas(getCultivatingCount()))));
    displayLines.push(new DisplayLine(buildDisplayLine(`Farming Fortune`, `${playerInformation.total} §6☘`)));
    displayLines.push(new DisplayLine(buildDisplayLine(`Live Yield`, (`${(liveYield !== undefined) ? liveYield : 0}${units[Settings.liveTrackerUnit]}`))));
    displayLines.push(new DisplayLine(buildDisplayLine(`Max Yield`, getMaxEfficiencyYield(playerInformation.total, playerInformation.crop))));
    displayLines.push(new DisplayLine(buildDisplayLine(`Expected Profit`, (cropGain) ? (cropGain+"/h") : "0/h")));
    displayLines.push(new DisplayLine(buildDisplayLine(`Collection`, addCommas(Math.floor(collection[playerInformation.crop])))));
    displayLines.push(new DisplayLine(buildDisplayLine(`Yaw`, calcRotation(`Yaw`))));
    displayLines.push(new DisplayLine(buildDisplayLine(`Pitch`, calcRotation(`Pitch`))));

    // formatting
    displayLines.forEach((line, i) => {
        toolInfo.setLine(i, line.setShadow(true));
        toolInfo.setLine(i, line.setAlign(alignment[Settings.toolInfoAlignment]).setScale(Settings.toolInfoScale/100));
    })
    toolInfo.setBackgroundColor(getColor(Settings.toolInfoBackgroundColor));
    return toolInfo;
}
