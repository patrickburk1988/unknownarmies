import UABaseItemSheet from "./base-item-sheet.js";

export default class UARitualSheet extends UABaseItemSheet
{
    static optionsCostTypeSingular = {
        "":                   "",
        "Minor Charge":       "Minor Charge",
        "Significant Charge": "Significant Charge",
        "Major Charge":       "Major Charge"
    }
    static optionsCostTypePlural = {
        "":                   "",
        "Minor Charge":       "Minor Charges",
        "Significant Charge": "Significant Charges",
        "Major Charge":       "Major Charges"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 650,
            height: 600,
            classes: [
                "unknownarmies",
                "sheet",
                "ritual"
            ]
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsCostTypeSingular = UARitualSheet.optionsCostTypeSingular;
        data.optionsCostTypePlural = UARitualSheet.optionsCostTypePlural;
        data.enrichedRitualAction = await TextEditor.enrichHTML(this.object.system.action, {
            async: true
        });
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}