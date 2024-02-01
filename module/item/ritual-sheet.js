import UABaseItemSheet from "./base-item-sheet.js";

export default class UARitualSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "ritual"
            ],
            height: 600,
            width: 650
        });
    }

    async getData (options) {
        let data = await super.getData(options);
        data.enrichedRitualAction = await TextEditor.enrichHTML(this.object.system.action, {
            async: true
        });
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}