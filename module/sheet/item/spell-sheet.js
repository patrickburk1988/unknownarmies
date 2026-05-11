import { UABaseItemSheet } from "./base-item-sheet.js";

export class UASpellSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet",
                "sheet--spell"
            ]
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.enrichedEffect = await TextEditor.enrichHTML(this.object.system.effect, {
            async: true
        });
        return data;
    }
}