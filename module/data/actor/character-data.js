import { NotesFields, PercentageField } from "../shared-data.js";

export class UACharacterData extends foundry.abstract.TypeDataModel
{
    static shockGaugeSchema = {
        "helplessness": {
            "coerceWith": "connect",
            "resistWith": "status",
            "upbeatAbility": "fitness",
            "downbeatAbility": "dodge"
        },
        "isolation": {
            "coerceWith": "status",
            "resistWith": "connect",
            "upbeatAbility": "status",
            "downbeatAbility": "pursuit"
        },
        "self": {
            "coerceWith": "knowledge",
            "resistWith": "notice",
            "upbeatAbility": "knowledge",
            "downbeatAbility": "lie"
        },
        "unnatural": {
            "coerceWith": "secrecy",
            "resistWith": "knowledge",
            "upbeatAbility": "notice",
            "downbeatAbility": "secrecy"
        },
        "violence": {
            "coerceWith": "struggle",
            "resistWith": "fitness",
            "upbeatAbility": "connect",
            "downbeatAbility": "struggle"
        }
    }

    static defineSchema() {
        const { BooleanField, DocumentUUIDField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;
        const passionSchema = (extraFields = {}) => new SchemaField({
            // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ...extraFields,
            isUsed: new BooleanField(
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            name: new StringField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                //FIX UNDEFINED
            )
        });
        const relationshipSchema = () => new SchemaField({
            // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            name: new StringField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                //FIX UNDEFINED
            ),
            ...PercentageField() //TODO 0
            // percentage: new NumberField({ //MAYBE Extend Percentage
            //     // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
            //     //FIX UNDEFINED
            // })
            // HACK
        });
        const shockMeterSchema = () => new SchemaField({
            // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            notches: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                failed: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                    //FIX UNDEFINED
                }),
                hardened: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    initial: 1,
                    integer: true
                })
            }),
            ongoingMadness: new StringField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                //FIX UNDEFINED
            )
        });
        return {
            appearance: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            background: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            cabal: new DocumentUUIDField({
                // embedded?: boolean; relative?: boolean; type?: string; //TODO
                //FIX UNDEFINED
            }),
            charges: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                minor: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                    //FIX UNDEFINED
                }),
                significant: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                    //FIX UNDEFINED
                }),
                major: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                    //FIX UNDEFINED
                })
            }),
            concept: new StringField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                //FIX UNDEFINED
            ),
            ...NotesFields(),
            obsession: new StringField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                //FIX UNDEFINED
            ),
            passions: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                rage: passionSchema(),
                noble: passionSchema(),
                fear: passionSchema({
                    shockMeter: new StringField({
                        // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                        // FIX UNDEFINED
                        blank: true,
                        choices: {
                            "Helplessness": "UA.Helplessness",
                            "Isolation":    "UA.Isolation",
                            "Self":         "UA.Self",
                            "Unnatural":    "UA.Unnatural",
                            "Violence":     "UA.Violence"
                        }
                    })
                })
            }),
            personality: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            relationships: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                protege: relationshipSchema(),
                favorite: relationshipSchema(),
                responsibility: relationshipSchema(),
                guru: relationshipSchema(),
                mentor: relationshipSchema()
            }),
            shockGauge: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                helplessness: shockMeterSchema(),
                isolation: shockMeterSchema(),
                self: shockMeterSchema(),
                unnatural: shockMeterSchema(),
                violence: shockMeterSchema()
            }),
            wounds: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                suffered: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                    //FIX UNDEFINED
                }),
                threshold: new NumberField({
                    // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                    integer: true
                    //FIX UNDEFINED
                })
            })
        };
    }

    prepareDerivedData() {
        this.abilities = { //MAYBE alphabetize?
            fitness: 0,
            dodge: 0,
            status: 0,
            pursuit: 0,
            knowledge: 0,
            lie: 0,
            notice: 0,
            secrecy: 0,
            connect: 0,
            struggle: 0
        }
        const shockMeters = this.shockGauge;
        let totalHardenedNotches = 0;
        for (let shockMeterKey of Object.keys(shockMeters)) {
            const hardenedNotches = shockMeters[shockMeterKey].notches.hardened;
            totalHardenedNotches += parseInt(hardenedNotches);
            const hardenedNotchesx5 = hardenedNotches * 5;
            this.abilities[UACharacterData.shockGaugeSchema[shockMeterKey]["upbeatAbility"]] = 65 - hardenedNotchesx5;
            this.abilities[UACharacterData.shockGaugeSchema[shockMeterKey]["downbeatAbility"]] = 15 + hardenedNotchesx5;
        }
        this.isBurnedOut = totalHardenedNotches >= 25;
        const woundsRatio = this.wounds.suffered / this.wounds.threshold;
        this.wounds.severity = woundsRatio < 0.5 ? "" : woundsRatio < 0.75 ? "Injured" : woundsRatio < 0.9 ? "Badly Injured" : woundsRatio < 1 ? "Unconscious" : "Dead"; //MAYBE Make better
    }
}