export default class UAUtils
{
    static optionsArtifactPower = {
        "":            "",
        "Minor":       "Minor",
        "Significant": "Significant",
        "Major":       "Major"
    }

    static optionsCabalObjectiveScale = {
        "":        "",
        "Local":   "Local",
        "Weighty": "Weighty",
        "Cosmic":  "Cosmic"
    }

    static optionsCharacterFearShockMeter = {
        "":             "",
        "Helplessness": "Helplessness",
        "Isolation":    "Isolation",
        "Self":         "Self",
        "Unnatural":    "Unnatural",
        "Violence":     "Violence"
    }

    static optionsIdentityType = {
        "":             "",
        "Mundane":      "Mundane",
        "Supernatural": "Supernatural",
        "Avatar":       "Avatar",
        "Adept":        "Adept"
    }

    static optionsIdentitySubstitutesFor = {
        "":          "",
        "Connect":   "Connect",
        "Dodge":     "Dodge",
        "Fitness":   "Fitness",
        "Knowledge": "Knowledge",
        "Lie":       "Lie",
        "Notice":    "Notice",
        "Pursuit":   "Pursuit",
        "Secrecy":   "Secrecy",
        "Status":    "Status",
        "Struggle":  "Struggle"
    }

    static optionsIdentitySupernaturalAbility = {
        "":                       "",
        "Influence":              "Influence",
        "Specific Harm":          "Specific Harm",
        "Specific Information":   "Specific Information",
        "Specific Protection":    "Specific Protection",
        "Vague Harm":             "Vague Harm",
        "Vague Information":      "Vague Information",
        "Vague Protection":       "Vague Protection",
        "Versatility":            "Versatility"
    }

    static optionsIdentitySupernaturalAbilityMMY = {
        "":                       "",
        "Alter Fear":             "Alter Fear",
        "Alter Noble":            "Alter Noble",
        "Alter Rage":             "Alter Rage",
        "Influence":              "Influence",
        "Specific Harm":          "Specific Harm",
        "Specific Information":   "Specific Information",
        "Specific Protection":    "Specific Protection",
        "Terrorize Helplessness": "Terrorize Helplessness",
        "Terrorize Isolation":    "Terrorize Isolation",
        "Terrorize Self":         "Terrorize Self",
        "Terrorize Unnatural":    "Terrorize Unnatural",
        "Terrorize Violence":     "Terrorize Violence",
        "Vague Harm":             "Vague Harm",
        "Vague Information":      "Vague Information",
        "Vague Protection":       "Vague Protection",
        "Versatility":            "Versatility"
    }

    static optionsIdentityFeaturesMundane = {
        "": "",
        "Casts Rituals":             "Casts Rituals",
        "Coerces Helplessness":      "Coerces Helplessness",
        "Coerces Isolation":         "Coerces Isolation",
        "Coerces Self":              "Coerces Self",
        "Coerces Unnatural":         "Coerces Unnatural",
        "Coerces Violence":          "Coerces Violence",
        "Cooperative":               "Cooperative",
        "Evaluates Helplessness":    "Evaluates Helplessness",
        "Evaluates Isolation":       "Evaluates Isolation",
        "Evaluates Self":            "Evaluates Self",
        "Evaluates Unnatural":       "Evaluates Unnatural",
        "Evaluates Violence":        "Evaluates Violence",
        "Medical":                   "Medical",
        "Provides Firearm Attacks":  "Provides Firearm Attacks",
        "Provides Initiative":       "Provides Initiative",
        "Provides Wound Threshold":  "Provides Wound Threshold",
        "Resists Helplessness":      "Resists Helplessness",
        "Resists Isolation":         "Resists Isolation",
        "Resists Self":              "Resists Self",
        "Resists Unnatural":         "Resists Unnatural",
        "Resists Violence":          "Resists Violence",
        "Sincere":                   "Sincere",
        "Substitutes for Connect":   "Substitutes for Connect",
        "Substitutes for Dodge":     "Substitutes for Dodge",
        "Substitutes for Fitness":   "Substitutes for Fitness",
        "Substitutes for Knowledge": "Substitutes for Knowledge",
        "Substitutes for Lie":       "Substitutes for Lie",
        "Substitutes for Notice":    "Substitutes for Notice",
        "Substitutes for Pursuit":   "Substitutes for Pursuit",
        "Substitutes for Secrecy":   "Substitutes for Secrecy",
        "Substitutes for Status":    "Substitutes for Status",
        "Substitutes for Struggle":  "Substitutes for Struggle",
        "Tactical":                  "Tactical",
        "Therapeutic":               "Therapeutic",
        "Unique":                    "Unique",
        "Use Gutter Magick":         "Use Gutter Magick",
        "Weaponized Physique":       "Weaponized Physique"
    }

