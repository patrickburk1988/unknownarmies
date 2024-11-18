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
/*FIX*/            height: 905
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='open-cabal']").on("click", this._onOpenCabal.bind(this));
        html.find("[data-action='reset-failed-notches']").on("click", this._onResetFailedNotches.bind(this));
        html.find("[data-action='select-identity-feature']").on("click", this._onSelectIdentityFeature.bind(this)); // FIX contextmenu?
    }

    async getData (options) {
        const data = await super.getData(options);
/*FIX*/        data.cabals = {
/*FIX*/            "": ""
/*FIX*/        }
/*FIX*/        for (let cabal of game.actors.filter(actor => actor.type === "cabal" && actor.testUserPermission(game.user, "OBSERVER"))) {
/*FIX*/            data.cabals[cabal._id] = cabal.name;
/*FIX*/        }
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
        game.actors.get(this.actor.system.cabal).sheet.render(true);
    }

    _onResetFailedNotches (event) {
        let key = "system.shockGauge." + $(event.currentTarget).data("shock-meter") + ".notches.failed";
        this.actor.update({
            [key]: 0
        });
    }

    _onSelectIdentityFeature (event) {
        event.preventDefault(); // MAYBE Remove?
        let identity = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));
        let content = `<p>${game.i18n.localize("UA.SelectIdentityFeature_Details")}</p><p><button data-action="roll" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-target="${identity.system.percentage}">${game.i18n.localize("UA.None")}</button>`; // MAYBE <p>s not needed?
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
        for (let feature of features.sort()) {
            if (feature !== "") {
                let text = game.i18n.localize("UA." + feature.replaceAll(" for ", "For").replaceAll(" ", ""));
                content += `<button data-action="roll" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-content-header="${text}" data-roll-target="${identity.system.percentage}">${text}</button>`;
            }
        }
        content += `</p>`; // MAYBE <p>s not needed?
        let dialog = new Dialog({ // MAYBE const await?
            title: game.i18n.localize("UA.SelectIdentityFeature"),
            content: content,
            buttons: {},
            // default: // MAYBE
            render: html => {
                let buttons = html.find("[data-action='roll']");
                buttons.on("click contextmenu", this._onRoll.bind(this));
                buttons.on("click", () => { // MAYBE contextmenu?
                    dialog.close();
                });
            }
            // close: // MAYBE
        }).render(true);
    }
}