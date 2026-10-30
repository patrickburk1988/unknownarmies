export function computeRollOutcome (result, target, allowSpecialOutcomes = true) {
    let outcome = "";
    if (allowSpecialOutcomes) {
        if (result === 1) {
            return game.i18n.localize("UA.Crit");
        } else if (result === 100) {
            return game.i18n.localize("UA.Fumble");
        } else if (result > 10) {
            const tensDigit = Math.floor(result / 10);
            if (tensDigit === result - tensDigit * 10) {
                outcome = "Matched";
            }
        }
    }
    outcome += result <= target ? "Success" : "Failure";
    return game.i18n.localize("UA." + outcome);
}

export async function postRoll (roll, renderData, messageData) {
    const content = await foundry.applications.handlebars.renderTemplate("systems/unknownarmies/template/other/roll.hbs", renderData);
    return roll.toMessage({...messageData, content});
}