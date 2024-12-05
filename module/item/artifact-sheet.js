import UABaseItemSheet from "./base-item-sheet.js";

export default class UAArtifactSheet extends UABaseItemSheet
{
    static optionsPower = {
        "":            "",
        "Minor":       "Minor",
        "Significant": "Significant",
        "Major":       "Major"
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 650,
            height: 600,
            classes: [
                "unknownarmies",
                "sheet",
                "artifact"
            ]
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsPower = UAArtifactSheet.optionsPower;
        data.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {
            async: true
        });
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}