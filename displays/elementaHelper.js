import {
    Window, UIText, UIContainer, UIRoundedRectangle, UIImage,
    ChildBasedMaxSizeConstraint, CenterConstraint,
    SiblingConstraint, ChildBasedSizeConstraint,
    ConstantColorConstraint, AdditiveConstraint,
    ScaledTextConstraint, StencilEffect, ScissorEffect, UIBlock, RelativeConstraint, AspectConstraint, TextAspectConstraint, FillConstraint, CramSiblingConstraint, SubtractiveConstraint, MaxConstraint
} from "Elementa/index";
import {
    addCommas,
    buildDisplayLine,
    calcRotation,
    getColor,
    getJavaColor,
    getCultivatingCount,
    getMaxEfficiencyYield,
    getScale,
    calcRotation,
    updateSetting
} from "../utils/utils";
import gui, {playerInformation, globalStats, elementaStuff, hoeStats, collection, elementaStuff, mouseInformation, cropToImage} from "../utils/constants";
import Settings from "../config";

const Color = Java.type("java.awt.Color");
const File = Java.type("java.io.File");

function turnToNumber(value) {
    if (value) {
        return value.toString().split(",").join("").split("/")[0];
    } else {
        return 0;
    }
}

export function createJacobTimerGui() {
    let uiText = "";
    let color = "";
    let spacing = 60;
    if (!globalStats.timeUntilJacobs) {
        uiText = "No Events Found";
        color = "§c";
        spacing = 5;
    } else {
        uiText = `${globalStats.timeUntilJacobs}`;
    }
    const textElement = new UIText(`${color}${uiText}`)
        .setX((Settings.jacob_x + spacing).pixels())
        .setY((Settings.jacob_y + 6).pixels());

    return textElement;
}

export function createJacobTimerGuiContainer() {
    if (!Settings.showJacobTimer || !globalStats.nextJacobCrops) {
        const tmpW = new UIRoundedRectangle(3.0)
            .setX((Settings.jacob_x).pixels())
            .setY((Settings.jacob_y).pixels())
            .setWidth((100).pixels())
            .setHeight((20).pixels())
            .setColor(new ConstantColorConstraint(getJavaColor(new Color(Settings.xpInfoBackgroundColor.getRed()/255, Settings.xpInfoBackgroundColor.getGreen()/255, Settings.xpInfoBackgroundColor.getBlue()/255, Settings.xpInfoBackgroundColor.getAlpha()/255))));
        return tmpW;
    }

    const file = new File(`config/ChatTriggers/images/${cropToImage[globalStats.nextJacobCrops[0]]}.png`);
    const file2 = new File(`config/ChatTriggers/images/${cropToImage[globalStats.nextJacobCrops[1]]}.png`);
    const file3 = new File(`config/ChatTriggers/images/${cropToImage[globalStats.nextJacobCrops[2]]}.png`);

    const image1 = UIImage.Companion.ofFile(file)
        .setX((0).pixels())
        .setY((2.5).pixels())
        .setWidth((15).pixels())
        .setHeight((15).pixels());

    const image2 = UIImage.Companion.ofFile(file2)
        .setX((15).pixels())
        .setY((2.5).pixels())
        .setWidth((15).pixels())
        .setHeight((15).pixels());
    
    const image3 = UIImage.Companion.ofFile(file3)
        .setX((30).pixels())
        .setY((2.5).pixels())
        .setWidth((15).pixels())
        .setHeight((15).pixels());

    const mainUIContainer = new UIRoundedRectangle(3)
        .setX((Settings.jacob_x).pixels())
        .setY((Settings.jacob_y).pixels())
        .setWidth((100).pixels())
        .setHeight((20).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(Settings.xpInfoBackgroundColor.getRed()/255, Settings.xpInfoBackgroundColor.getGreen()/255, Settings.xpInfoBackgroundColor.getBlue()/255, Settings.xpInfoBackgroundColor.getAlpha()/255))));

    mainUIContainer.addChildren(image1);
    mainUIContainer.addChildren(image2);
    mainUIContainer.addChildren(image3);

    const Mouse = Java.type("org.lwjgl.input.Mouse");
    Mouse.getNativeCursor();
    Mouse.poll();

    if(gui.isOpen() && Mouse.isButtonDown(0)){
        mainUIContainer.setColor(new ConstantColorConstraint(getJavaColor(new Color(1, 1, 1, 0.2))));
    }

    mainUIContainer.onMouseEnter((event) => {
        if(gui.isOpen()){
            const Mouse = Java.type("org.lwjgl.input.Mouse");
            Mouse.getNativeCursor();
            Mouse.poll();

            if(Mouse.isButtonDown(0) && !mouseInformation.toolInfo && !mouseInformation.xpInfo) {
                mouseInformation.jacob = true;
            } else {
                mouseInformation.jacob = false;
            }
        } 
    });

    return mainUIContainer;
}

