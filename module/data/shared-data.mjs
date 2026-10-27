const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export const optionsCostTypePlural = {
    "minor":       "UA.MinorCharges",
    "significant": "UA.SignificantCharges",
    "major":       "UA.MajorCharges"
}
export const optionsCostTypeSingular = {
    "minor":       "UA.MinorCharge",
    "significant": "UA.SignificantCharge",
    "major":       "UA.MajorCharge"
}

export function CostFields() {
    return {
        cost: new SchemaField({
            //FORNOW hint?: string; label?: string; validate?: DataFieldValidator; validationError?: string;
            amount: new NumberField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
                initial: 0,
                integer: true,
                min: 0,
                nullable: false
            }),
            type: new StringField({
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string; textSearch?: boolean; 
                blank: true,
                choices: Object.keys(optionsCostTypeSingular),
                initial: ""
            })
        })
    };
}

export function DescriptionField() {
    return {
        description: new HTMLField(
            //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
        )
    };
}

export function EffectField() {
    return {
        effect: new HTMLField(
            //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
        )
    };
}

export function NotesFields() {
    return {
        notes: new SchemaField({
            //FORNOW label?: string; validate?: DataFieldValidator; validationError?: string;
            private: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            public: new HTMLField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            )
        })
    };
}

export function OptionsFields (extraFields = {}) {
    return {
        options: new SchemaField({
            //FORNOW label?: string; validate?: DataFieldValidator; validationError?: string;
            hideName: new BooleanField(
                //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            ),
            ...extraFields
        })
    }
}

export function PercentageField(options = {}) {
    return {
        percentage: new NumberField({
            //FORNOW hint?: string; label?: string; placeholder?: string; validate?: DataFieldValidator; validationError?: string;
            initial: 0,
            integer: true,
            max: 100,
            min: 0,
            nullable: false,
            ...options
        })
    };
}

export function migrateCostType (source) {
    const type = source.cost?.type;
    if (type) {
        const legacyMap = {
            "Major Charge":       "major",
            "Minor Charge":       "minor",
            "Significant Charge": "significant"
        }
        const newValue = legacyMap[type];
        if (newValue !== undefined) {
            source.cost.type = newValue;
        }
    }
    return source;
}