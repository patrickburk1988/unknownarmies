import { UAIdentityData } from "./data/item/identity-data.mjs";

export class UAItem extends Item
{
    async _preUpdate (changed, options, user) {
        switch (this.type) {
            case "artifact":
                await this._preUpdateArtifact(changed);
                break;
            case "identity":
                await this._preUpdateIdentity(changed); 
                break;
            case "item":
                await this._preUpdateItem(changed);
                break;
            case "milestone":
                await this._preUpdateMilestone(changed);
                break;
            case "ritual":
                await this._preUpdateRitual(changed);
                break;
            case "spell":
                await this._preUpdateSpell(changed);
                break;
            default:
                console.warn(`Unknown Armies | Skipped pre-update for unrecognized item type \`${this.type}\`: ${this.name}`);
                break;
        }
        return super._preUpdate(changed, options, user);
    }

    async _preUpdateArtifact (changed) {
    }

    async _preUpdateIdentity (changed) {
        const newType = changed.system?.type;
        if (!newType || newType === this.system.type) {
            return;
        }
        const allowMMYFeatures = game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures");
        const features = foundry.utils.mergeObject(this.system.toObject().features, changed.system.features ?? {});
        for (const [key, value] of Object.entries(features)) {
            if (value && !isAllowed(value)) {
                foundry.utils.setProperty(changed, `system.features.${key}`, "");
            }
        }
        function isAllowed (feature) {
            return newType === "Mundane" ? allowMMYFeatures || !UAIdentityData.optionsMMY.has(feature) : feature in UAIdentityData.optionsNonMundaneFeatures;
        }
    }

    async _preUpdateItem (changed) {
    }

    async _preUpdateMilestone (changed) {
    }

    async _preUpdateRitual (changed) {
    }

    async _preUpdateSpell (changed) {
    }
}