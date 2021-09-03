import { @Vigilant, @TextProperty, @SwitchProperty, @ButtonProperty, 
    @NumberProperty, @SelectorProperty, @SliderProperty, @ColorProperty, Color, @ParagraphProperty } from '../Vigilance';
import gui from './utils/constants';

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
    toolInfoBackgroundColor = Color.WHITE;

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
    tool_gui_x = 50;

    @NumberProperty({
        name: "ToolInfoY",
        category: "Tools",
        subcategory: 'GUI',
        hidden: true
    })
    tool_gui_y = 50;

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
    xpInfoBackgroundColor = Color.WHITE;

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
    xp_gui_x = 100;

    @NumberProperty({
        name: "XPInfoY",
        category: "XP",
        subcategory: 'GUI',
        hidden: true
    })
    xp_gui_y = 100;

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