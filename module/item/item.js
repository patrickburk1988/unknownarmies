export default class UAItem extends Item
{
    prepareDerivedData() {
        super.prepareDerivedData();
        switch (this.type) {
            case "artifact":
                this._prepareDerivedArtifactData(this);
                break;
            case "identity":
                this._prepareDerivedIdentityData(this);
                break;
            case "item":
                this._prepareDerivedItemData(this);
                break;
            case "ritual":
                this._prepareDerivedRitualData(this);
                break;
            case "spell":
                this._prepareDerivedSpellData(this);
        }
    }

    _prepareDerivedArtifactData (artifact) {
    }

    _prepareDerivedIdentityData (identity) {
        for (let featureKey of Object.keys(identity.system.features)) {
            let featureValue = identity.system.features[featureKey];
            if (identity.system.type !== "Mundane" && !(featureValue === "Casts Rituals" || featureValue === "Use Gutter Magick")) {
                identity.system.features[featureKey] = "";
            }
        }
    }

    _prepareDerivedItemData (item) {
    }

    _prepareDerivedRitualData (ritual) {
    }

    _prepareDerivedSpellData (spell) {
    }
}