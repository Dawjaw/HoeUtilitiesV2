import Settings from "../config";
import {createToolInfoGuiContainer, createXPInfoGuiContainer, createJacobTimerGuiContainer, createImage} from "./elementaHelper";
import {getMaxEfficiencyYield, getJavaColor, getColor, addCommas, getCultivatingCount, getMaxEfficiencyYield, calcRotation} from "../utils/utils";
import {playerInformation, globalStats} from "../utils/constants";
const Color = Java.type("java.awt.Color");

//let window = new Window();

/*
export function updateElementaGUI() {
    if(playerInformation.toolIsEquipped) {
        if (Settings.showToolInfo) window.addChild(createToolInfoGuiContainer());
        if (Settings.showXpInfo) window.addChild(createXPInfoGuiContainer());
    }
    if (Settings.showJacobTime && globalStats.nextJacobCrops !== undefined) window.addChild(createJacobTimerGuiContainer());
    window.draw();
    window.clearChildren();
}*/

export function getToolInfoWindow(){
    let a = createToolInfoGuiContainer();
    return a;
}

export function getXpInfoWindow(){
    let a = createXPInfoGuiContainer();
    return a;
}

export function getJacobTimerWindow(){
    let a = createImage();
    return a;
}