export function createXPInfoGuiContainer() {
    if (!Settings.showXpInfo || !playerInformation.toolIsEquipped) {
        return;
    }
    const Field1 = createNewTextElement("Current Level", (globalStats.currentLevel) ? addCommas(Math.round(globalStats.currentLevel)) : "Start farming!");
    let Field2 = createNewTextElement("Current XP", (globalStats.currentLevelXP) ? addCommas(Math.round(globalStats.currentLevelXP)) : "Start farming!");
    if(Number.isNaN(globalStats.currentLevelXP)) {
        Field2 = createNewTextElement("Current XP", (globalStats.currentXP) ? globalStats.currentXP : "Start farming!");
    }
    const Field3 = createNewTextElement("XP Until next Level", (globalStats.xpUntilNextLevel) ? addCommas(Math.round(globalStats.xpUntilNextLevel)) : "Start farming!");
    const Field4 = createNewTextElement("Time until next Level", (!globalStats.timeLeftUntilNextLevel.includes("NaN")) ? globalStats.timeLeftUntilNextLevel : "Start farming!");
    const Field5 = createNewTextElement("XP Per Hour", (globalStats.xpPerHour) ? addCommas(globalStats.xpPerHour) : "Start farming!");
    const Field6 = createNewTextElement("Max XP Per Hour", (globalStats.xpPerHourExpected) ? addCommas(Math.round(globalStats.xpPerHourExpected)) : "Start farming!");

    const mainUIContainer = new UIRoundedRectangle(5)
        .setX((Settings.xp_gui_x).pixels())
        .setY((Settings.xp_gui_y).pixels())
        .setWidth(new ChildBasedMaxSizeConstraint())
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint(), (7).pixels()))
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(Settings.xpInfoBackgroundColor.getRed()/255, Settings.xpInfoBackgroundColor.getGreen()/255, Settings.xpInfoBackgroundColor.getBlue()/255, Settings.xpInfoBackgroundColor.getAlpha()/255))));

    if(Settings.showCurrentLevel) mainUIContainer.addChild(Field1);
    if(Settings.showCurrentXP) mainUIContainer.addChild(Field2);
    if(globalStats.currentLevel !== 60 && Settings.showXPUntilNextLevel) mainUIContainer.addChild(Field3);
    if(globalStats.currentLevel !== 60 && Settings.showTimeUntilNextLevel) mainUIContainer.addChild(Field4);
    if(Settings.showXPPerHour) mainUIContainer.addChild(Field5);
    if(Settings.showMaxXPPerHour) mainUIContainer.addChild(Field6);

    if(gui.isOpen()){
        mainUIContainer.setColor(new ConstantColorConstraint(getJavaColor(new Color(1, 1, 1, 0.2))));
    }

    mainUIContainer.onMouseEnter((event) => {
        if(gui.isOpen()){
            const Mouse = Java.type("org.lwjgl.input.Mouse");
            Mouse.getNativeCursor();
            Mouse.poll();

            if(Mouse.isButtonDown(0) && !mouseInformation.toolInfo) {
                mouseInformation.xpInfo = true;
            } else {
                mouseInformation.xpInfo = false;
            }
        } 
    });

    return mainUIContainer;
}

