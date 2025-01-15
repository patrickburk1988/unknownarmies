import UAActor from "./actor/actor.js";
import UAArtifactSheet from "./item/artifact-sheet.js";
import UACabalSheet from "./actor/cabal-sheet.js";
import UACharacterSheet from "./actor/character-sheet.js";
import UAIdentitySheet from "./item/identity-sheet.js";
import UAItem from "./item/item.js";
import UAItemSheet from "./item/item-sheet.js";
import UAMilestoneSheet from "./item/milestone-sheet.js";
import UARitualSheet from "./item/ritual-sheet.js";
import UASpellSheet from "./item/spell-sheet.js";
import UAUtils from "./utils.js";

Hooks.once("init", function() {
    console.log("Rebooting the universe.");
    // Setting Registration ----------------------------------------------------
    // game.settings.register("unknownarmies", "", {
    //     choices: {},
    //     config: true,
    //     default: false,
    //     hint: "UA._Hint",
    //     name: "UA.",
    //     range: {},
    //     requiresReload: true,
    //     scope: "world",
    //     type: Boolean
    // });
    game.settings.register("unknownarmies", "Sheet&UITheme", {
        choices: {
            1: game.i18n.localize("UA.BonTonBlue"),
            2: game.i18n.localize("UA.GodwalkerGreen"),
            3: game.i18n.localize("UA.GridironGrey"),
            4: game.i18n.localize("UA.ParadoxPurple"),
            5: game.i18n.localize("UA.RenunciationRed")
        },
        config: true,
        default: 1,
        hint: "UA.Sheet&UITheme_Hint",
        name: "UA.Sheet&UITheme",
        requiresReload: true,
        scope: "world",
        type: Number
    });
    game.settings.register("unknownarmies", "IdentitiesAllowMM&YFeatures", {
        config: true,
        default: false,
        hint: "UA.IdentitiesAllowMM&YFeatures_Hint",
        name: "UA.IdentitiesAllowMM&YFeatures",
        requiresReload: true,
        scope: "world",
        type: Boolean
    });
    game.settings.register("unknownarmies", "IdentitiesButtonStyle", {
        choices: {
            1: game.i18n.localize("UA.IdentityName"),
            2: game.i18n.localize("UA.Die")
        },
        config: true,
        default: 1,
        hint: "UA.IdentitiesButtonStyle_Hint",
        name: "UA.IdentitiesButtonStyle",
        requiresReload: true,
        scope: "client",
        type: Number
    });
    game.settings.register("unknownarmies", "IdentitiesSelectFeatureWhenRolling", {
        choices: {
            1: game.i18n.localize("UA.Disabled"),
            2: game.i18n.localize("UA.Dialog"),
            3: game.i18n.localize("UA.Sheet")
        },
        config: true,
        default: 1,
        hint: "UA.IdentitiesSelectFeatureWhenRolling_Hint",
        name: "UA.IdentitiesSelectFeatureWhenRolling",
        requiresReload: true,
        scope: "client",
        type: Number
    });
    // Sheet Registration ------------------------------------------------------
    CONFIG.Actor.documentClass = UAActor;
    CONFIG.Item.documentClass = UAItem;
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
    Actors.registerSheet("unknownarmies", UACabalSheet, {
        label: "UA.CabalSheet",
        makeDefault: true,
        types: [
            "cabal"
        ]
    });
    Actors.registerSheet("unknownarmies", UACharacterSheet, {
        label: "UA.CharacterSheet",
        makeDefault: true,
        types: [
            "character"
        ]
    });
    Items.registerSheet("unknownarmies", UAArtifactSheet, {
        label: "UA.ArtifactSheet",
        makeDefault: true,
        types: [
            "artifact"
        ]
    });
    Items.registerSheet("unknownarmies", UAIdentitySheet, {
        label: "UA.IdentitySheet",
        makeDefault: true,
        types: [
            "identity"
        ]
    });
    Items.registerSheet("unknownarmies", UAItemSheet, {
        label: "UA.ItemSheet",
        makeDefault: true,
        types: [
            "item"
        ]
    });
    Items.registerSheet("unknownarmies", UAMilestoneSheet, {
        label: "UA.MilestoneSheet",
        makeDefault: true,
        types: [
            "milestone"
        ]
    });
    Items.registerSheet("unknownarmies", UARitualSheet, {
        label: "UA.RitualSheet",
        makeDefault: true,
        types: [
            "ritual"
        ]
    });
    Items.registerSheet("unknownarmies", UASpellSheet, {
        label: "UA.SpellSheet",
        makeDefault: true,
        types: [
            "spell"
        ]
    });
    // Handlebars Helpers (Simple) ---------------------------------------------
    Handlebars.registerHelper("and", function() {
        for (let i = 0; i < arguments.length - 1; i++) {
            if (!arguments[i]) {
                return false;
            }
        }
        return true;
    });
    Handlebars.registerHelper("capitalize", function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    });
    Handlebars.registerHelper("equals", function (arg1, arg2) {
        return arg1 == arg2;
    });
    Handlebars.registerHelper("exceeds", function (arg1, arg2) {
        return arg1 > arg2;
    });
    Handlebars.registerHelper("exceedsOrEquals", function (arg1, arg2) {
        return arg1 >= arg2;
    });
    Handlebars.registerHelper("includes", function (arg1, arg2) {
        if (typeof arg1 == "string" || arg1 instanceof Array) {
            return arg1.includes(arg2);
        }
    });
    Handlebars.registerHelper("isGM", function() {
        return game.user.isGM;
    });
    Handlebars.registerHelper("lang", function() {
        return game.i18n.lang;
    });
    Handlebars.registerHelper("not", function (arg) {
        return !arg;
    });
    Handlebars.registerHelper("or", function() {
        for (let i = 0; i < arguments.length - 1; i++) {
            if (arguments[i]) {
                return true;
            }
        }
        return false;
    });
    Handlebars.registerHelper("replace", function (string, pattern, replacement) {
        return string.replace(pattern, replacement);
    });
    Handlebars.registerHelper("replaceAll", function (string, pattern, replacement) {
        return string.replaceAll(pattern, replacement);
    });
    Handlebars.registerHelper("setting", function (key) {
        return game.settings.get("unknownarmies", key);
    });
    Handlebars.registerHelper("shockGaugeSchema", function (meter, key) {
        return UAActor.shockGaugeSchema[meter][key];
    });
    Handlebars.registerHelper("sortFeatures", function (identity) {
        const features = Object.values(identity.system.features);
        switch (identity.system.type) {
            case "Adept":
                break;
            case "Avatar":
                const percentage = identity.system.percentage;
                const channels = identity.system.avatar.channels;
                if (percentage >= 1 && channels["1-50"] != "") {
                    features.push("Channel 1-50%");
                }
                if (percentage >= 51 && channels["51-70"] != "") {
                    features.push("Channel 51-70%");
                }
                if (percentage >= 71 && channels["71-90"] != "") {
                    features.push("Channel 71-90%");
                }
                if (percentage >= 91 && channels["91-98"] != "") {
                    features.push("Channel 91-98%");
                }
                if (percentage >= 99 && channels["99-"] != "") {
                    features.push("Channel 99%");
                }
                break;
            case "Mundane":
                const substitutesFor = identity.system.mundane.substitutesFor;
                if (substitutesFor != "") {
                    features.push("Substitutes for " + substitutesFor);
                }
                break;
            case "Supernatural":
                const ability = identity.system.supernatural.ability;
                if (ability != "") {
                    features.push(ability);
                }
        }
        return features.sort();
    });
    Handlebars.registerHelper("stripHTML", function (html) {
        return jQuery(html).text().replaceAll(/([.!?])([^.!?])/g, "$1 $2");
    });
});

