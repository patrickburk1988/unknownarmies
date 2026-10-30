import { NotesFields, OptionsFields, PercentageField } from "../shared-data.mjs";

export class UACharacterData extends foundry.abstract.TypeDataModel
{
    static burnedOutThreshold = 25;
    static shockGaugeSchema = {
        "helplessness": {
            "coerceWith":      "connect",
            "resistWith":      "status",
            "upbeatAbility":   "fitness",
            "downbeatAbility": "dodge"
        },
        "isolation": {
            "coerceWith":      "status",
            "resistWith":      "connect",
            "upbeatAbility":   "status",
            "downbeatAbility": "pursuit"
        },
        "self": {
            "coerceWith":      "knowledge",
            "resistWith":      "notice",
            "upbeatAbility":   "knowledge",
            "downbeatAbility": "lie"
        },
        "unnatural": {
            "coerceWith":      "secrecy",
            "resistWith":      "knowledge",
            "upbeatAbility":   "notice",
            "downbeatAbility": "secrecy"
        },
        "violence": {
            "coerceWith":      "struggle",
            "resistWith":      "fitness",
            "upbeatAbility":   "connect",
            "downbeatAbility": "struggle"
        }
    }
    static woundSeverities = [
        { label: "UA.Dead",         ratio: 1    },
        { label: "UA.Unconscious",  ratio: 0.9  },
        { label: "UA.BadlyInjured", ratio: 0.75 },
        { label: "UA.Injured",      ratio: 0.5  }
    ];

    static defineSchema() {
        const { BooleanField, DocumentUUIDField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;
        const passionSchema = (extraFields = {}) => new SchemaField({
            //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            isUsed: new BooleanField(
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            name: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                initial: ""
            }),
            ...extraFields
        });
        const relationshipSchema = () => new SchemaField({
            //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            name: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                initial: ""
            }),
            ...PercentageField()
        });
        const shockMeterSchema = () => new SchemaField({
            //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            notches: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                failed: new NumberField({
                    //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                    initial: 0,
                    integer: true,
                    max: 5,
                    min: 0,
                    nullable: false
                }),
                hardened: new NumberField({
                    //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                    initial: 1,
                    integer: true,
                    max: 9,
                    min: 1,
                    nullable: false
                })
            }),
            ongoingMadness: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                initial: ""
            })
        });
        return {
            appearance: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            background: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            cabal: new DocumentUUIDField({
                //FORNOW blank?: boolean; hint?: string; initial?: any; label?: string; nullable?: boolean; placeholder?: string; textSearch?: boolean; validate?: DataFieldValidator; validationError?: string
                embedded: false,
                type: "Actor"
            }),
            charges: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                minor: new NumberField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    initial: 0,
                    integer: true,
                    min: 0,
                    nullable: false
                }),
                significant: new NumberField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    initial: 0,
                    integer: true,
                    min: 0,
                    nullable: false
                }),
                major: new NumberField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    initial: 0,
                    integer: true,
                    min: 0,
                    nullable: false
                })
            }),
            concept: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                initial: ""
            }),
            ...NotesFields(),
            obsession: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean; 
                initial: ""
            }),
            ...OptionsFields(),
            passions: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                rage: passionSchema(),
                noble: passionSchema(),
                fear: passionSchema({
                    shockMeter: new StringField({
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                        blank: true,
                        choices: {
                            "Helplessness": "UA.Helplessness",
                            "Isolation":    "UA.Isolation",
                            "Self":         "UA.Self",
                            "Unnatural":    "UA.Unnatural",
                            "Violence":     "UA.Violence"
                        },
                        initial: ""
                    })
                })
            }),
            personality: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            relationships: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                protege: relationshipSchema(),
                favorite: relationshipSchema(),
                responsibility: relationshipSchema(),
                guru: relationshipSchema(),
                mentor: relationshipSchema()
            }),
            shockGauge: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                helplessness: shockMeterSchema(),
                isolation: shockMeterSchema(),
                self: shockMeterSchema(),
                unnatural: shockMeterSchema(),
                violence: shockMeterSchema()
            }),
            wounds: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                suffered: new NumberField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; gmOnly?: boolean; 
                    initial: 0,
                    integer: true,
                    min: 0,
                    nullable: false
                }),
                threshold: new NumberField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; max?: number; 
                    initial: 50,
                    integer: true,
                    min: 0,
                    nullable: false
                })
            })
        };
    }

    prepareDerivedData() {
        this.abilities = {
            connect: 0,
            dodge: 0,
            fitness: 0,
            knowledge: 0,
            lie: 0,
            notice: 0,
            pursuit: 0,
            secrecy: 0,
            status: 0,
            struggle: 0
        }
        const shockMeters = this.shockGauge;
        let totalHardenedNotches = 0;
        for (let shockMeterKey of Object.keys(shockMeters)) {
            const hardenedNotches = shockMeters[shockMeterKey].notches.hardened;
            totalHardenedNotches += hardenedNotches;
            const hardenedNotchesx5 = hardenedNotches * 5;
            this.abilities[UACharacterData.shockGaugeSchema[shockMeterKey]["upbeatAbility"]] = 65 - hardenedNotchesx5;
            this.abilities[UACharacterData.shockGaugeSchema[shockMeterKey]["downbeatAbility"]] = 15 + hardenedNotchesx5;
        }
        this.isBurnedOut = totalHardenedNotches >= UACharacterData.burnedOutThreshold;
        const suffered = this.wounds.suffered;
        const woundsRatio = suffered === 0 ? 0 : suffered / this.wounds.threshold;
        this.wounds.severity = UACharacterData.woundSeverities.find(severity => woundsRatio >= severity.ratio)?.label ?? "";
    }
}