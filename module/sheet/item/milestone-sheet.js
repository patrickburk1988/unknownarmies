import { UABaseItemSheet } from "./base-item-sheet.js";

export class UAMilestoneSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet",
                "sheet--milestone"
            ],
            width: 780 //FORNOW 650
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='roll']").on("click", this._onRoll.bind(this));
    }

    async getData (options) {
        const data = await super.getData(options);
        data.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {
            async: true
        });
        return data;
    }

    async _onRoll (event) {
        // HACK Re-examine below
        event.preventDefault();
        const dataset = event.currentTarget.dataset;
        const formula = dataset.rollFormula;
        const roll = await new Roll(formula).evaluate();
        const total = parseInt(roll.total);
        // TODO Return early if there is no actor owning it.
        console.log(this);
        console.log(this.actor);
        console.log(this.actor.system);
        const oldObjectivePercentage = this.actor.system.objective.percentage; //FIX What if it has no actor?
        await this.item.update({
            "system.percentage": total
        });
        let content = ``;
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">+${total}%</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">${formula}</span>`;
        content += `                        <span class="part-total">${total}</span>`;
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
            content: content,
            flavor: dataset.rollLabel
        });
    }
}