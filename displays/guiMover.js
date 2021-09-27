import Settings from "../config";
import gui, {elementaStuff, mouseInformation} from "../utils/constants";
import {updateSetting} from "../utils/utils";

export function initiateGuiMover(toolInfo, xpInfo) {
    //selection
    let isObjectSelected = false;
    let xpIsSelected = false;

    function clickFunc(mouseX, mouseY) {
        if (
            mouseX > toolInfo.getRenderX() - 2 && mouseX < toolInfo.getRenderX() + toolInfo.getWidth() + 2 &&
            mouseY > toolInfo.getRenderY() - 1 && mouseY < toolInfo.getRenderY() + (toolInfo.getHeight() * 9 + toolInfo.getHeight() * 2)
        ) {
            isObjectSelected = true;
            toolInfo.setBackgroundColor(Renderer.color(255, 255, 255, 50));
        }
        if (
            mouseX > xpInfo.getRenderX() - 2 && mouseX < xpInfo.getRenderX() + xpInfo.getWidth() + 2 &&
            mouseY > xpInfo.getRenderY() - 1 && mouseY < xpInfo.getRenderY() + (xpInfo.getHeight() * 9 + xpInfo.getHeight() * 2)
        ) {
            xpIsSelected = true;
            xpInfo.setBackgroundColor(Renderer.color(255, 255, 255, 50));
        }
    }

    toolInfo.setRenderLoc(Settings.tool_gui_x, Settings.tool_gui_y);
    xpInfo.setRenderLoc(Settings.xp_gui_x, Settings.xp_gui_y);

    function dragFunc(dx, dy) {
        if (isObjectSelected || mouseInformation.toolInfo) {
            Settings.tool_gui_x += dx;
            Settings.tool_gui_y += dy;
            toolInfo.setRenderLoc(Settings.tool_gui_x, Settings.tool_gui_y);
        }
        if (xpIsSelected || mouseInformation.xpInfo) {
            Settings.xp_gui_x += dx;
            Settings.xp_gui_y += dy;
            xpInfo.setRenderLoc(Settings.xp_gui_x, Settings.xp_gui_y);
        }
        if (mouseInformation.jacob) {
            Settings.jacob_x += dx;
            Settings.jacob_y += dy;
        }
    }

    function releaseFunc() {
        //update data
        updateSetting("toolinfox", Settings.tool_gui_x)
        updateSetting("toolinfoy", Settings.tool_gui_y)

        updateSetting("xpinfox", Settings.xp_gui_x)
        updateSetting("xpinfoy", Settings.xp_gui_y)

        updateSetting("jacobx", Settings.jacob_x)
        updateSetting("jacoby", Settings.jacob_y)

        //reset
        isObjectSelected = false;
        xpIsSelected = false;
        mouseInformation.xpInfo = false;
        mouseInformation.toolInfo = false;
        mouseInformation.jacob = false;

        elementaStuff.isGuiMovable = false;

        toolInfo.setBackgroundColor(Renderer.color(0, 0, 0, 0));
        xpInfo.setBackgroundColor(Renderer.color(0, 0, 0, 0));
    }

    register("dragged", dragFunc);
    gui.registerClicked(clickFunc);
    gui.registerMouseReleased(releaseFunc);
}

export function guiMover() {
    if (gui.isOpen()) {
        Renderer.drawRect(
            Renderer.color(0, 0, 0, 70),
            0,
            0,
            Renderer.screen.getWidth(),
            Renderer.screen.getHeight()
        );
    }
}