import { UABaseActorSheet } from "./base-actor-sheet.js";

export class UACabalSheet extends UABaseActorSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet",
                "sheet--cabal"
            ],
            height: 600 //FORNOW
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsObjectiveScale = this.actor.system.schema.fields.objective.fields.scale.choices;
        return data;
    }
}