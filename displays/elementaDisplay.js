import {
    Window
} from "Elementa/index";
import Settings from "../config";
import {createToolInfoGuiContainer, createXPInfoGuiContainer} from "./elementaHelper";
import {getMaxEfficiencyYield, getJavaColor, getColor, addCommas, getCultivatingCount, getMaxEfficiencyYield, calcRotation} from "../utils/utils";
const Color = Java.type("java.awt.Color");

let window = new Window();

export function updateElementaGUI() {
    if (Settings.showToolInfo) window.addChild(createToolInfoGuiContainer());
    if (Settings.showXpInfo) window.addChild(createXPInfoGuiContainer());
    window.draw();
    window.clearChildren();
}
