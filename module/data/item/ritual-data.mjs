import { CostFields, EffectField, NotesFields, OptionsFields, migrateCostType } from "../shared-data.mjs";

export class UARitualData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { HTMLField } = foundry.data.fields;
        return {
            action: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            ...CostFields(),
            ...EffectField(),
            ...NotesFields(),
            ...OptionsFields()
        };
    }

    static migrateData (source) {
        migrateCostType(source);
        return super.migrateData(source);
    }
}