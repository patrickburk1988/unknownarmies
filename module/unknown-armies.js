import { migrate }          from "./util/migrate.js";
import { UAActor }          from "./actor.js";
import { UAArtifactData }   from "./data/item/artifact-data.js";
import { UAArtifactSheet }  from "./sheet/item/artifact-sheet.js";
import { UACabalData }      from "./data/actor/cabal-data.js";
import { UACabalSheet }     from "./sheet/actor/cabal-sheet.js";
import { UACharacterData }  from "./data/actor/character-data.js";
import { UACharacterSheet } from "./sheet/actor/character-sheet.js";
import { UAIdentityData }   from "./data/item/identity-data.js";
import { UAIdentitySheet }  from "./sheet/item/identity-sheet.js";
import { UAItem }           from "./item.js";
import { UAItemData }       from "./data/item/item-data.js";
import { UAItemSheet }      from "./sheet/item/item-sheet.js";
import { UAMilestoneData }  from "./data/item/milestone-data.js";
import { UAMilestoneSheet } from "./sheet/item/milestone-sheet.js";
import { UARitualData }     from "./data/item/ritual-data.js";
import { UARitualSheet }    from "./sheet/item/ritual-sheet.js";
import { UASpellData }      from "./data/item/spell-data.js";
import { UASpellSheet }     from "./sheet/item/spell-sheet.js";
import { UAUtils }          from "./utils.js";

const hiddenTypes = new Set([
    "identity",
    "milestone"
]);

Hooks.once("init", function() {
    console.log("Unknown Armies | Rebooting the universe.");
    registerSettings();
    registerDataModels();
    registerSheets();
    registerHandlebarsHelpers();
});

Hooks.once("ready", async function() {
    const lang = game.i18n.lang;
    const themeSetting = game.settings.get("unknownarmies", "Sheet&UITheme");
    const theme = [null, "blue", "green", "grey", "purple", "red"][themeSetting];
    if (!theme) {
        throw new Error(`Unknown Armies | Invalid "Sheet & UI Theme" setting value: ${themeSetting}`);
    }
    document.body.classList.add(
        ...("language" + (lang === "en" ? "" : " language--" + lang)).split(" "),
        "theme",
        "theme--" + theme
    );
    const chatControlIcon = document.querySelector(".chat-control-icon i");
    if (chatControlIcon) {
        chatControlIcon.classList.replace("fa-dice-d20", "fa-dice-d10");
        chatControlIcon.addEventListener("click", async ()=> {
            const formula = "1d100";
            const roll = await new Roll(formula).evaluate();
            const result = parseInt(roll.result);
            const content = `
                <div class="dice-roll">
                    <div class="dice-result">
                        <h4 class="dice-total">${result}</h4>
                        <div class="dice-tooltip">
                            <section class="tooltip-part">
                                <div class="dice">
                                    <header class="part-header flexrow">
                                        <span class="part-formula">${formula}</span>
                                        <span class="part-total">${result}</span>
                                    </header>
                                    <ol class="dice-rolls">
                                        <li class="roll die d10">${result}</li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>`;
            roll.toMessage({
                content: content,
                flavor: formula
            });
        });
    }
    await migrate();
});

Hooks.on("renderDialog", function (dialog, html, data) {
    Array.from(html.find("#document-create option")).forEach(i => {
        if (hiddenTypes.has(i.value)) {
            i.remove();
        }
    });
});

Hooks.on("renderDialogV2", function (dialog, html, data) {
    Array.from($(html).find("select[name='type'] option")).forEach(i => {
        if (hiddenTypes.has(i.value)) {
            i.remove();
        }
    });
});

Hooks.on("renderActorSheet", function (sheet, html, data) {
    html[0].querySelectorAll(".items__row--header").forEach(el => {
        el.style.margin = `0 ${UAUtils.scrollbarWidth}px`;
    });
});

function registerDataModels() {
    CONFIG.Actor.dataModels = {
        character: UACharacterData,
        cabal: UACabalData
    };
    CONFIG.Item.dataModels = {
        artifact: UAArtifactData,
        identity: UAIdentityData,
        item: UAItemData,
        milestone: UAMilestoneData,
        ritual: UARitualData,
        spell: UASpellData
    };
}

