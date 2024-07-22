import UABaseActorSheet from "./base-actor-sheet.js";
import UAUtils from "../utils.js";

export default class UACabalSheet extends UABaseActorSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "cabal"
            ],
            height: 600
        });
    }

    async getData (options) {
        let data = await super.getData(options);
        data.optionsObjectiveScale = UAUtils.optionsCabalObjectiveScale;
        return data;
    }
}