import UABaseActorSheet from "./base-actor-sheet.js";

export default class UACharacterSheet extends UABaseActorSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "character"
            ],
            height: 905
        });
    }

    async getData (options) {
        let data = await super.getData(options);
        data.cabals = game.actors.filter(actor => actor.type === "cabal" && actor.testUserPermission(game.user, "OBSERVER"));
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

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='open-cabal']").on("click", this._onOpenCabal.bind(this));
        html.find("[data-action='reset-failed-notches']").on("click", this._onResetFailedNotches.bind(this));
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
}