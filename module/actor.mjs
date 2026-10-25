import { UACharacterData } from "./data/actor/character-data.mjs";

export class UAActor extends Actor
{
    async _preUpdate (changed, options, user) {
        switch (this.type) {
            case "cabal":
                await this._preUpdateCabal(changed);
                break;
            case "character":
                await this._preUpdateCharacter(changed);
                break;
            default:
                console.warn(`Unknown Armies | Skipped pre-update for unrecognized actor type \`${this.type}\`: ${this.name}`);
                break;
        }
        return super._preUpdate(changed, options, user);
    }

    async _preUpdateCabal (changed) {
    }

    async _preUpdateCharacter (changed) {
        const shockGauge = foundry.utils.mergeObject(this.system.toObject().shockGauge, changed.system?.shockGauge ?? {});
        const totalHardenedNotches = Object.values(shockGauge).reduce((total, shockMeter) => total + (shockMeter.notches.hardened ?? 0), 0);
        if (totalHardenedNotches >= UACharacterData.burnedOutThreshold) {
            foundry.utils.mergeObject(changed, {
                system: {
                    passions: {
                        rage:  { isUsed: false },
                        noble: { isUsed: false },
                        fear:  { isUsed: false }
                    }
                }
            });
        }
    }
}