export function createToolInfoGuiContainer() {
    if (!Settings.showToolInfo || !playerInformation.toolIsEquipped) {
        return;
    }
    const maxYield = getMaxEfficiencyYield(playerInformation.total, playerInformation.crop);
    const cultivating = getCultivatingCount();

    const Field1 = createNewTextElement("Counter", addCommas(hoeStats.counter));
    const Field2 = createNewTextElement("Cultivating", (cultivating !== 0) ? addCommas(cultivating) : " 0 ");
    const Field3 = createNewTextElement("Farming Fortune", playerInformation.total);
    const FieldBlockBreak = createNewTextElement("Blocks/s", (globalStats.blockPerSeconds.toFixed(3)));
    const Field4 = createNewGaugeElement("Yield Efficiency", (globalStats.yieldPerHour) ? globalStats.yieldPerHour : "0", maxYield);
    const Field5 = createNewTextElement("Max Yield", maxYield);
    const Field6 = createNewTextElement("Expected Profit", (globalStats.cropGain) ? (globalStats.cropGain+"/h") : "0/h");
    const Field7 = createNewTextElement("Collection", (collection) ? addCommas(Math.floor(collection[playerInformation.crop])) : "0");
    const Field8 = createNewTextElement("Yaw", calcRotation(`Yaw`));
    const Field9 = createNewTextElement("Pitch", calcRotation(`Pitch`));

    const mainUIContainer = new UIRoundedRectangle(5)
        .setX((Settings.tool_gui_x).pixels())
        .setY((Settings.tool_gui_y).pixels())
        .setWidth(new ChildBasedMaxSizeConstraint())
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint(), (7).pixels()))
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(Settings.toolInfoBackgroundColor.getRed()/255, Settings.toolInfoBackgroundColor.getGreen()/255, Settings.toolInfoBackgroundColor.getBlue()/255, Settings.toolInfoBackgroundColor.getAlpha()/255))));

    (hoeStats.counter && Settings.showCounter) ? mainUIContainer.addChild(Field1) : null;
    if(Settings.showCultivating) mainUIContainer.addChild(Field2);
    if(Settings.showFarmingFortune) mainUIContainer.addChild(Field3);
    if(Settings.showBlocksS) mainUIContainer.addChild(FieldBlockBreak);
    if(Settings.showYieldEfficiency) mainUIContainer.addChild(Field4);
    if(Settings.showMaxYield) mainUIContainer.addChild(Field5);
    if(Settings.showExpectedProfit) mainUIContainer.addChild(Field6);
    if(Settings.showCollection) mainUIContainer.addChild(Field7);
    if(Settings.showYaw) mainUIContainer.addChild(Field8);
    if(Settings.showPitch) mainUIContainer.addChild(Field9);

    if(gui.isOpen()){
        mainUIContainer.setColor(new ConstantColorConstraint(getJavaColor(new Color(1, 1, 1, 0.2))));
    }

    mainUIContainer.onMouseEnter((event) => {
        if(gui.isOpen()){
            const Mouse = Java.type("org.lwjgl.input.Mouse");
            Mouse.getNativeCursor();
            Mouse.poll();

            if(Mouse.isButtonDown(0) && !mouseInformation.xpInfo) {
                mouseInformation.toolInfo = true;
            } else {
                mouseInformation.toolInfo = false;
            }
        } 
    });

    return mainUIContainer;
}

function createNewTextElement(text, value) {
    const textElement = new UIText(text)
        .setX((0).pixels())
        .setY((5).pixels());

    const valueText = new UIText(value)
        .setX(new CenterConstraint())
        .setY(new CenterConstraint());

    const textContainer = new UIRoundedRectangle(3)
        .setX((95).pixels())
        .setY((5).pixels())
        .setWidth((100).pixels())
        .setHeight((10).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(0, 0, 0, 0))))
        .addChild(valueText);

    const boxContainer = new UIBlock()
        .setX((5).pixels())
        .setY(new SiblingConstraint())
        .setWidth((200).pixels())
        .setHeight((10).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(0, 0, 0, 0))))
        .addChild(textElement)
        .addChild(textContainer);

    return boxContainer;
}

function createNewGaugeElement(text, currentValue, maxValue) {
    const textElement = new UIText(text)
        .setX((0).pixels())
        .setY((5).pixels());

    const valueText = new UIText(currentValue)
        .setX(new CenterConstraint())
        .setY(new CenterConstraint());

    const textContainer = new UIRoundedRectangle(3)
        .setX((95).pixels())
        .setY((5).pixels())
        .setWidth((100).pixels())
        .setHeight((10).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(0, 0, 0, 0))))
        .addChild(valueText);

    const gaugeBackground = new UIRoundedRectangle(3)
        .setX((95).pixels())
        .setY((5).pixels())
        .setWidth((100).pixels())
        .setHeight((10).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(1, 0, 0, 0.8))))
    
    const gaugeBar = new UIRoundedRectangle(3)
        .setX((95).pixels())
        .setY((5).pixels())
        .setWidth((getScale(maxValue, currentValue)).pixels())
        .setHeight((10).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(0, 1, 0, 0.8))));

    let boxContainer = new UIBlock()
        .setX((5).pixels())
        .setY(new SiblingConstraint())
        .setWidth((200).pixels())
        .setHeight((10).pixels())
        .setColor(new ConstantColorConstraint(getJavaColor(new Color(0, 0, 0, 0))))
        .addChild(gaugeBackground)
        .addChild(gaugeBar)
        .addChild(textContainer)
        .addChild(textElement);

    gaugeBar.setWidth(((getScale(turnToNumber(maxValue), turnToNumber(currentValue)))).pixels());
    if (gaugeBar.getWidth() <= 4) {
        gaugeBar.setColor(new ConstantColorConstraint(getJavaColor(new Color(1, 0, 0, 0))));
    } else {
        if(gaugeBar.getWidth() >= 100) {
            gaugeBar.setWidth((100).pixels());
        }
        gaugeBar.setColor(new ConstantColorConstraint(getJavaColor(new Color(0, 1, 0, 0.8))));
    }
    
    return boxContainer;
}
