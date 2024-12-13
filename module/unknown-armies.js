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
        if (typeof arg1 === "string" || arg1 instanceof Array) {
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
        let features = Object.values(identity.system.features);                             //TODO
        switch (identity.system.type) {                                                     //TODO
            case "Adept":                                                                   //TODO
                break;                                                                      //TODO
            case "Avatar":                                                                  //TODO
                let percentage = identity.system.percentage;                                //TODO
                if (percentage >= 1 && identity.system.avatar.channels["1-50"] !== "") {    //TODO
                    features.push("Channel1-50%");                                          //TODO
                }                                                                           //TODO
                if (percentage >= 51 && identity.system.avatar.channels["51-70"] !== "") {  //TODO
                    features.push("Channel51-70%");                                         //TODO
                }                                                                           //TODO
                if (percentage >= 71 && identity.system.avatar.channels["71-90"] !== "") {  //TODO
                    features.push("Channel71-90%");                                         //TODO
                }                                                                           //TODO
                if (percentage >= 91 && identity.system.avatar.channels["91-98"] !== "") {  //TODO
                    features.push("Channel91-98%");                                         //TODO
                }                                                                           //TODO
                if (percentage >= 99 && identity.system.avatar.channels["99-"] !== "") {    //TODO
                    features.push("Channel99%");                                            //TODO
                }                                                                           //TODO
                break;                                                                      //TODO
            case "Mundane":                                                                 //TODO
                let substitutesFor = identity.system.mundane.substitutesFor;                //TODO
                if (substitutesFor !== "") {                                                //TODO
                    features.push("Substitutes for " + substitutesFor);                     //TODO
                }                                                                           //TODO
                break;                                                                      //TODO
            case "Supernatural":                                                            //TODO
                let supernaturalAbility = identity.system.supernatural.ability;             //TODO
                if (supernaturalAbility !== "") {                                           //TODO
                    features.push(supernaturalAbility);                                     //TODO
                }                                                                           //TODO
        }                                                                                   //TODO
        return features.sort();                                                             //TODO
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
    if (sidebarTab.tabName === "chat") {                                        //TODO
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