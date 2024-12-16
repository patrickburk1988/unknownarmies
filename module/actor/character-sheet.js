import UABaseActorSheet from "./base-actor-sheet.js";

export default class UACharacterSheet extends UABaseActorSheet
{
    static optionsFearShockMeter = {
        "":             "",
        "Helplessness": "Helplessness",
        "Isolation":    "Isolation",
        "Self":         "Self",
        "Unnatural":    "Unnatural",
        "Violence":     "Violence"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "character"
            ],
            height: 905                                                  // TODO
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='open-cabal']").on("click", this._onOpenCabal.bind(this));
        html.find("[data-action='reset-failed-notches']").on("click", this._onResetFailedNotches.bind(this));
        // HACK BELOW
        html.find("[data-action='select-identity-feature']").on("click", this._onSelectIdentityFeature.bind(this));                            // TODO contextmenu?
    }

    async getData (options) {
        const data = await super.getData(options);
        data.cabals = {
            "": ""
        };
        for (let cabal of game.actors.filter(actor => actor.type == "cabal" && actor.testUserPermission(game.user, "OBSERVER"))) {                    // TODO
            data.cabals[cabal._id] = cabal.name;                         // TODO
        }
        data.optionsFearShockMeter = UACharacterSheet.optionsFearShockMeter;
        data.enrichedAppearance = await TextEditor.enrichHTML(this.object.system.appearance, {
            async: true
        });
        data.enrichedPersonality = await TextEditor.enrichHTML(this.object.system.personality, {
            async: true
        });
        data.enrichedBackground = await TextEditor.enrichHTML(this.object.system.background, {
            async: true
        });
        return data;
    }

    _onOpenCabal (event) {
        game.actors.get(this.actor.system.cabal).sheet.render(true);     // TODO
    }

    _onResetFailedNotches (event) {
        let key = "system.shockGauge." + $(event.currentTarget).data("shock-meter") + ".notches.failed";                                                         // TODO
        this.actor.update({                                              // TODO
            [key]: 0                                                     // TODO
        });                                                              // TODO
    }

    _onSelectIdentityFeature (event) {
        event.preventDefault();                                          // TODO
        let identity = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));                                                    // TODO
        let content = `<p>${game.i18n.localize("UA.SelectIdentityFeature_Details")}</p><p><button data-action="roll" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-target="${identity.system.percentage}">${game.i18n.localize("UA.None")}</button>`; // MAYBE <p>s not needed?        // TODO
        let features = Object.values(identity.system.features);          // TODO
        switch (identity.system.type) {                                  // TODO
            case "Adept":                                                // TODO
                break;                                                   // TODO
            case "Avatar":                                               // TODO
                let percentage = identity.system.percentage;             // TODO
                if (percentage >= 1 && identity.system.avatar.channels["1-50"] != "") {      // TODO
                    features.push("Channel1-50%");                       // TODO
                }                                                        // TODO
                if (percentage >= 51 && identity.system.avatar.channels["51-70"] != "") {    // TODO
                    features.push("Channel51-70%");                      // TODO
                }                                                        // TODO
                if (percentage >= 71 && identity.system.avatar.channels["71-90"] != "") {    // TODO
                    features.push("Channel71-90%");                      // TODO
                }                                                        // TODO
                if (percentage >= 91 && identity.system.avatar.channels["91-98"] != "") {    // TODO
                    features.push("Channel91-98%");                      // TODO
                }                                                        // TODO
                if (percentage >= 99 && identity.system.avatar.channels["99-"] != "") {      // TODO
                    features.push("Channel99%");                         // TODO
                }                                                        // TODO
                break;                                                   // TODO
            case "Mundane":                                              // TODO
                let substitutesFor = identity.system.mundane.substitutesFor;                 // TODO
                if (substitutesFor != "") {                              // TODO
                    features.push("Substitutes for " + substitutesFor);  // TODO
                }                                                        // TODO
                break;                                                   // TODO
            case "Supernatural":                                         // TODO
                let supernaturalAbility = identity.system.supernatural.ability;              // TODO
                if (supernaturalAbility != "") {                         // TODO
                    features.push(supernaturalAbility);                  // TODO
                }                                                        // TODO
        }                                                                // TODO
        for (let feature of features.sort()) {                           // TODO
            if (feature != "") {                                         // TODO
                let text = game.i18n.localize("UA." + feature.replaceAll(" for ", "For").replaceAll(" ", ""));                                              // TODO
                content += `<button data-action="roll" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-content-header="${text}" data-roll-target="${identity.system.percentage}">${text}</button>`;                                     // TODO
            }                                                            // TODO
        }                                                                // TODO
        content += `</p>`; // MAYBE <p>s not needed?                     // TODO
        let dialog = new Dialog({ // MAYBE const await?                  // TODO
            title: game.i18n.localize("UA.SelectIdentityFeature"),       // TODO
            content: content,                                            // TODO
            buttons: {},                                                 // TODO
            // default: // MAYBE                                         // TODO
            render: html => {                                            // TODO
                let buttons = html.find("[data-action='roll']");         // TODO
                buttons.on("click contextmenu", this._onRoll.bind(this));// TODO
                buttons.on("click", () => { // MAYBE contextmenu?        // TODO
                    dialog.close();                                      // TODO
                });                                                      // TODO
            }                                                            // TODO
            // close: // MAYBE                                           // TODO
        }).render(true);                                                 // TODO
    }
}