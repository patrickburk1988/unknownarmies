import UABaseActorSheet from "./base-actor-sheet.js";

export default class UACabalSheet extends UABaseActorSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "cabal"
            ],
            height: 600
        });
    }
}