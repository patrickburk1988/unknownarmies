import UABaseItemSheet from "./base-item-sheet.js";

export default class UASpellSheet extends UABaseItemSheet
{
    static optionsCostTypePlural = {
        "":                   "",
        "Minor Charge":       "Minor Charges",
        "Significant Charge": "Significant Charges",
        "Major Charge":       "Major Charges"
    }
    static optionsCostTypeSingular = {
        "":                   "",
        "Minor Charge":       "Minor Charge",
        "Significant Charge": "Significant Charge",
        "Major Charge":       "Major Charge"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "spell"
            ],
            height: 600,                                                 // TODO
            width: 650                                                   // TODO
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsCostTypePlural = UASpellSheet.optionsCostTypePlural;
        data.optionsCostTypeSingular = UASpellSheet.optionsCostTypeSingular;
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}