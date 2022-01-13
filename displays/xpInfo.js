import Settings from "../config";
import {addCommas, getColor, buildDisplayLine} from "../utils/utils";
import {alignment, globalStats, playerInformation} from "../utils/constants";


export function initializeXpInfo() {

    return new Display()
        .setShouldRender(false)
        .setBackground('full')
        .setBackgroundColor(getColor(Settings.xpInfoBackgroundColor));
}

export function renderXpInfo(xpInfo, xpPerHour) {
    if (!Settings.showXpInfo || !playerInformation.toolIsEquipped || !Settings.showLegacyGUI) {
        xpInfo.setShouldRender(false);
        return xpInfo;
    }
    // init vars for gui
    let displayLines = [];

    // prepare gui
    xpInfo.clearLines();
    xpInfo.setShouldRender(true);

    // add lines globalStats.timeLeftUntilNextLevel
    if (Settings.showXpInfo) displayLines.push(new DisplayLine(buildDisplayLine("&lXP Info", null)).setScale(0.25 + (Settings.xpInfoScale/100)));
    if (Settings.showCurrentLevel) displayLines.push(new DisplayLine(buildDisplayLine("Current Level", (globalStats.currentLevel ? addCommas(Math.round(globalStats.currentLevel)) : "Start farming!"))));
    if (Settings.showCurrentXP && !Number.isNaN(globalStats.currentLevelXP)) displayLines.push(new DisplayLine(buildDisplayLine("Current XP", (globalStats.currentLevelXP ? addCommas(Math.round(globalStats.currentLevelXP)) : "Start farming!"))));
    if(Number.isNaN(globalStats.currentLevelXP)) {
        displayLines.push(new DisplayLine(buildDisplayLine("Current XP", (globalStats.currentXP ? globalStats.currentXP : "Start farming!"))));
    }
    if (Settings.showXPUntilNextLevel && globalStats.currentLevel !== 60) displayLines.push(new DisplayLine(buildDisplayLine("XP Until next Level", (globalStats.xpUntilNextLevel ? addCommas(Math.round(globalStats.xpUntilNextLevel)) : "Start farming!"))));
    if (Settings.showTimeUntilNextLevel && globalStats.currentLevel !== 60) displayLines.push(new DisplayLine(buildDisplayLine("Time until next Level", (!globalStats.timeLeftUntilNextLevel.includes("NaN")) ? globalStats.timeLeftUntilNextLevel : "Start farming!")));
    if (Settings.showXPPerHour) displayLines.push(new DisplayLine(buildDisplayLine("XP Per Hour", (xpPerHour ? addCommas(xpPerHour) : "Start farming!"))));
    if (Settings.showMaxXPPerHour) displayLines.push(new DisplayLine(buildDisplayLine("Expected XP Per Hour", (globalStats.xpPerHourExpected ? addCommas(Math.round(globalStats.xpPerHourExpected)) : "Start farming!"))));

    // formatting
    displayLines.forEach((line, i) => {
        xpInfo.setLine(i, line.setShadow(true));
        xpInfo.setLine(i, line.setAlign(alignment[Settings.xpInfoAlignment]).setScale(Settings.xpInfoScale/100));
    })


    xpInfo.setBackgroundColor(getColor(Settings.xpInfoBackgroundColor));
    return xpInfo;
}
