import { NotesFields, PercentageField } from "../shared-data.js";

export class UACabalData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        const { SchemaField, StringField } = foundry.data.fields;
        return {
            ...NotesFields(),
            objective: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                name: new StringField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    //FIX UNDEFINED
                ),
                ...PercentageField(), //TODO 0
                scale: new StringField({
                    // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    //FIX UNDEFINED
                    blank: true,
                    choices: {
                        "Local":   "UA.Local",
                        "Weighty": "UA.Weighty",
                        "Cosmic":  "UA.Cosmic"
                    }
                })
            })
        };
    }

    prepareDerivedData() {
        this.objective.percentage = 0;
        for (const item of (this.parent?.items ?? [])) {
            if (item.type === "milestone") {
                this.objective.percentage += item.system.percentage ?? 0;
            }
        }
    }
}