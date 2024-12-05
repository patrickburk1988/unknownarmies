import UABaseActorSheet from "./base-actor-sheet.js";

export default class UACabalSheet extends UABaseActorSheet
{
    static optionsObjectiveScale = {
        "":        "",
        "Local":   "Local",
        "Weighty": "Weighty",
        "Cosmic":  "Cosmic"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            height: 600,
            classes: [
                "unknownarmies",
                "sheet",
                "cabal"
            ]
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsObjectiveScale = UACabalSheet.optionsObjectiveScale;
        return data;
    }
}