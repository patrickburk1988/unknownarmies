import { UABaseSheet } from "../base-sheet.js";
import { optionsCostTypePlural, optionsCostTypeSingular } from "../../data/shared-data.js"

export class UABaseItemSheet extends UABaseSheet(foundry.appv1.sheets.ItemSheet)
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // classes?: string[]; dragDrop: DragDropConfiguration[]; tabs?: TabsConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            height: 500, //FORNOW
            tabs: [{
                contentSelector: ".sheet__body",
                initial: "main",
                navSelector: ".sheet__navigation"
            }],
            width: 650 //FORNOW
        });
    }

    get template() {
        return `systems/unknownarmies/template/item/${game.user.isGM || !this.item.limited ? "" : "limited-"}${this.constructor.name.replace(/UA|Sheet/g, "").toLowerCase() + "-sheet.hbs"}`;
    }

    activateListeners (html) {
        super.activateListeners(html);
    }

    async getData (options) {
        const data = await super.getData(options);
        if (this.object.system.cost !== undefined) {
            data.optionsCostType = this.object.system.cost.amount === 1 ? optionsCostTypeSingular : optionsCostTypePlural;
        }
        return data;
    }

    setPosition (position) {
        // HACK Re-examine below
        if ($(this.form).hasClass("sheet__form--limited")) {
            position.width = 650;
            position.height = 600;
        }
        super.setPosition(position);
    }
}