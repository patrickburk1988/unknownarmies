import { UABaseActorSheet } from "./base-actor-sheet.js";

export class UACharacterSheet extends UABaseActorSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet",
                "sheet--character"
            ],
            height: 894, //TEST
        });
    }

    activateListeners (html) {
        const identityDetailsObserver = new ResizeObserver((entries, observer) => {
            // Removes scroll indicators for single-line identity details.
            for (const entry of entries) {
                const target = entry.target;
                const wrapper = target.classList.contains("pseudo-editors__label") ? target.nextSibling.nextSibling : target; //MAYBE target -> entry.target
                const details = wrapper.querySelector(".identity__details");
                if (details.scrollHeight === 0) {
                    continue;
                }
                if (details.scrollHeight <= (details.clientHeight + 1)) {
                    details.style.scrollbarColor = "transparent transparent";
                    wrapper.classList.add("identity__details-wrapper--no-expand");
                    wrapper.style.maxHeight = "32px";
                    $(wrapper).off?.("click"); //TEST Make sure this works.
                }
                observer.unobserve(wrapper);
            }
        });
        super.activateListeners(html);
        html.find("[data-action='open-cabal']").on("click", this._onOpenCabal.bind(this));
        html.find("[data-action='reset-failed-notches']").on("click", this._onResetFailedNotches.bind(this));
        html.find("[data-action='select-identity-feature']").on("click", this._onSelectIdentityFeature.bind(this)); // TODO contextmenu? //MAYBE Move to identity too?
        html.find(".identity__details-wrapper, .pseudo-editors__label").on("click", this._onToggleIdentityDetailsStart.bind(this)).on("transitionend", this._onToggleIdentityDetailsEnd.bind(this)).each((i, wrapper) => identityDetailsObserver.observe(wrapper));
    }

    async getData (options) {
        const data = await super.getData(options);
        data.cabalOptions = {
            "": ""
        };
        for (let cabal of game.actors.filter(actor => actor.type == "cabal" && actor.testUserPermission(game.user, "OBSERVER"))) {
            data.cabalOptions[cabal._uuid] = cabal.name;
        }
        data.optionsFearShockMeter = this.actor.system.schema.fields.passions.fields.fear.fields.shockMeter.choices;
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
        game.actors.get(this.actor.system.cabal.replaceAll("Actor.", "")).sheet.render(true); //MAYBE replace
    }

    _onResetFailedNotches (event) {
        // HACK Re-examine below
        let key = "system.shockGauge." + $(event.currentTarget).data("shock-meter") + ".notches.failed";
        this.actor.update({
            [key]: 0
        });
    }

    _onSelectIdentityFeature (event) {
        // HACK Re-examine below
        event.preventDefault();
        const identity = this.actor.items.get($(event.currentTarget).parents(".item").data("item-id"));
        let content = `<p>${game.i18n.localize("UA.SelectIdentityFeature_Details")}</p>
        <button data-action="roll" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-target="${identity.system.percentage ?? 0}">${game.i18n.localize("UA.None")}</button>`;
        const features = Object.values(identity.system.features);
        switch (identity.system.type) {
            case "Adept": {
                break;
            }
            case "Avatar": {
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
            }
            case "Mundane": {
                const substitutesFor = identity.system.mundane.substitutesFor;
                if (substitutesFor != "") {
                    features.push("Substitutes for " + substitutesFor);
                }
                break;
            }
            case "Supernatural": {
                const ability = identity.system.supernatural.ability;
                if (ability != "") {
                    features.push(ability);
                }
            }
        }
        for (let feature of features.sort()) {
            if (feature) { // MAYBE feature != "" && feature != undefined
                const text = game.i18n.localize("UA." + feature.replaceAll(" for ", "For").replaceAll(" ", ""));
                content += `<button data-action="roll" data-roll-content-header="<p>${text}</p>" data-roll-label="${identity.name} (${game.i18n.localize("UA." + identity.system.type + "Identity")})" data-roll-target="${identity.system.percentage ?? 0}">${text}</button>`;
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

    _onToggleIdentityDetailsEnd (event) {
        const currentTarget = event.currentTarget;
        const wrapper = currentTarget.classList.contains("pseudo-editors__label") ? currentTarget.nextSibling.nextSibling : event.currentTarget; //MAYBE event.currentTarget -> currentTarget
        if (!wrapper.classList.contains("identity__details-wrapper--expanded")) {
            wrapper.querySelector(".identity__details").style.overflowY = ""; //MAYBE
            wrapper.querySelector(".identity__details").style.webkitLineClamp = ""; //MAYBE
        }
    }

    _onToggleIdentityDetailsStart (event) {
        const currentTarget = event.currentTarget;
        const wrapper = currentTarget.classList.contains("pseudo-editors__label") ? currentTarget.nextSibling.nextSibling : event.currentTarget; //MAYBE event.currentTarget -> currentTarget
        const details = wrapper.querySelector(".identity__details");
        details.style.overflowY = "auto"; //MAYBE
        details.style.webkitLineClamp = "none"; //MAYBE
        if (wrapper.classList.contains("identity__details-wrapper--expanded")) {
            details.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            details.classList.remove("identity__details--expanded");
            wrapper.classList.remove("identity__details-wrapper--expanded");
        } else {
            details.classList.add("identity__details--expanded");
            wrapper.classList.add("identity__details-wrapper--expanded");
        }
    }
}