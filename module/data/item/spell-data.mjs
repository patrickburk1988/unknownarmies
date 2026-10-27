import { CostFields, EffectField, NotesFields, OptionsFields, migrateCostType } from "../shared-data.mjs";

export class UASpellData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { StringField } = foundry.data.fields;
        return {
            ...CostFields(),
            ...EffectField(),
            ...NotesFields(),
            ...OptionsFields(),
            school: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; textSearch?: boolean; validate?: DataFieldValidator; validationError?: string;
                initial: ""
            })
        };
    }

    static migrateData (source) {
        migrateCostType(source);
        return super.migrateData(source);
    }
}