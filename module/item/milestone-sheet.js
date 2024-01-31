export default class UAMilestoneSheet extends ItemSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "milestone"
            ],
            height: 123,
            template: "systems/unknownarmies/template/item/milestone-sheet.hbs",
            width: 800
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("input").on("keydown", this._onInputKeydown.bind(this));
        html.find("[data-action='roll']").on("click", this._onRoll.bind(this));
    }

    _onInputKeydown (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            super.submit();
            $(event.currentTarget)[0].blur();
        }
    }

    async _onRoll (event) {
        event.preventDefault();
        let dataset = event.currentTarget.dataset;
        let formula = dataset["rollFormula"];
        let roll = new Roll(formula);
        await roll.evaluate();
        let rollTotal = parseInt(roll.total);
        let oldMilestonePercentage = this.item.system.percentage;
        let oldObjectivePercentage = this.actor.system.objective.percentage - oldMilestonePercentage;
        let newObjectivePercentage = oldObjectivePercentage + rollTotal;
        let outcome = game.i18n.localize("UA.ObjectiveImproved") + ": " + oldObjectivePercentage + '% <span class="arrow">▶</span> ' + newObjectivePercentage + "%";
        this.item.update({
            "system.percentage": rollTotal
        });
        let content = "";
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
        content += `        <div class="dice-formula">${outcome}`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: dataset["rollLabel"]
        });
    }
}