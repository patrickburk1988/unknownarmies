import { DescriptionField, EffectField, NotesFields } from "../shared-data.js";

export class UAItemData extends foundry.abstract.TypeDataModel
{
    static defineSchema() {
        return {
            ...DescriptionField(),
            ...EffectField(),
            ...NotesFields()
        };
    }
}