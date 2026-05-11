import { CostFields, EffectField, NotesFields, migrateCostType } from "../shared-data.js";

export class UASpellData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { StringField } = foundry.data.fields;
        return {
            ...CostFields(),
            ...EffectField(),
            ...NotesFields(),
            school: new StringField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            )
        };
    }

    static migrateData (source) {
        migrateCostType(source);
        return super.migrateData(source);
    }
}