Hooks.once("ready", function() {
    $(document.body).addClass(UAUtils.theme);
});

Hooks.on("renderDialog", (dialog, html, data) => {
    const hiddenTypes = [
        "identity",
        "milestone"
    ];
    Array.from(html.find("#document-create option")).forEach(i => {
        if (hiddenTypes.includes(i.value)) {
            i.remove();
        }
    });
});

Hooks.on("renderSidebarTab", (sidebarTab, html, data) => {
    if (sidebarTab.tabName == "chat") {                                        //TODO
        html.find(".chat-control-icon i").removeClass("fa-dice-d20").addClass("fa-dice-d10");//TODO
        html.find(".chat-control-icon").on("click", async () => {               //TODO
            let roll = new Roll("1d100");                                       //TODO
            await roll.evaluate();                                              //TODO
            let rollResult = parseInt(roll.result);                             //TODO
            let content = "";                                                   //TODO
            content += `<div class="dice-roll">`;                               //TODO
            content += `    <div class="dice-result">`;                         //TODO
            content += `        <h4 class="dice-total">${rollResult}</h4>`;     //TODO
            content += `        <div class="dice-tooltip">`;                    //TODO
            content += `            <section class="tooltip-part">`;            //TODO
            content += `                <div class="dice">`;                    //TODO
            content += `                    <header class="part-header flexrow">`;//TODO
            content += `                        <span class="part-formula">1d100</span>`;//TODO
            content += `                        <span class="part-total">${rollResult}</span>`;                                                             //TODO
            content += `                    </header>`;                         //TODO
            content += `                    <ol class="dice-rolls">`;           //TODO
            content += `                        <li class="roll die d100">${rollResult}</li>`;//TODO
            content += `                    </ol>`;                             //TODO
            content += `                </div>`;                                //TODO
            content += `            </section>`;                                //TODO
            content += `        </div>`;                                        //TODO
            content += `    </div>`;                                            //TODO
            content += `</div>`;                                                //TODO
            roll.toMessage({                                                    //TODO
                content: content,                                               //TODO
                flavor: "1d100"                                                 //TODO
            });                                                                 //TODO
        });                                                                     //TODO
    }                                                                           //TODO
});