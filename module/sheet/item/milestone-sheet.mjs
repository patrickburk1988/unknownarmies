import { postRoll } from "../../util/roll.mjs";
import { UABaseItemSheet } from "./base-item-sheet.mjs";

export class UAMilestoneSheet extends UABaseItemSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "default",
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
        event.preventDefault();
        const dataset = event.currentTarget.dataset;
        const formula = dataset.rollFormula;
        const roll = await new Roll(formula).evaluate();
        const total = roll.total;
        const actor = this.item.actor;
        const isActorCabal = actor?.type === "cabal";
        const oldObjectivePercentage = isActorCabal ? actor.system.objective.percentage : null;
        await this.item.update({
            "system.percentage": total
        });
        await postRoll(roll, {
            dice: roll.dice[0].results,
            faces: 10,
            footer: isActorCabal ? `${game.i18n.localize("UA.ObjectiveImproved")}: ${oldObjectivePercentage}% <span class="arrow">▶</span> ${actor.system.objective.percentage}%` : undefined,
            formula,
            result: `${total >= 0 ? "+" : ""}${total}%`,
            total
        }, {
            flavor: dataset.rollLabel,
            speaker: actor ? ChatMessage.getSpeaker({actor}) : undefined
        });
    }
}