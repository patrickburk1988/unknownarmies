import { UABaseItemSheet } from "./base-item-sheet.mjs";

export class UAArtifactSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "default",
                "sheet",
                "sheet--artifact"
            ]
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsPower = this.item.system.schema.fields.power.choices;
        data.enrichedDescription = await this._enrich(this.object.system.description);
        data.enrichedEffect = await this._enrich(this.object.system.effect);
        return data;
    }
}