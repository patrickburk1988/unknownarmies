import { DescriptionField, NotesFields, PercentageField } from "../shared-data.js";

export class UAMilestoneData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            ...DescriptionField(),
            ...NotesFields(),
            ...PercentageField()
        };
    }
}