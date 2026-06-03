const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

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
            // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            amount: new NumberField({
                // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; initial?: any; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string; //TODO
                integer: true
            }),
            type: new StringField({
                // gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
                blank: true,
                choices: [
                    "major",
                    "minor",
                    "significant"
                ]
            })
        })
    };
}

export function DescriptionField() {
    return {
        description: new HTMLField(
            // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            // FIX required false, blank true, initial ""
        )
    };
}

export function EffectField() {
    return {
        effect: new HTMLField(
            // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
        )
    };
}

export function NotesFields() {
    return {
        notes: new SchemaField({
            // gmOnly?: boolean; hint?: string; initial?: any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            private: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            ),
            public: new HTMLField(
                // blank?:boolean; choices?:object|Function|string[]; gmOnly?:boolean; hint?:string; initial?:any; label?:string; nullable?:boolean; persisted?:boolean; placeholder?:string; readonly?:boolean; required?:boolean; textSearch?: boolean; trim?: boolean; validate?: DataFieldValidator; validationError?: string; //TODO
            )
        })
    };
}

export function PercentageField() {
    return {
        percentage: new NumberField({
            // choices?: object | Function | number[]; gmOnly?: boolean; hint?: string; label?: string; max?: number; min?: number; nullable?: boolean; persisted?: boolean; placeholder?: string; positive?: boolean; readonly?: boolean; required?: boolean; step?: number; validate?: DataFieldValidator; validationError?: string;
            initial: 0,
            integer: true
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