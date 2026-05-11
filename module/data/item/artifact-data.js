import { DescriptionField, EffectField, NotesFields } from "../shared-data.js";

export class UAArtifactData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;
        return {
            charges: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                amount: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                }),
                isEternal: new BooleanField(
                    // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                )
            }),
            ...DescriptionField(),
            ...EffectField(),
            ...NotesFields(),
            options: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                hideCharges: new BooleanField(
                    // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                )
            }),
            power: new StringField({
                // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                blank: true,
                choices: {
                    "Minor":       "UA.Minor",
                    "Significant": "UA.Significant",
                    "Major":       "UA.Major"
                }
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