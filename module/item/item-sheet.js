import UABaseItemSheet from "./base-item-sheet.js";

export default class UAItemSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "item"
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