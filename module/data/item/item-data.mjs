import { DescriptionField, EffectField, NotesFields } from "../shared-data.mjs";

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