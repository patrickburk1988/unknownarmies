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
                throw new Error(`Unknown Armies | Invalid actor type: ${this}`); //TODO make sure this doesn't stop the game
        }
        await super._preUpdate(changed, options, user);
    }

    async _preUpdateCabal (changed) {
    }

    async _preUpdateCharacter (changed) {
        // HACK Re-examine below
        let willBeBurnedOut;
        if (!changed?.system?.shockGauge) {
            willBeBurnedOut = this.system.isBurnedOut;
        } else {
            let totalHardenedNotches = 0;
            for (let key of Object.keys(this.system.shockGauge)) {
                totalHardenedNotches += parseInt(changed.system.shockGauge[key]?.notches?.hardened ?? this.system.shockGauge[key].notches.hardened);
            }
            willBeBurnedOut = totalHardenedNotches >= 25;
        }
        if (willBeBurnedOut) {
            foundry.utils.mergeObject(changed, {
                system: {
                    passions: {
                        rage:   { isUsed: false },
                        noble:  { isUsed: false },
                        fear:   { isUsed: false }
                    }
                }
            });
        }
    }
}