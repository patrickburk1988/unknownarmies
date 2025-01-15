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
        html.find("[data-action='select-identity-feature']").on("click", this._onSelectIdentityFeature.bind(this));                            // TODO contextmenu?
    }

    async getData (options) {
        const data = await super.getData(options);
        data.cabalOptions = {
            "": ""
        };
        for (let cabal of game.actors.filter(actor => actor.type == "cabal" && actor.testUserPermission(game.user, "OBSERVER"))) {
            data.cabalOptions[cabal._id] = cabal.name;
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
        game.actors.get(this.actor.system.cabal).sheet.render(true);
    }

    _onResetFailedNotches (event) {
        // HACK BELOW
        let key = "system.shockGauge." + $(event.currentTarget).data("shock-meter") + ".notches.failed";                                                         // TODO
        this.actor.update({                                              // TODO
            [key]: 0                                                     // TODO
        });                                                              // TODO
    }

    _onSelectIdentityFeature (event) {
        event.preventDefault();
        const identity = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));
        let content = `<p>${game.i18n.localize("UA.SelectIdentityFeature_Details")}</p>
        <button data-action="roll" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-target="${identity.system.percentage}">${game.i18n.localize("UA.None")}</button>`;
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
        for (let feature of features.sort()) {
            if (feature != "") {
                const text = game.i18n.localize("UA." + feature.replaceAll(" for ", "For").replaceAll(" ", ""));
                content += `<button data-action="roll" data-roll-content-header="<p>${text}</p>" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-target="${identity.system.percentage}">${text}</button>`;
            }
        }
        const dialog = new Dialog({
            buttons: {},
            content: content,
            title: game.i18n.localize("UA.SelectIdentityFeature"),
            render: html => {
                const rollButtons = html.find("[data-action='roll']");
                rollButtons.on("click contextmenu", this._onRoll.bind(this));
                rollButtons.on("click", () => {
                    dialog.close();
                });
            }
        }).render(true);
    }
}