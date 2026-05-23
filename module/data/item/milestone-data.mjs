import { DescriptionField, NotesFields, PercentageField } from "../shared-data.mjs";

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