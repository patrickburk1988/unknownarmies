import UABaseItemSheet from "./base-item-sheet.js";

export default class UAIdentitySheet extends UABaseItemSheet
{
    static optionsSubstitutesFor = {                                     // TODO
        "":          "",                                                 // TODO
        "Connect":   "Connect",                                          // TODO
        "Dodge":     "Dodge",                                            // TODO
        "Fitness":   "Fitness",                                          // TODO
        "Knowledge": "Knowledge",                                        // TODO
        "Lie":       "Lie",                                              // TODO
        "Notice":    "Notice",                                           // TODO
        "Pursuit":   "Pursuit",                                          // TODO
        "Secrecy":   "Secrecy",                                          // TODO
        "Status":    "Status",                                           // TODO
        "Struggle":  "Struggle"                                          // TODO
    }                                                                    // TODO
    static optionsIdentitySupernaturalAbility = {                        // TODO
        "":                       "",                                    // TODO
        "Influence":              "Influence",                           // TODO
        "Specific Harm":          "Specific Harm",                       // TODO
        "Specific Information":   "Specific Information",                // TODO
        "Specific Protection":    "Specific Protection",                 // TODO
        "Vague Harm":             "Vague Harm",                          // TODO
        "Vague Information":      "Vague Information",                   // TODO
        "Vague Protection":       "Vague Protection",                    // TODO
        "Versatility":            "Versatility"                          // TODO
    }                                                                    // TODO
    static optionsIdentitySupernaturalAbilityMMY = {                     // TODO
        "":                       "",                                    // TODO
        "Alter Fear":             "Alter Fear",                          // TODO
        "Alter Noble":            "Alter Noble",                         // TODO
        "Alter Rage":             "Alter Rage",                          // TODO
        "Influence":              "Influence",                           // TODO
        "Specific Harm":          "Specific Harm",                       // TODO
        "Specific Information":   "Specific Information",                // TODO
        "Specific Protection":    "Specific Protection",                 // TODO
        "Terrorize Helplessness": "Terrorize Helplessness",              // TODO
        "Terrorize Isolation":    "Terrorize Isolation",                 // TODO
        "Terrorize Self":         "Terrorize Self",                      // TODO
        "Terrorize Unnatural":    "Terrorize Unnatural",                 // TODO
        "Terrorize Violence":     "Terrorize Violence",                  // TODO
        "Vague Harm":             "Vague Harm",                          // TODO
        "Vague Information":      "Vague Information",                   // TODO
        "Vague Protection":       "Vague Protection",                    // TODO
        "Versatility":            "Versatility"                          // TODO
    }                                                                    // TODO
    static optionsIdentityFeaturesMundane = {                            // TODO
        "": "",                                                          // TODO
        "Casts Rituals":             "Casts Rituals",                    // TODO
        "Coerces Helplessness":      "Coerces Helplessness",             // TODO
        "Coerces Isolation":         "Coerces Isolation",                // TODO
        "Coerces Self":              "Coerces Self",                     // TODO
        "Coerces Unnatural":         "Coerces Unnatural",                // TODO
        "Coerces Violence":          "Coerces Violence",                 // TODO
        "Cooperative":               "Cooperative",                      // TODO
        "Evaluates Helplessness":    "Evaluates Helplessness",           // TODO
        "Evaluates Isolation":       "Evaluates Isolation",              // TODO
        "Evaluates Self":            "Evaluates Self",                   // TODO
        "Evaluates Unnatural":       "Evaluates Unnatural",              // TODO
        "Evaluates Violence":        "Evaluates Violence",               // TODO
        "Medical":                   "Medical",                          // TODO
        "Provides Firearm Attacks":  "Provides Firearm Attacks",         // TODO
        "Provides Initiative":       "Provides Initiative",              // TODO
        "Provides Wound Threshold":  "Provides Wound Threshold",         // TODO
        "Resists Helplessness":      "Resists Helplessness",             // TODO
        "Resists Isolation":         "Resists Isolation",                // TODO
        "Resists Self":              "Resists Self",                     // TODO
        "Resists Unnatural":         "Resists Unnatural",                // TODO
        "Resists Violence":          "Resists Violence",                 // TODO
        "Sincere":                   "Sincere",                          // TODO
        "Substitutes for Connect":   "Substitutes for Connect",          // TODO
        "Substitutes for Dodge":     "Substitutes for Dodge",            // TODO
        "Substitutes for Fitness":   "Substitutes for Fitness",          // TODO
        "Substitutes for Knowledge": "Substitutes for Knowledge",        // TODO
        "Substitutes for Lie":       "Substitutes for Lie",              // TODO
        "Substitutes for Notice":    "Substitutes for Notice",           // TODO
        "Substitutes for Pursuit":   "Substitutes for Pursuit",          // TODO
        "Substitutes for Secrecy":   "Substitutes for Secrecy",          // TODO
        "Substitutes for Status":    "Substitutes for Status",           // TODO
        "Substitutes for Struggle":  "Substitutes for Struggle",         // TODO
        "Tactical":                  "Tactical",                         // TODO
        "Therapeutic":               "Therapeutic",                      // TODO
        "Unique":                    "Unique",                           // TODO
        "Use Gutter Magick":         "Use Gutter Magick",                // TODO
        "Weaponized Physique":       "Weaponized Physique"               // TODO
    }                                                                    // TODO
    static optionsIdentityFeaturesMundaneMMY = {                         // TODO
        "": "",                                                          // TODO
        "Casts Rituals":             "Casts Rituals",                    // TODO
        "Coerces Helplessness":      "Coerces Helplessness",             // TODO
        "Coerces Isolation":         "Coerces Isolation",                // TODO
        "Coerces Self":              "Coerces Self",                     // TODO
        "Coerces Unnatural":         "Coerces Unnatural",                // TODO
        "Coerces Violence":          "Coerces Violence",                 // TODO
        "Cooperative":               "Cooperative",                      // TODO
        "Evaluates Helplessness":    "Evaluates Helplessness",           // TODO
        "Evaluates Isolation":       "Evaluates Isolation",              // TODO
        "Evaluates Self":            "Evaluates Self",                   // TODO
        "Evaluates Unnatural":       "Evaluates Unnatural",              // TODO
        "Evaluates Violence":        "Evaluates Violence",               // TODO
        "Medical":                   "Medical",                          // TODO
        "Provides Firearm Attacks":  "Provides Firearm Attacks",         // TODO
        "Provides Initiative":       "Provides Initiative",              // TODO
        "Provides Wound Threshold":  "Provides Wound Threshold",         // TODO
        "Reads Fear":                "Reads Fear",                       // TODO
        "Reads Noble":               "Reads Noble",                      // TODO
        "Reads Obsession":           "Reads Obsession",                  // TODO
        "Reads Rage":                "Reads Rage",                       // TODO
        "Resists Helplessness":      "Resists Helplessness",             // TODO
        "Resists Isolation":         "Resists Isolation",                // TODO
        "Resists Self":              "Resists Self",                     // TODO
        "Resists Unnatural":         "Resists Unnatural",                // TODO
        "Resists Violence":          "Resists Violence",                 // TODO
        "Sincere":                   "Sincere",                          // TODO
        "Substitutes for Connect":   "Substitutes for Connect",          // TODO
        "Substitutes for Dodge":     "Substitutes for Dodge",            // TODO
        "Substitutes for Fitness":   "Substitutes for Fitness",          // TODO
        "Substitutes for Knowledge": "Substitutes for Knowledge",        // TODO
        "Substitutes for Lie":       "Substitutes for Lie",              // TODO
        "Substitutes for Notice":    "Substitutes for Notice",           // TODO
        "Substitutes for Pursuit":   "Substitutes for Pursuit",          // TODO
        "Substitutes for Secrecy":   "Substitutes for Secrecy",          // TODO
        "Substitutes for Status":    "Substitutes for Status",           // TODO
        "Substitutes for Struggle":  "Substitutes for Struggle",         // TODO
        "Tactical":                  "Tactical",                         // TODO
        "Therapeutic":               "Therapeutic",                      // TODO
        "Totem":                     "Totem",                            // TODO
        "Unique":                    "Unique",                           // TODO
        "Use Gutter Magick":         "Use Gutter Magick",                // TODO
        "Weaponized Physique":       "Weaponized Physique"               // TODO
    }                                                                    // TODO
    static optionsIdentityFeaturesNotMundane = {                         // TODO
        "": "",                                                          // TODO
        "Casts Rituals":     "Casts Rituals",                            // TODO
        "Use Gutter Magick": "Use Gutter Magick"                         // TODO
    }                                                                    // TODO
    static optionsType = {
        "":             "",
        "Mundane":      "Mundane",
        "Supernatural": "Supernatural",
        "Avatar":       "Avatar",
        "Adept":        "Adept"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "identity"
            ],
            height: 707,                                                 // TODO
            width: 800                                                   // TODO
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='improve']").on("click", this._onImprove.bind(this));
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsType = UAIdentitySheet.optionsType;
        data.optionsSubstitutesFor = UAIdentitySheet.optionsSubstitutesFor;                  // TODO
        if (game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures")) {             // TODO
            data.optionsSupernaturalAbility = UAIdentitySheet.optionsIdentitySupernaturalAbilityMMY;                                           // TODO
            data.optionsFeatures = UAIdentitySheet.optionsIdentityFeaturesMundaneMMY;        // TODO
        } else {                                                                             // TODO
            data.optionsSupernaturalAbility = UAIdentitySheet.optionsIdentitySupernaturalAbility;                                              // TODO
            data.optionsFeatures = UAIdentitySheet.optionsIdentityFeaturesMundane;           // TODO
        }                                                                                    // TODO
        data.optionsFeaturesNotMundane = UAIdentitySheet.optionsIdentityFeaturesNotMundane;  // TODO
        data.enrichedOfCourseICan = await TextEditor.enrichHTML(this.object.system.mundane.ofCourseICan, {
            async: true
        });
        data.enrichedAttributes = await TextEditor.enrichHTML(this.object.system.avatar.attributes, {
            async: true
        });
        data.enrichedSymbols = await TextEditor.enrichHTML(this.object.system.avatar.symbols, {
            async: true
        });
        data.enrichedAvatarTaboos = await TextEditor.enrichHTML(this.object.system.avatar.taboos, {
            async: true
        });
        data["enrichedChannel1-50"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["1-50"], {
            async: true
        });
        data["enrichedChannel51-70"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["51-70"], {
            async: true
        });
        data["enrichedChannel71-90"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["71-90"], {
            async: true
        });
        data["enrichedChannel91-98"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["91-98"], {
            async: true
        });
        data.enrichedChannel99 = await TextEditor.enrichHTML(this.object.system.avatar.channels["99-"], {
            async: true
        });
        data.enrichedDomain = await TextEditor.enrichHTML(this.object.system.adept.domain, {
            async: true
        });
        data.enrichedAdeptTaboos = await TextEditor.enrichHTML(this.object.system.adept.taboos, {
            async: true
        });
        data.enrichedGenerateMinorCharge = await TextEditor.enrichHTML(this.object.system.adept.generateCharge.minor, {
            async: true
        });
        data.enrichedGenerateSignificantCharge = await TextEditor.enrichHTML(this.object.system.adept.generateCharge.significant, {
            async: true
        });
        data.enrichedGenerateMajorCharge = await TextEditor.enrichHTML(this.object.system.adept.generateCharge.major, {
            async: true
        });
        data.enrichedDetails = await TextEditor.enrichHTML(this.object.system.details, {
            async: true
        });
        return data;
    }

    async _onImprove (event) {//     async _onImprove (event) {         // TODO async
        event.preventDefault();
        const roll = await new Roll("1d5").evaluate();                   // TODO
        const rollResult = parseInt(roll.result);                        // TODO
        const oldPercentage = this.object.system.percentage;             // TODO
        await this.item.update({                                         // TODO
            "system.hasExperience": false,                               // TODO
            "system.percentage": oldPercentage + rollResult              // TODO
        });                                                              // TODO
        let content = ``;                                                // TODO
        content += `<div class="dice-roll">`;                            // TODO
        content += `    <div class="dice-result">`;                      // TODO
        content += `        <h4 class="dice-total">+${rollResult}%</h4>`;// TODO
        content += `        <div class="dice-tooltip">`;                 // TODO
        content += `            <section class="tooltip-part">`;         // TODO
        content += `                <div class="dice">`;                 // TODO
        content += `                    <header class="part-header flexrow">`;// TODO
        content += `                        <span class="part-formula">1d5</span>`;// TODO
        content += `                        <span class="part-total">${rollResult}</span>`;// TODO
        content += `                    </header>`;                      // TODO
        content += `                    <ol class="dice-rolls">`;        // TODO
        content += `                        <li class="roll die d10">${rollResult}</li>`;// TODO
        content += `                    </ol>`;                          // TODO
        content += `                </div>`;                             // TODO
        content += `            </section>`;                             // TODO
        content += `        </div>`;                                     // TODO
        content += `        <div class="dice-formula">${game.i18n.localize("UA.IdentityImproved") + ": " + oldPercentage + '% <span class="arrow">▶</span> ' + this.object.system.percentage + "%"}</div>`;                                                     // TODO
        content += `    </div>`;                                         // TODO
        content += `</div>`;                                             // TODO
        roll.toMessage({                                                 // TODO
            flavor: event.currentTarget.dataset["rollLabel"],            // TODO
            content: content                                             // TODO
        });                                                              // TODO
    }                                                                    // TODO
}