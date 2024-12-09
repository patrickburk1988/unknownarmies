import UABaseItemSheet from "./base-item-sheet.js";

export default class UAMilestoneSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 800,
            height: 123,
            classes: [
                "unknownarmies",
                "sheet",
                "milestone"
            ]
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='roll']").on("click", this._onRoll.bind(this));
    }

    async _onRoll (event) {
        event.preventDefault();
        const dataset = event.currentTarget.dataset;
        const formula = dataset["rollFormula"];
        const roll = await new Roll(formula).evaluate();
        const rollTotal = parseInt(roll.total);
        const oldObjectivePercentage = this.actor.system.objective.percentage;
        await this.item.update({
            "system.percentage": rollTotal
        });
        let content = ``;
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">+${rollTotal}%</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">${formula}</span>`;
        content += `                        <span class="part-total">${rollTotal}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        for (let die of roll.dice[0].results) {
            content += `                        <li class="roll die d10">${die.result}</li>`;
        }
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `        <div class="dice-formula">${game.i18n.localize("UA.ObjectiveImproved") + ": " + oldObjectivePercentage + '% <span class="arrow">▶</span> ' + this.actor.system.objective.percentage + "%"}</div>`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            flavor: dataset["rollLabel"],
            content: content
        });
    }
}