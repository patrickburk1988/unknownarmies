import { CostFields, EffectField, NotesFields, migrateCostType } from "../shared-data.js";

export class UARitualData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { HTMLField } = foundry.data.fields;
        return {
            action: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            ...CostFields(),
            ...EffectField(),
            ...NotesFields()
        };
    }

    static migrateData (source) {
        migrateCostType(source);
        return super.migrateData(source);
    }
}