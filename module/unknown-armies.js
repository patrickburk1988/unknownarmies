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
    //     config: true,
    //     name: "UA.",
    //     hint: "UA._Hint",
    //     scope: "world",
    //     type: Boolean,
    //     choices: {},
    //     range: {},
    //     default: false,
    //     requiresReload: true
    // });
    game.settings.register("unknownarmies", "Sheet&UITheme", {
        config: true,
        name: "UA.Sheet&UITheme",
        hint: "UA.Sheet&UITheme_Hint",
        scope: "world",
        type: Number,
        choices: {
            1: game.i18n.localize("UA.BonTonBlue"),
            2: game.i18n.localize("UA.GodwalkerGreen"),
            3: game.i18n.localize("UA.GridironGrey"),
            4: game.i18n.localize("UA.ParadoxPurple"),
            5: game.i18n.localize("UA.RenunciationRed")
        },
        default: 1,
        requiresReload: true
    });
    game.settings.register("unknownarmies", "IdentitiesAllowMM&YFeatures", {
        config: true,
        name: "UA.IdentitiesAllowMM&YFeatures",
        hint: "UA.IdentitiesAllowMM&YFeatures_Hint",
        scope: "world",
        type: Boolean,
        default: false,
        requiresReload: true
    });
    game.settings.register("unknownarmies", "IdentitiesSelectFeatureWhenRolling", {
        config: true,
        name: "UA.IdentitiesSelectFeatureWhenRolling",
        hint: "UA.IdentitiesSelectFeatureWhenRolling_Hint",
        scope: "client",
        type: Number,
        choices: {
            1: game.i18n.localize("UA.Disabled"),
            2: game.i18n.localize("UA.Dialog"),
            3: game.i18n.localize("UA.Sheet")
        },
        default: 1,
        requiresReload: true
    });
    // Sheet Registration ------------------------------------------------------
    CONFIG.Actor.documentClass = UAActor;
    CONFIG.Item.documentClass = UAItem;
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
    Actors.registerSheet("unknownarmies", UACabalSheet, {
        label: "UA.CabalSheet",
        types: [
            "cabal"
        ],
        makeDefault: true
    });
    Actors.registerSheet("unknownarmies", UACharacterSheet, {
        label: "UA.CharacterSheet",
        types: [
            "character"
        ],
        makeDefault: true
    });
    Items.registerSheet("unknownarmies", UAArtifactSheet, {
        label: "UA.ArtifactSheet",
        types: [
            "artifact"
        ],
        makeDefault: true
    });
    Items.registerSheet("unknownarmies", UAIdentitySheet, {
        label: "UA.IdentitySheet",
        types: [
            "identity"
        ],
        makeDefault: true
    });
    Items.registerSheet("unknownarmies", UAItemSheet, {
        label: "UA.ItemSheet",
        types: [
            "item"
        ],
        makeDefault: true
    });
    Items.registerSheet("unknownarmies", UAMilestoneSheet, {
        label: "UA.MilestoneSheet",
        types: [
            "milestone"
        ],
        makeDefault: true
    });
    Items.registerSheet("unknownarmies", UARitualSheet, {
        label: "UA.RitualSheet",
        types: [
            "ritual"
        ],
        makeDefault: true
    });
    Items.registerSheet("unknownarmies", UASpellSheet, {
        label: "UA.SpellSheet",
        types: [
            "spell"
        ],
        makeDefault: true
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
        let features = Object.values(identity.system.features);
        switch (identity.system.type) {
            case "Adept":
                break;
            case "Avatar":
                let percentage = identity.system.percentage;
                if (percentage >= 1 && identity.system.avatar.channels["1-50"] !== "") {
                    features.push("Channel1-50%");
                }
                if (percentage >= 51 && identity.system.avatar.channels["51-70"] !== "") {
                    features.push("Channel51-70%");
                }
                if (percentage >= 71 && identity.system.avatar.channels["71-90"] !== "") {
                    features.push("Channel71-90%");
                }
                if (percentage >= 91 && identity.system.avatar.channels["91-98"] !== "") {
                    features.push("Channel91-98%");
                }
                if (percentage >= 99 && identity.system.avatar.channels["99-"] !== "") {
                    features.push("Channel99%");
                }
                break;
            case "Mundane":
                let substitutesFor = identity.system.mundane.substitutesFor;
                if (substitutesFor !== "") {
                    features.push("Substitutes for " + substitutesFor);
                }
                break;
            case "Supernatural":
                let supernaturalAbility = identity.system.supernatural.ability;
                if (supernaturalAbility !== "") {
                    features.push(supernaturalAbility);
                }
        }
        return features.sort();
    });
    Handlebars.registerHelper("stripHTML", function (html) {
        return jQuery(html).text().replaceAll(/([.!?])([^.!?])/g, "$1 $2");
    });
    // Handlebars Helpers (Blocks) ---------------------------------------------
});

Hooks.once("ready", function() {
    $(document.body).addClass(UAUtils.theme);
});

Hooks.on("renderDialog", (dialog, html) => {
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

Hooks.on("renderSidebarTab", (sidebarTab, html) => {
    if (sidebarTab.tabName === "chat") {
        html.find(".chat-control-icon i").removeClass("fa-dice-d20").addClass("fa-dice-d10");
        html.find(".chat-control-icon").on("click", async () => {
            let roll = new Roll("1d100");
            await roll.evaluate();
            let rollResult = parseInt(roll.result);
            let content = "";
            content += `<div class="dice-roll">`;
            content += `    <div class="dice-result">`;
            content += `        <h4 class="dice-total">${rollResult}</h4>`;
            content += `        <div class="dice-tooltip">`;
            content += `            <section class="tooltip-part">`;
            content += `                <div class="dice">`;
            content += `                    <header class="part-header flexrow">`;
            content += `                        <span class="part-formula">1d100</span>`;
            content += `                        <span class="part-total">${rollResult}</span>`;
            content += `                    </header>`;
            content += `                    <ol class="dice-rolls">`;
            content += `                        <li class="roll die d100">${rollResult}</li>`;
            content += `                    </ol>`;
            content += `                </div>`;
            content += `            </section>`;
            content += `        </div>`;
            content += `    </div>`;
            content += `</div>`;
            roll.toMessage({
                content: content,
                flavor: "1d100"
            });
        });
    }
});