import UABaseItemSheet from "./base-item-sheet.js";

export default class UAIdentitySheet extends UABaseItemSheet
{
    static optionsType = {
        "":             "",
        "Mundane":      "Mundane",
        "Supernatural": "Supernatural",
        "Avatar":       "Avatar",
        "Adept":        "Adept"
    }

    static optionsSubstitutesFor = {
        "":          "",
        "Connect":   "Connect",
        "Dodge":     "Dodge",
        "Fitness":   "Fitness",
        "Knowledge": "Knowledge",
        "Lie":       "Lie",
        "Notice":    "Notice",
        "Pursuit":   "Pursuit",
        "Secrecy":   "Secrecy",
        "Status":    "Status",
        "Struggle":  "Struggle"
    }

    static optionsIdentitySupernaturalAbility = {
        "":                       "",
        "Influence":              "Influence",
        "Specific Harm":          "Specific Harm",
        "Specific Information":   "Specific Information",
        "Specific Protection":    "Specific Protection",
        "Vague Harm":             "Vague Harm",
        "Vague Information":      "Vague Information",
        "Vague Protection":       "Vague Protection",
        "Versatility":            "Versatility"
    }

    static optionsIdentitySupernaturalAbilityMMY = {
        "":                       "",
        "Alter Fear":             "Alter Fear",
        "Alter Noble":            "Alter Noble",
        "Alter Rage":             "Alter Rage",
        "Influence":              "Influence",
        "Specific Harm":          "Specific Harm",
        "Specific Information":   "Specific Information",
        "Specific Protection":    "Specific Protection",
        "Terrorize Helplessness": "Terrorize Helplessness",
        "Terrorize Isolation":    "Terrorize Isolation",
        "Terrorize Self":         "Terrorize Self",
        "Terrorize Unnatural":    "Terrorize Unnatural",
        "Terrorize Violence":     "Terrorize Violence",
        "Vague Harm":             "Vague Harm",
        "Vague Information":      "Vague Information",
        "Vague Protection":       "Vague Protection",
        "Versatility":            "Versatility"
    }

    static optionsIdentityFeaturesMundane = {
        "": "",
        "Casts Rituals":             "Casts Rituals",
        "Coerces Helplessness":      "Coerces Helplessness",
        "Coerces Isolation":         "Coerces Isolation",
        "Coerces Self":              "Coerces Self",
        "Coerces Unnatural":         "Coerces Unnatural",
        "Coerces Violence":          "Coerces Violence",
        "Cooperative":               "Cooperative",
        "Evaluates Helplessness":    "Evaluates Helplessness",
        "Evaluates Isolation":       "Evaluates Isolation",
        "Evaluates Self":            "Evaluates Self",
        "Evaluates Unnatural":       "Evaluates Unnatural",
        "Evaluates Violence":        "Evaluates Violence",
        "Medical":                   "Medical",
        "Provides Firearm Attacks":  "Provides Firearm Attacks",
        "Provides Initiative":       "Provides Initiative",
        "Provides Wound Threshold":  "Provides Wound Threshold",
        "Resists Helplessness":      "Resists Helplessness",
        "Resists Isolation":         "Resists Isolation",
        "Resists Self":              "Resists Self",
        "Resists Unnatural":         "Resists Unnatural",
        "Resists Violence":          "Resists Violence",
        "Sincere":                   "Sincere",
        "Substitutes for Connect":   "Substitutes for Connect",
        "Substitutes for Dodge":     "Substitutes for Dodge",
        "Substitutes for Fitness":   "Substitutes for Fitness",
        "Substitutes for Knowledge": "Substitutes for Knowledge",
        "Substitutes for Lie":       "Substitutes for Lie",
        "Substitutes for Notice":    "Substitutes for Notice",
        "Substitutes for Pursuit":   "Substitutes for Pursuit",
        "Substitutes for Secrecy":   "Substitutes for Secrecy",
        "Substitutes for Status":    "Substitutes for Status",
        "Substitutes for Struggle":  "Substitutes for Struggle",
        "Tactical":                  "Tactical",
        "Therapeutic":               "Therapeutic",
        "Unique":                    "Unique",
        "Use Gutter Magick":         "Use Gutter Magick",
        "Weaponized Physique":       "Weaponized Physique"
    }

