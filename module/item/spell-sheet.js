import UABaseItemSheet from "./base-item-sheet.js";

export default class UASpellSheet extends UABaseItemSheet
{
    static optionsCostTypeSingular = {
        "": "",
        "Minor Charge":       "Minor Charge",
        "Significant Charge": "Significant Charge",
        "Major Charge":       "Major Charge"
    }

    static optionsCostTypePlural = {
        "": "",
        "Minor Charge":       "Minor Charges",
        "Significant Charge": "Significant Charges",
        "Major Charge":       "Major Charges"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "spell"
            ],
/*FIX*/            height: 600,
/*FIX*/            width: 650
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsCostTypeSingular = UASpellSheet.optionsCostTypeSingular;
        data.optionsCostTypePlural = UASpellSheet.optionsCostTypePlural;
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}