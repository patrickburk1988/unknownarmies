import { UACharacterData } from "./data/actor/character-data.mjs";

export class UAActor extends Actor
{
    async _preUpdate (changed, options, user) {
        switch (this.type) {
            case "cabal":
                await this._preUpdateCabal(changed, options);
                break;
            case "character":
                await this._preUpdateCharacter(changed, options);
                break;
            default:
                console.warn(`Unknown Armies | Skipped pre-update for unrecognized actor type \`${this.type}\`: ${this.name}`);
                break;
        }
        return super._preUpdate(changed, options, user);
    }

    async _preUpdateCabal (changed, options) {
    }

    async _preUpdateCharacter (changed, options) {
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
        if (foundry.utils.hasProperty(changed, "system.cabal")) {
            options.unknownarmies ??= {};
            options.unknownarmies.previousCabal = this.system.cabal;
        }
    }

    _onCreate (data, options, userId) {
        super._onCreate(data, options, userId);
        if (this.type === "character") {
            this._renderCabals(this.system.cabal);
        }
    }

    _onDelete (options, userId) {
        super._onDelete(options, userId);
        if (this.type === "character") {
            this._renderCabals(this.system.cabal);
        }
    }

    _onUpdate (changed, options, userId) {
        super._onUpdate(changed, options, userId);
        if (this.type === "character") {
            this._renderCabals(this.system.cabal, options.unknownarmies?.previousCabal);
        }
    }

    _renderCabals (...uuids) {
        for (const uuid of new Set(uuids)) {
            if (uuid) {
                fromUuidSync(uuid)?.render();
            }
        }
    }
}