    static optionsIdentityFeaturesMundaneMMY = {
        "": "",
        "Casts Rituals":             "Casts Rituals",
        "Coerces Helplessness":      "Coerces Helplessness",
        "Coerces Isolation":         "Coerces Isolation",
        "Coerces Self":              "Coerces Self",
        "Coerces Unnatural":         "Coerces Unnatural",
        "Coerces Violence":          "Coerces Violence",
        "Cooperative":               "Cooperative",
        "Evaluates Helplessness":    "Evaluates Helplessness",
        "Evaluates Isolation":       "Evaluates Isolation",
        "Evaluates Self":            "Evaluates Self",
        "Evaluates Unnatural":       "Evaluates Unnatural",
        "Evaluates Violence":        "Evaluates Violence",
        "Medical":                   "Medical",
        "Provides Firearm Attacks":  "Provides Firearm Attacks",
        "Provides Initiative":       "Provides Initiative",
        "Provides Wound Threshold":  "Provides Wound Threshold",
        "Reads Fear":                "Reads Fear",
        "Reads Noble":               "Reads Noble",
        "Reads Obsession":           "Reads Obsession",
        "Reads Rage":                "Reads Rage",
        "Resists Helplessness":      "Resists Helplessness",
        "Resists Isolation":         "Resists Isolation",
        "Resists Self":              "Resists Self",
        "Resists Unnatural":         "Resists Unnatural",
        "Resists Violence":          "Resists Violence",
        "Sincere":                   "Sincere",
        "Substitutes for Connect":   "Substitutes for Connect",
        "Substitutes for Dodge":     "Substitutes for Dodge",
        "Substitutes for Fitness":   "Substitutes for Fitness",
        "Substitutes for Knowledge": "Substitutes for Knowledge",
        "Substitutes for Lie":       "Substitutes for Lie",
        "Substitutes for Notice":    "Substitutes for Notice",
        "Substitutes for Pursuit":   "Substitutes for Pursuit",
        "Substitutes for Secrecy":   "Substitutes for Secrecy",
        "Substitutes for Status":    "Substitutes for Status",
        "Substitutes for Struggle":  "Substitutes for Struggle",
        "Tactical":                  "Tactical",
        "Therapeutic":               "Therapeutic",
        "Totem":                     "Totem",
        "Unique":                    "Unique",
        "Use Gutter Magick":         "Use Gutter Magick",
        "Weaponized Physique":       "Weaponized Physique"
    }

    static optionsIdentityFeaturesNotMundane = {
        "": "",
        "Casts Rituals":     "Casts Rituals",
        "Use Gutter Magick": "Use Gutter Magick"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 800,
            height: 707,
            classes: [
                "unknownarmies",
                "sheet",
                "identity"
            ]
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='improve']").on("click", this._onImprove.bind(this));
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsType = UAIdentitySheet.optionsType;
        data.optionsSubstitutesFor = UAIdentitySheet.optionsSubstitutesFor;
        if (game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures")) {/*FIX*/
            data.optionsSupernaturalAbility = UAIdentitySheet.optionsIdentitySupernaturalAbilityMMY;/*FIX*/
            data.optionsFeatures = UAIdentitySheet.optionsIdentityFeaturesMundaneMMY;/*FIX*/
        } else {/*FIX*/
            data.optionsSupernaturalAbility = UAIdentitySheet.optionsIdentitySupernaturalAbility;/*FIX*/
            data.optionsFeatures = UAIdentitySheet.optionsIdentityFeaturesMundane;/*FIX*/
        }/*FIX*/
        data.optionsFeaturesNotMundane = UAIdentitySheet.optionsIdentityFeaturesNotMundane;/*FIX*/
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

    async _onImprove (event) {
        event.preventDefault();
        let roll = new Roll("1d5");
        await roll.evaluate();
        let rollResult = parseInt(roll.result);
        let oldPercentage = this.object.system.percentage;
        let newPercentage = oldPercentage + rollResult;
        let outcome = game.i18n.localize("UA.IdentityImproved") + ": " + oldPercentage + '% <span class="arrow">▶</span> ' + newPercentage + "%";
        this.item.update({
            "system.percentage": newPercentage,
            "system.hasExperience": false
        });
        let content = "";
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">+${rollResult}%</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">1d5</span>`;
        content += `                        <span class="part-total">${rollResult}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        content += `                        <li class="roll die d10">${rollResult}</li>`;
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `        <div class="dice-formula">${outcome}`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: event.currentTarget.dataset["rollLabel"]
        });
    }
}