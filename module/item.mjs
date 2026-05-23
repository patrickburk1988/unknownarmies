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
                throw new Error(`Unknown Armies | Invalid item type: ${this}`);
        }
        await super._preUpdate(changed, options, user);
    }

    async _preUpdateArtifact (changed) {
    }

    async _preUpdateIdentity (changed) {
        // HACK Re-examine below
        const newType = changed.system?.type;
        if (!newType || newType === this.system.type) {
            return;
        }
        const featureUpdates = {};
        for (const [key, value] of Object.entries(this.system.features)) {
            if (!value) {
                continue;
            }
            const isMagickFeature = value === "Cast Rituals" || value === "Use Gutter Magick";
            const isMMYFeature = value === "Totem" || value.includes("Alter") || value.includes("Read") || value.includes("Terrorize");
            if ((newType !== "Mundane" && !isMagickFeature) || game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures") && !isMMYFeature) {
                featureUpdates[key] = "";
            }
        }
        if (Object.keys(featureUpdates).length > 0) {
            foundry.utils.mergeObject(changed, {
                system: {
                    features: featureUpdates
                }
            });
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