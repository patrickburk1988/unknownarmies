import { NotesFields, OptionsFields, PercentageField } from "../shared-data.mjs";

export class UACabalData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { SchemaField, StringField } = foundry.data.fields;
        return {
            ...NotesFields(),
            objective: new SchemaField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                name: new StringField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                    initial: ""
                }),
                ...PercentageField({
                    persisted: false
                }),
                scale: new StringField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                    blank: true,
                    choices: {
                        "Local":   "UA.Local",
                        "Weighty": "UA.Weighty",
                        "Cosmic":  "UA.Cosmic"
                    },
                    initial: ""
                })
            }),
            ...OptionsFields()
        };
    }

    prepareDerivedData() {
        let percentage = 0;
        for (const item of (this.parent?.items ?? [])) {
            if (item.type === "milestone") {
                percentage += item.system.percentage;
            }
        }
        this.objective.percentage = Math.clamp(percentage, 0, 100);
    }
}