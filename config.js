import { @Vigilant, @TextProperty, @SwitchProperty, @ButtonProperty, 
    @NumberProperty, @SelectorProperty, @SliderProperty, @ColorProperty, Color, @ParagraphProperty } from '../Vigilance';
import gui from './utils/constants';

const Color = Java.type("java.awt.Color");

@Vigilant("HoeUtilitiesV2")
class Settings {

    // enable move gui mode
    @ButtonProperty({
        name: 'Move GUI',
        description: 'Move the GUI around',
        category: 'General',
        subcategory: 'GUI',
        placeholder: 'Click!',
    })
    moveToolInfo() {
        gui.open();
    }

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------

    // next Jacob Event
    @SwitchProperty({
        name: "Toggle next Jacobs Event",
        description: "Toggle the next Jacob Event",
        category: "General",
        subcategory: "Jacob's Event",
    })
    showJacobTimer = true;

    @NumberProperty({
        name: "JacobX",
        category: "General",
        subcategory: "Jacob's Event",
        hidden: true
    })
    jacob_x = 25;

    @NumberProperty({
        name: "JacobY",
        category: "General",
        subcategory: "Jacob's Event",
        hidden: true
    })
    jacob_y = 0;

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------

    // Toggle Tool Lines

    @SwitchProperty({
        name: "Toggle Counter Display",
        description: "Enable/Disable Counter Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showCounter = true;

    @SwitchProperty({
        name: "Toggle Cultivating Display",
        description: "Enable/Disable Cultivating Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showCultivating = true;

    @SwitchProperty({
        name: "Toggle Farming Fortune Display",
        description: "Enable/Disable Farming Fortune Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showFarmingFortune = true;

    @SwitchProperty({
        name: "Toggle Blocks/s Display",
        description: "Enable/Disable Blocks/s Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showBlocksS = true;  

    @SwitchProperty({
        name: "Toggle Yield Efficiency Display",
        description: "Enable/Disable Yield Efficiency Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showYieldEfficiency = true;  

    @SwitchProperty({
        name: "Toggle Max Yield Display",
        description: "Enable/Disable Max Yield Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showMaxYield = true;  

    @SwitchProperty({
        name: "Toggle Expected Profit Display",
        description: "Enable/Disable Expected Profit Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showExpectedProfit = true;  

    @SwitchProperty({
        name: "Toggle Collection Display",
        description: "Enable/Disable Collection Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showCollection = true;  

    @SwitchProperty({
        name: "Toggle Yaw Display",
        description: "Enable/Disable Yaw Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showYaw = true;  

    @SwitchProperty({
        name: "Toggle Pitch Display",
        description: "Enable/Disable Pitch Display Line",
        category: "Features",
        subcategory: "Toggle Tool Features",
    })
    showPitch = true;  

    // Toggle XP Lines

    @SwitchProperty({
        name: "Toggle Current Level Display",
        description: "Enable/Disable Current Level Display Line",
        category: "Features",
        subcategory: "Toggle XP Features",
    })
    showCurrentLevel = true;  

    @SwitchProperty({
        name: "Toggle Current XP Display",
        description: "Enable/Disable Current XP Display Line",
        category: "Features",
        subcategory: "Toggle XP Features",
    })
    showCurrentXP = true;  

    @SwitchProperty({
        name: "Toggle XP Until next Level Display",
        description: "Enable/Disable XP Until next Level Display Line",
        category: "Features",
        subcategory: "Toggle XP Features",
    })
    showXPUntilNextLevel = true;  

    @SwitchProperty({
        name: "Toggle Time Until Next Level Display",
        description: "Enable/Disable Time Until Next Level Display Line",
        category: "Features",
        subcategory: "Toggle XP Features",
    })
    showTimeUntilNextLevel = true;  

    @SwitchProperty({
        name: "Toggle XP Per Hour Display",
        description: "Enable/Disable XP Per Hour Display Line",
        category: "Features",
        subcategory: "Toggle XP Features",
    })
    showXPPerHour = true;  

    @SwitchProperty({
        name: "Toggle Max XP Per Hour Display",
        description: "Enable/Disable Max XP Per Hour Display Line",
        category: "Features",
        subcategory: "Toggle XP Features",
    })
    showMaxXPPerHour = true;  

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------

    // Tool Info Gui location
    @SwitchProperty({
        name: "Toggle Tool Info",
        description: "Enable/Disable Tool info GUI",
        category: "Tools",
        subcategory: "GUI",
    })
    showToolInfo = true;

    @SelectorProperty({
        name: "Raw Pitch/Yaw Data",
        description: "Uses raw or angle data",
        category: "Tools",
        subcategory: "GUI",
        options: ['raw', 'angle']
    })
    rotationOutput = 0;

    @SelectorProperty({
        name: "Live Tracker Measurement Unit",
        description: "change the unit of the Live tracker",
        category: "Tools",
        subcategory: "Live Tracker",
        options: ['/h', '/event', '/min', '/s', '/harvest']
    })
    liveTrackerUnit = 0;

    @SliderProperty({
        name: "Live Tracker Buffer Size",
        description: "Over how many values the Live Yield is averaged over",
        category: "Tools",
        subcategory: "Live Tracker",
        min: 1,
        max: 300
    })
    liveTrackerBuffer = 60;

    @SelectorProperty({
        name: "Max Yield Measurement Unit",
        description: "Change the Unit of Measurement for Max Yield",
        category: "Tools",
        subcategory: "Functions",
        options: ['/h', '/event', '/min', '/s', '/harvest']
    })
    maxYieldUnit = 0;

    @ColorProperty({
        name: 'Tool Info Background Color',
        description: 'Pick a color for Tool Info',
        category: 'Tools',
        subcategory: 'Customization',
    })
    toolInfoBackgroundColor = new Color(0,0,0,50/255);

    @SelectorProperty({
        name: "Text Alignment",
        description: "Change the alignment of the text inside the bounding box",
        category: "Tools",
        subcategory: "Customization",
        options: ['left', 'center', 'right']
    })
    toolInfoAlignment = 0;

    @SliderProperty({
        name: "Scale",
        description: "set the scale of the gui",
        category: "Tools",
        subcategory: "Customization",
        min: 100,
        max: 300
    })
    toolInfoScale = 100;

    @NumberProperty({
        name: "ToolInfoX",
        category: "Tools",
        subcategory: 'GUI',
        hidden: true
    })
    tool_gui_x = 25;

    @NumberProperty({
        name: "ToolInfoY",
        category: "Tools",
        subcategory: 'GUI',
        hidden: true
    })
    tool_gui_y = 25;

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    // Tool Info Gui location
    @SwitchProperty({
        name: "Toggle XP Info",
        description: "Enable/Disable XP info GUI",
        category: "XP",
        subcategory: "GUI",
    })
    showXpInfo = true;

    @ColorProperty({
        name: 'Xp Info Background Color',
        description: 'Pick a color for Xp Info',
        category: 'XP',
        subcategory: 'Customization',
    })
    xpInfoBackgroundColor = new Color(0,0,0,50/255);

    @SelectorProperty({
        name: "Text Alignment",
        description: "Change the alignment of the text inside the bounding box",
        category: "XP",
        subcategory: "Customization",
        options: ['left', 'center', 'right']
    })
    xpInfoAlignment = 0;

    @SliderProperty({
        name: "Scale",
        description: "set the scale of the gui",
        category: "XP",
        subcategory: "Customization",
        min: 100,
        max: 300
    })
    xpInfoScale = 100;

    @NumberProperty({
        name: "XPInfoX",
        category: "XP",
        subcategory: 'GUI',
        hidden: true
    })
    xp_gui_x = 25;

    @NumberProperty({
        name: "XPInfoY",
        category: "XP",
        subcategory: 'GUI',
        hidden: true
    })
    xp_gui_y = 125;

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    // Color customization Primary Color for every crop

    @SelectorProperty({
        name: 'Wheat',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryWheatColor = 6;

    @SelectorProperty({
        name: 'Cane',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryCaneColor = 2;

    @SelectorProperty({
        name: 'Potato',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryPotatoColor = 1;

    @SelectorProperty({
        name: 'Carrot',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryCarrotColor = 15;

    @SelectorProperty({
        name: 'Nether Warts',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryWartColor = 12;

    @SelectorProperty({
        name: 'Pumpkin',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryPumpkinColor = 6;

    @SelectorProperty({
        name: 'Melon',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryMelonColor = 2;

    @SelectorProperty({
        name: 'Cocoa',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryCocoaColor = 11;

    @SelectorProperty({
        name: 'Mushroom',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryMushroomColor = 4;

    @SelectorProperty({
        name: 'Cactus',
        description: 'Pick a color for the primary text',
        category: 'Primary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    primaryCactusColor = 7;

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    // Color customization Secondary Color for every crop

    @SelectorProperty({
        name: 'Wheat',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryWheatColor = 7;

    @SelectorProperty({
        name: 'Cane',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryCaneColor = 7;

    @SelectorProperty({
        name: 'Potato',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryPotatoColor = 7;

    @SelectorProperty({
        name: 'Carrot',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryCarrotColor = 7;

    @SelectorProperty({
        name: 'Nether Warts',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryWartColor = 7;

    @SelectorProperty({
        name: 'Pumpkin',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryPumpkinColor = 7;

    @SelectorProperty({
        name: 'Melon',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryMelonColor = 7;

    @SelectorProperty({
        name: 'Cocoa',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryCocoaColor = 7;

    @SelectorProperty({
        name: 'Mushroom',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryMushroomColor = 7;

    @SelectorProperty({
        name: 'Cactus',
        description: 'Pick a color for the secondary text',
        category: 'Secondary Text Color',
        options: ['Black', 'Dark Blue', 'Dark Green', 'Dark Aqua', 'Dark Red', 'Dark Purple', 'Gold', 'Gray', 'Dark Gray', 'Blue', 'Green', 'Aqua', 'Red', 'Light Purple', 'Yellow', 'White']
    })
    secondaryCactusColor = 7;

    // Elementa options
    // gui text over gauges
    @SwitchProperty({
        name: "Show Legacy GUI",
        description: "Enables/Disables the Legacy GUI",
        category: "General",
        subcategory: "GUI",
    })
    showLegacyGUI = false;

    // Secret properties
    @TextProperty({
        name: "ApiKey",
        category: "General",
        hidden: true
    })
    apiKey = "";

    @SwitchProperty({
        name: "FirstRun",
        category: "General",
        hidden: true
    })
    firstRun = false;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "Settings", "Made by Dawjaw")
        this.setSubcategoryDescription("General", "GUI", "")
        this.setCategoryDescription("Tools", "Settings")
        this.setSubcategoryDescription("Tools", "GUI", "")
        this.setSubcategoryDescription("Tools", "Customization", "")

    }

}

export default new Settings;