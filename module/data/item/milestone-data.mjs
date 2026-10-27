import { DescriptionField, NotesFields, OptionsFields, PercentageField } from "../shared-data.mjs";

export class UAMilestoneData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            ...DescriptionField(),
            ...NotesFields(),
            ...OptionsFields(),
            ...PercentageField({
                min: -100
            })
        };
    }
}