function registerHandlebarsHelpers() {
    // Simple ---------------------------------------------
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
    Handlebars.registerHelper("for", function (n, block) {
        let result = "";
        for (let i = 1; i <= n; i++) {
            result += block.fn(i);
        }
        return result;
    });
    Handlebars.registerHelper("includes", function (arg1, arg2) {
        if (typeof arg1 == "string" || arg1 instanceof Array) { //FIX
            return arg1.includes(arg2);
        }
    });
    Handlebars.registerHelper("isGM", function() {
        return game.user.isGM;
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
        // return string.replace(/pattern/g, replacement);
        //MAYBE
        return string.replaceAll(pattern, replacement);
    });
    Handlebars.registerHelper("setting", function (key) {
        return game.settings.get("unknownarmies", key);
    });
    Handlebars.registerHelper("shockGaugeSchema", function (meter, key) {
        return UACharacterData.shockGaugeSchema[meter][key];
    });
    Handlebars.registerHelper("sortFeatures", function (identity) {
        let features = [];
        const type = identity.system.type;
        switch (type) {
            case "":
                break;
            case "Adept":
                break;
            case "Avatar":
                const channels = identity.system.avatar.channels;
                const percentage = identity.system.percentage;
                if (percentage >= 1 && channels.first !== "") {
                    features.push("Channel 1-50%");
                }
                if (percentage >= 51 && channels.second !== "") {
                    features.push("Channel 51-70%");
                }
                if (percentage >= 71 && channels.third !== "") {
                    features.push("Channel 71-90%");
                }
                if (percentage >= 91 && channels.fourth !== "") {
                    features.push("Channel 91-98%");
                }
                if (percentage >= 99 && channels.godwalker !== "") {
                    features.push("Channel 99%");
                }
                break;
            case "Mundane":
                const substitutesFor = identity.system.mundane?.substitutesFor;
                if (substitutesFor) {
                    features.push("Substitutes for " + substitutesFor);
                }
                break;
            case "Supernatural":
                const ability = identity.system.supernatural?.ability;
                if (ability) {
                    features.push(ability);
                }
                break;
            default:
                throw new Error(`Unknown Armies | Invalid identity type: ${identity}`); //TODO
        }
        features = [...features, ...Object.values(identity.system.features).sort()];
        if (type === "Mundane") {
            features.sort();
        }
        return features;
    });
    // Handlebars.registerHelper("stripHTML", function (html) {
    //     console.log(html);
    //     if (!html) {
    //         console.log("AHH");
    //         return "";
    //     }
    //     // return new Handlebars.SafeString(String(html));
    //     const nodes = $.parseHTML(String(html), document, false);
    //     const text = $("<div>").append(nodes).text();
    //     return text.replace(/\s+/g, " ").replace(/([.!?])(?=\S)/g, "$1 ").trim();
    //     // console.log(html);
    //     // console.log(jQuery(html));
    //     // console.log(jQuery.parseHTML(html));
    //     // return jQuery.parseHTML(jQuery(html));
    //     // return jQuery(html);
    //     // return jQuery(html).text().replaceAll(/([.!?])([^.!?])/g, "$1 $2");
    //     // return jQuery(html).text().replaceAll(/([.!?])([^.!?])/g, "$1 $2"); //FIX
    // });
    Handlebars.registerHelper("stripHTML", function (html) {
        // HACK Re-examine below.
        if (!html) return "";
        const spaced = String(html).replace(/<\/?(p|div|h[1-6]|li|br|tr|td|th|blockquote)[^>]*>/gi, " ");
        const nodes = $.parseHTML(spaced, document, false);
        const text = $("<div>").append(nodes).text();
        return text.replace(/\s+/g, " ").trim();
        // console.log(html);
        // if (!html) {
        //     return "";
        // }
        // // return new Handlebars.SafeString(String(html));
        // const nodes = $.parseHTML(String(html), document, false);
        // const text = $("<div>").append(nodes).text();
        // return text.replace(/\s+/g, " ").replace(/([.!?])(?=\S)/g, "$1 ").trim();
    });
}

function registerSettings() {
    // game.settings.register("unknownarmies", "", {
    //     choices: {},
    //     config: true,
    //     default: false,
    //     hint: "UA._Hint",
    //     name: "UA.",
    //     onChange: () => {},
    //     range: {},
    //     // requiresReload: true,
    //     scope: "world",
    //     type: Number|String|Boolean|Object|DataModel|DataField
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
        requiresReload: true, //MAYBE
        scope: "world", //MAYBE
        type: Number
    });
    game.settings.register("unknownarmies", "IdentitiesAllowMM&YFeatures", {
        config: true,
        default: false, //MAYBE
        hint: "UA.IdentitiesAllowMM&YFeatures_Hint",
        name: "UA.IdentitiesAllowMM&YFeatures",
        requiresReload: true, //MAYBE
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
        requiresReload: true, //MAYBE
        scope: "client", //MAYBE
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
        requiresReload: true, //MAYBE
        scope: "client", //MAYBE
        type: Number
    });
    game.settings.register("unknownarmies", "SystemVersion", {
        config: false,
        default: "0", //MAYBE
        scope: "world",
        type: String // MAYBE
    });
}

function registerSheets() {
    CONFIG.Actor.documentClass = UAActor;
    CONFIG.Item.documentClass = UAItem;
    foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
    foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
    foundry.documents.collections.Items.registerSheet("unknownarmies", UAArtifactSheet, {
        label: "UA.ArtifactSheet",
        makeDefault: true,
        types: [
            "artifact"
        ]
    });
    foundry.documents.collections.Actors.registerSheet("unknownarmies", UACabalSheet, {
        label: "UA.CabalSheet",
        makeDefault: true,
        types: [
            "cabal"
        ]
    });
    foundry.documents.collections.Actors.registerSheet("unknownarmies", UACharacterSheet, {
        label: "UA.CharacterSheet",
        makeDefault: true,
        types: [
            "character"
        ]
    });
    foundry.documents.collections.Items.registerSheet("unknownarmies", UAIdentitySheet, {
        label: "UA.IdentitySheet",
        makeDefault: true,
        types: [
            "identity"
        ]
    });
    foundry.documents.collections.Items.registerSheet("unknownarmies", UAItemSheet, {
        label: "UA.ItemSheet",
        makeDefault: true,
        types: [
            "item"
        ]
    });
    foundry.documents.collections.Items.registerSheet("unknownarmies", UAMilestoneSheet, {
        label: "UA.MilestoneSheet",
        makeDefault: true,
        types: [
            "milestone"
        ]
    });
    foundry.documents.collections.Items.registerSheet("unknownarmies", UARitualSheet, {
        label: "UA.RitualSheet",
        makeDefault: true,
        types: [
            "ritual"
        ]
    });
    foundry.documents.collections.Items.registerSheet("unknownarmies", UASpellSheet, {
        label: "UA.SpellSheet",
        makeDefault: true,
        types: [
            "spell"
        ]
    });
}