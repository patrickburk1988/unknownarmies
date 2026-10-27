import { DescriptionField, EffectField, NotesFields, OptionsFields } from "../shared-data.mjs";

export class UAArtifactData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;
        return {
            charges: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                amount: new NumberField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    initial: 0, //MAYBE
                    integer: true,
                    min: 0,
                    nullable: false
                }),
                isEternal: new BooleanField(
                    //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                )
            }),
            ...DescriptionField(),
            ...EffectField(),
            ...NotesFields(),
            ...OptionsFields({
                hideCharges: new BooleanField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; initial?: any; 
                )
            }),
            power: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                blank: true,
                choices: {
                    "Minor":       "UA.Minor",
                    "Significant": "UA.Significant",
                    "Major":       "UA.Major"
                },
                initial: ""
            })
        };
    }

    static migrateData (source) {
        if (source.charges?.isHidden !== undefined) {
            source.options ??= {};
            source.options.hideCharges = source.charges.isHidden;
            delete source.charges.isHidden;
        }
        return super.migrateData(source);
    }
}