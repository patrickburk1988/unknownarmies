import { NotesFields, PercentageField } from "../shared-data.js";

export class UAIdentityData extends foundry.abstract.TypeDataModel
{
    static optionsMMY = new Set([ //MAYBE Move to sheet file?
        "Alter Fear",
        "Alter Noble",
        "Alter Rage",
        "Reads Fear",
        "Reads Noble",
        "Reads Obsession",
        "Reads Rage",
        "Terrorize Helplessness",
        "Terrorize Isolation",
        "Terrorize Self",
        "Terrorize Unnatural",
        "Terrorize Violence",
        "Totem"
    ]);
    static optionsMundaneFeatures = {
        "Casts Rituals":             "UA.CastsRituals",
        "Coerces Helplessness":      "UA.CoercesHelplessness",
        "Coerces Isolation":         "UA.CoercesIsolation",
        "Coerces Self":              "UA.CoercesSelf",
        "Coerces Unnatural":         "UA.CoercesUnnatural",
        "Coerces Violence":          "UA.CoercesViolence",
        "Cooperative":               "UA.Cooperative",
        "Evaluates Helplessness":    "UA.EvaluatesHelplessness",
        "Evaluates Isolation":       "UA.EvaluatesIsolation",
        "Evaluates Self":            "UA.EvaluatesSelf",
        "Evaluates Unnatural":       "UA.EvaluatesUnnatural",
        "Evaluates Violence":        "UA.EvaluatesViolence",
        "Medical":                   "UA.Medical",
        "Provides Firearm Attacks":  "UA.ProvidesFirearmAttacks",
        "Provides Initiative":       "UA.ProvidesInitiative",
        "Provides Wound Threshold":  "UA.ProvidesWoundThreshold",
        "Reads Fear":                "UA.ReadsFear",
        "Reads Noble":               "UA.ReadsNoble",
        "Reads Obsession":           "UA.ReadsObsession",
        "Reads Rage":                "UA.ReadsRage",
        "Resists Helplessness":      "UA.ResistsHelplessness",
        "Resists Isolation":         "UA.ResistsIsolation",
        "Resists Self":              "UA.ResistsSelf",
        "Resists Unnatural":         "UA.ResistsUnnatural",
        "Resists Violence":          "UA.ResistsViolence",
        "Sincere":                   "UA.Sincere",
        "Substitutes for Connect":   "UA.SubstitutesForConnect",
        "Substitutes for Dodge":     "UA.SubstitutesForDodge",
        "Substitutes for Fitness":   "UA.SubstitutesForFitness",
        "Substitutes for Knowledge": "UA.SubstitutesForKnowledge",
        "Substitutes for Lie":       "UA.SubstitutesForLie",
        "Substitutes for Notice":    "UA.SubstitutesForNotice",
        "Substitutes for Pursuit":   "UA.SubstitutesForPursuit",
        "Substitutes for Secrecy":   "UA.SubstitutesForSecrecy",
        "Substitutes for Status":    "UA.SubstitutesForStatus",
        "Substitutes for Struggle":  "UA.SubstitutesForStruggle",
        "Tactical":                  "UA.Tactical",
        "Therapeutic":               "UA.Therapeutic",
        "Totem":                     "UA.Totem",
        "Unique":                    "UA.Unique",
        "Use Gutter Magick":         "UA.UseGutterMagick",
        "Weaponized Physique":       "UA.WeaponizedPhysique"
    };
    static optionsNonMundaneFeatures = { //MAYBE Move to sheet file?
        "Casts Rituals":             "UA.CastsRituals",
        "Use Gutter Magick":         "UA.UseGutterMagick"
    };

    static defineSchema() {
        const { BooleanField, HTMLField, SchemaField, StringField } = foundry.data.fields;
        return {
            adept: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                domain: new HTMLField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ),
                generateCharge: new SchemaField({
                    // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    // FIX reorder?
                    major: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    ),
                    minor: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    ),
                    significant: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    )
                }),
                taboos: new HTMLField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                )
            }),
            avatar: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                attributes: new HTMLField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ),
                channels: new SchemaField({
                    // FIX Reorder?
                    // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    first: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    ),
                    fourth: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    ),
                    godwalker: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    ),
                    second: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    ),
                    third: new HTMLField(
                        // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    )
                }),
                symbols: new HTMLField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ),
                taboos: new HTMLField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ),
            }),
            details: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            features: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                one: new StringField({
                    // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    //FIX initial: ""
                    blank: true,
                    choices: UAIdentityData.optionsMundaneFeatures
                }),
                two: new StringField({
                    // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    //FIX initial: ""
                    blank: true,
                    choices: UAIdentityData.optionsMundaneFeatures
                })
            }),
            hasExperience: new BooleanField(
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            isObsession: new BooleanField(
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            mundane: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ofCourseICan: new HTMLField(
                    // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ),
                substitutesFor: new StringField({
                    // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    //FIX initial: ""
                    blank: true,
                    choices: {
                        "Connect":   "UA.Connect",
                        "Dodge":     "UA.Dodge",
                        "Fitness":   "UA.Fitness",
                        "Knowledge": "UA.Knowledge",
                        "Lie":       "UA.Lie",
                        "Notice":    "UA.Notice",
                        "Pursuit":   "UA.Pursuit",
                        "Secrecy":   "UA.Secrecy",
                        "Status":    "UA.Status",
                        "Struggle":  "UA.Struggle"
                    }
                })
            }),
            ...NotesFields(),
            ...PercentageField(),
            supernatural: new SchemaField({
                // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                ability: new StringField({
                    // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                    //FIX initial: ""
                    blank: true,
                    choices: {
                        "Alter Fear":             "UA.AlterFear",
                        "Alter Noble":            "UA.AlterNoble",
                        "Alter Rage":             "UA.AlterRage",
                        "Influence":              "UA.Influence",
                        "Specific Harm":          "UA.SpecificHarm",
                        "Specific Information":   "UA.SpecificInformation",
                        "Specific Protection":    "UA.SpecificProtection",
                        "Terrorize Helplessness": "UA.TerrorizeHelplessness",
                        "Terrorize Isolation":    "UA.TerrorizeIsolation",
                        "Terrorize Self":         "UA.TerrorizeSelf",
                        "Terrorize Unnatural":    "UA.TerrorizeUnnatural",
                        "Terrorize Violence":     "UA.TerrorizeViolence",
                        "Vague Harm":             "UA.VagueHarm",
                        "Vague Information":      "UA.VagueInformation",
                        "Vague Protection":       "UA.VagueProtection",
                        "Versatility":            "UA.Versatility"
                    }
                })
            }),
            type: new StringField({
                // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                //FIX initial: ""
                blank: true,
                choices: {
                    "Mundane":      "UA.Mundane",
                    "Supernatural": "UA.Supernatural",
                    "Avatar":       "UA.Avatar",
                    "Adept":        "UA.Adept"
                }
            })
        }
    }

    static migrateData (source) {
        const oldChannels = source.avatar?.channels;
        if (oldChannels && ["1-50", "51-70", "71-90", "91-98", "99-"].some(key => key in oldChannels)) {
            source.avatar.channels = {
                first:     oldChannels["1-50"]  ?? "",
                second:    oldChannels["51-70"] ?? "",
                third:     oldChannels["71-90"] ?? "",
                fourth:    oldChannels["91-98"] ?? "",
                godwalker: oldChannels["99-"]   ?? "",
            };
        }
        return super.migrateData(source);
    }
}