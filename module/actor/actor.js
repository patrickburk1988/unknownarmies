export default class UAActor extends Actor
{
    static shockGaugeSchema = {
        "helplessness": {
            "coerceWith": "connect",
            "resistWith": "status",
            "upbeatAbility": "fitness",
            "downbeatAbility": "dodge"
        },
        "isolation": {
            "coerceWith": "status",
            "resistWith": "connect",
            "upbeatAbility": "status",
            "downbeatAbility": "pursuit"
        },
        "self": {
            "coerceWith": "knowledge",
            "resistWith": "notice",
            "upbeatAbility": "knowledge",
            "downbeatAbility": "lie"
        },
        "unnatural": {
            "coerceWith": "secrecy",
            "resistWith": "knowledge",
            "upbeatAbility": "notice",
            "downbeatAbility": "secrecy"
        },
        "violence": {
            "coerceWith": "struggle",
            "resistWith": "fitness",
            "upbeatAbility": "connect",
            "downbeatAbility": "struggle"
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        switch (this.type) {
            case "character":
                this._prepareDerivedCharacterData(this);
                break;
            case "cabal":
                this._prepareDerivedCabalData(this);
        }
    }

    _prepareDerivedCharacterData (character) {
        character.system.abilities = {
            fitness: 0,
            dodge: 0,
            status: 0,
            pursuit: 0,
            knowledge: 0,
            lie: 0,
            notice: 0,
            secrecy: 0,
            connect: 0,
            struggle: 0
        }
        let totalHardenedNotches = 0;
        for (let shockMeterKey of Object.keys(character.system.shockGauge)) {
            let hardenedNotches = character.system.shockGauge[shockMeterKey].notches.hardened;
            totalHardenedNotches += parseInt(hardenedNotches);
            let hardenedNotchesx5 = hardenedNotches * 5;
            character.system.abilities[UAActor.shockGaugeSchema[shockMeterKey]["upbeatAbility"]] = 65 - hardenedNotchesx5;
            character.system.abilities[UAActor.shockGaugeSchema[shockMeterKey]["downbeatAbility"]] = 15 + hardenedNotchesx5;
        }
        character.system.isBurnedOut = totalHardenedNotches >= 25;
        let woundsRatio = character.system.wounds.suffered / character.system.wounds.threshold;
        character.system.wounds.severity = woundsRatio < 0.5 ? "" : woundsRatio < 0.75 ? "Injured" : woundsRatio < 0.9 ? "Badly Injured" : woundsRatio < 1 ? "Unconscious" : "Dead";
    }

    _prepareDerivedCabalData (cabal) {
    }
}