    static optionsIdentityFeaturesMundaneMMY = {
        "": "",
        "Casts Rituals":             "Casts Rituals",
        "Coerces Helplessness":      "Coerces Helplessness",
        "Coerces Isolation":         "Coerces Isolation",
        "Coerces Self":              "Coerces Self",
        "Coerces Unnatural":         "Coerces Unnatural",
        "Coerces Violence":          "Coerces Violence",
        "Cooperative":               "Cooperative",
        "Evaluates Helplessness":    "Evaluates Helplessness",
        "Evaluates Isolation":       "Evaluates Isolation",
        "Evaluates Self":            "Evaluates Self",
        "Evaluates Unnatural":       "Evaluates Unnatural",
        "Evaluates Violence":        "Evaluates Violence",
        "Medical":                   "Medical",
        "Provides Firearm Attacks":  "Provides Firearm Attacks",
        "Provides Initiative":       "Provides Initiative",
        "Provides Wound Threshold":  "Provides Wound Threshold",
        "Reads Fear":                "Reads Fear",
        "Reads Noble":               "Reads Noble",
        "Reads Obsession":           "Reads Obsession",
        "Reads Rage":                "Reads Rage",
        "Resists Helplessness":      "Resists Helplessness",
        "Resists Isolation":         "Resists Isolation",
        "Resists Self":              "Resists Self",
        "Resists Unnatural":         "Resists Unnatural",
        "Resists Violence":          "Resists Violence",
        "Sincere":                   "Sincere",
        "Substitutes for Connect":   "Substitutes for Connect",
        "Substitutes for Dodge":     "Substitutes for Dodge",
        "Substitutes for Fitness":   "Substitutes for Fitness",
        "Substitutes for Knowledge": "Substitutes for Knowledge",
        "Substitutes for Lie":       "Substitutes for Lie",
        "Substitutes for Notice":    "Substitutes for Notice",
        "Substitutes for Pursuit":   "Substitutes for Pursuit",
        "Substitutes for Secrecy":   "Substitutes for Secrecy",
        "Substitutes for Status":    "Substitutes for Status",
        "Substitutes for Struggle":  "Substitutes for Struggle",
        "Tactical":                  "Tactical",
        "Therapeutic":               "Therapeutic",
        "Totem":                     "Totem",
        "Unique":                    "Unique",
        "Use Gutter Magick":         "Use Gutter Magick",
        "Weaponized Physique":       "Weaponized Physique"
    }

    static optionsIdentityFeaturesNotMundane = {
        "": "",
        "Casts Rituals":     "Casts Rituals",
        "Use Gutter Magick": "Use Gutter Magick"
    }

    static optionsRitualSpellCostTypePlural = {
        "": "",
        "Minor Charge":       "Minor Charges",
        "Significant Charge": "Significant Charges",
        "Major Charge":       "Major Charges"
    }

    static optionsRitualSpellCostTypeSingular = {
        "": "",
        "Minor Charge":       "Minor Charge",
        "Significant Charge": "Significant Charge",
        "Major Charge":       "Major Charge"
    }

    static get theme() {
        switch (game.settings.get("unknownarmies", "Sheet&UITheme")) {
            case 1:
                return "theme--blue";
            case 2:
                return "theme--green";
            case 3:
                return "theme--grey";
            case 4:
                return "theme--purple";
            case 5:
                return "theme--red";
            default:
                return "";
        }
    }
}