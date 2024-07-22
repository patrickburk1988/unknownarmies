import UABaseItemSheet from "./base-item-sheet.js";

export default class UAArtifactSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "artifact"
            ],
            height: 600,
            width: 650
        });
    }

    async getData (options) {
        let data = await super.getData(options);
        data.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {
            async: true
        });
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}