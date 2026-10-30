import { NotesFields, OptionsFields, PercentageField } from "../shared-data.mjs";

export class UAIdentityData extends foundry.abstract.TypeDataModel
{
    get featureList() {
        const leadingFeatures = [];
        const features = Object.values(this.features).map(feature => UAIdentityData.optionsMundaneFeatures[feature]).filter(Boolean);
        switch (this.type) {
            case "":
                break;
            case "Adept":
                break;
            case "Avatar":
                for (const channel of UAIdentityData.avatarChannels) {
                    if (this.percentage >= channel.percentage && this.avatar.channels[channel.name] !== "") {
                        leadingFeatures.push(channel.label);
                    }
                }
                break;
            case "Mundane":
                const substitutesFor = this.mundane.substitutesFor;
                if (substitutesFor) {
                    features.push(UAIdentityData.optionsMundaneFeatures["Substitutes for " + substitutesFor]);
                }
                break;
            case "Supernatural":
                const ability = this.supernatural.ability;
                if (ability) {
                    leadingFeatures.push(this.schema.fields.supernatural.fields.ability.choices[ability]);
                }
                break;
            default:
                throw new Error(`Unknown Armies | Invalid identity type: ${this.type}`);
        }
        const collator = new Intl.Collator(game.i18n.lang);
        features.sort((a, b) => collator.compare(game.i18n.localize(a), game.i18n.localize(b)));
        return [...leadingFeatures, ...features];
    }

    static avatarChannels = [
        { label: "UA.Channel1-50%",  name: "first",     percentage: 1  },
        { label: "UA.Channel51-70%", name: "second",    percentage: 51 },
        { label: "UA.Channel71-90%", name: "third",     percentage: 71 },
        { label: "UA.Channel91-98%", name: "fourth",    percentage: 91 },
        { label: "UA.Channel99%",    name: "godwalker", percentage: 99 }
    ];
    static optionsMMY = new Set([
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
    static optionsNonMundaneFeatures = {
        "Casts Rituals":     "UA.CastsRituals",
        "Use Gutter Magick": "UA.UseGutterMagick"
    };

    static defineSchema() {
        const { BooleanField, HTMLField, SchemaField, StringField } = foundry.data.fields;
        return {
            adept: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                domain: new HTMLField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                ),
                generateCharge: new SchemaField({
                    //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                    //FORNOW Reorder? Order doesn't matter anywhere, though.
                    major: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    ),
                    minor: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    ),
                    significant: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    )
                }),
                taboos: new HTMLField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                )
            }),
            avatar: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                attributes: new HTMLField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                ),
                channels: new SchemaField({
                    //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                    //FORNOW Reorder? Order doesn't matter anywhere, though.
                    first: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    ),
                    fourth: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    ),
                    godwalker: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    ),
                    second: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    ),
                    third: new HTMLField(
                        //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                    )
                }),
                symbols: new HTMLField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                ),
                taboos: new HTMLField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                ),
            }),
            details: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            features: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                one: new StringField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch: true
                    blank: true,
                    choices: UAIdentityData.optionsMundaneFeatures,
                    initial: ""
                }),
                two: new StringField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch: true
                    blank: true,
                    choices: UAIdentityData.optionsMundaneFeatures,
                    initial: ""
                })
            }),
            hasExperience: new BooleanField(
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            isObsession: new BooleanField(
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            mundane: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                ofCourseICan: new HTMLField(
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                ),
                substitutesFor: new StringField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
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
                    },
                    initial: ""
                })
            }),
            ...NotesFields(),
            ...OptionsFields(),
            ...PercentageField(),
            supernatural: new SchemaField({
                //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
                ability: new StringField({
                    //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
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
                    },
                    initial: ""
                })
            }),
            type: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean;
                blank: true,
                choices: { //MAYBE reorder/alphabetize?
                    "Mundane":      "UA.Mundane",
                    "Supernatural": "UA.Supernatural",
                    "Avatar":       "UA.Avatar",
                    "Adept":        "UA.Adept"
                },
                initial: ""
            })
        }
    }

    static migrateData (source) {
        const oldChannels = source.avatar?.channels;
        if (oldChannels && ["1-50", "51-70", "71-90", "91-98", "99-"].some(key => key in oldChannels)) {
            source.avatar.channels = {
                first: oldChannels.first ?? oldChannels["1-50"] ?? "",
                second: oldChannels.second ?? oldChannels["51-70"] ?? "",
                third: oldChannels.third ?? oldChannels["71-90"] ?? "",
                fourth: oldChannels.fourth ?? oldChannels["91-98"] ?? "",
                godwalker: oldChannels.godwalker ?? oldChannels["99-"] ?? "",
            };
        }
        return super.migrateData(source);
    }
}