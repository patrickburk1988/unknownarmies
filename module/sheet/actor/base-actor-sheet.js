import { UABaseSheet } from "../base-sheet.js";

export class UABaseActorSheet extends UABaseSheet(foundry.appv1.sheets.ActorSheet)
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // classes?: string[]; dragDrop: DragDropConfiguration[]; tabs?: TabsConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            dragDrop: [{
                dragSelector: ".item"
            }],
            width: 780, //FORNOW
            tabs: [{
                contentSelector: ".sheet__body",
                initial: "main",
                navSelector: ".sheet__navigation"
            }]
        });
    }

    get template() {
        return `systems/unknownarmies/template/actor/${game.user.isGM || !this.actor.limited ? "" : "limited-"}${this.constructor.name.replace(/UA|Sheet/g, "").toLowerCase() + "-sheet.hbs"}`;
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='create-item']").on("click", this._onCreateItem.bind(this));
        html.find("[data-action='roll']").on("click contextmenu", this._onRoll.bind(this));  // HACK Fix contextmenu
        new ContextMenu(html, "[data-action='manage-item']", [ //MAYBE classes, condition, group //TODOfixcontextmenu
            // classes?: string; group?: string; label: string; onClick?: ContextMenuCallback; visible?: boolean | ContextMenuCondition; //TODO // MAYBE Does name do anything? Is callback valid?
            {
                name: game.i18n.localize("UA.PostItem"),
                icon: `<i class="fas fa-message"></i>`,
                callback: element => this._onPostItem(element)
            },
            {
                name: game.i18n.localize("UA.EditItem"), //MAYBE Move to top?
                icon: `<i class="fas fa-edit"></i>`,
                callback: element => this._onEditItem(element)
            },
            {
                name: game.i18n.localize("UA.DeleteItem"),
                icon: `<i class="fas fa-trash"></i>`,
                callback: element => this._onDeleteItem(element)
            }
        ], {
            // closeOnSelect?: boolean; jQuery?: boolean; onClose?: ContextMenuCallback; onOpen?: ContextMenuCallback; relative?: "target" | "cursor"; //TODO
            eventName: "click", //MAYBE
            fixed: true //MAYBE
        });
    }

    setPosition (position) {
        // HACK Re-examine below
        if ($(this.form).hasClass("sheet__form--limited")) {
            position.width = 650;
            position.height = 600;
        }
        super.setPosition(position);
    }

    _onCreateItem (event) {
        // HACK Re-examine below
        const type = event.currentTarget.dataset.itemType;
        const maxSort = this.actor.items.filter(item => item.type === type).reduce((max, item) => Math.max(max, item.sort ?? 0), 0);
        this.actor.createEmbeddedDocuments("Item", [{
            name: game.i18n.localize("UA.New" + type.charAt(0).toUpperCase() + type.slice(1)),
            sort: maxSort + CONST.SORT_INTEGER_DENSITY,
            type: type
        }]).then(item => {
            item[0].sheet.render(true);
        });
    }

    _onDeleteItem (element) {
        // HACK Re-examine below
        const item = this.actor.items.get($(element).parents(".item").data("item-id")); //MAYBE element.dataset?.itemId
        Dialog.confirm({
            content: `<p>${game.i18n.format("UA.DeleteItem_Details", {
                name: item.name
            })}</p>`,
            title: game.i18n.localize("UA.Delete" + item.type.charAt(0).toUpperCase() + item.type.slice(1)),
            yes: () => {
                this.actor.deleteEmbeddedDocuments("Item", [
                    item.id
                ]);
            }
        });
    }

    _onEditItem (element) {
        // HACK Re-evaluate below
        this.actor.items.get($(element).parents(".item").data("item-id")).sheet.render(true); //MAYBE this.actor.items.get($(event.currentTarget).parents(".item").data("item-id")).sheet.render(true);
    }

    _onPostItem (element) {
        // HACK Re-evaluate below
        const item = this.actor.items.get($(element).parents(".item").data("item-id"));
        let content = `<div>`;
        content += `    <h3>${item.name}</h3>`;
        switch (item.type) {
            case "artifact": // TODO description power charges
                content += `    ${item.system.effect}`;
                break;
            case "identity": // TODO PERCENTAGE type isObsession hasExperience mundane supernatural avatar adept features details
                break;
            case "item": // TODO description
                content += `    ${item.system.effect}`;
                break;
            case "milestone":
                content += `    ${item.system.percentage}%`;
                break;
            case "ritual": // TODO cost action
                content += `    ${item.system.effect}`;
                break;
            case "spell": // TODO cost school
                content += `    ${item.system.effect}`;
                break;
            default:
                throw new Error("!!"); // TODO throw error
        }
        content += `</div>`;
        ChatMessage.create({
            content: content
        });
    }

    async _onRoll (event) {
        // HACK Re-evaluate below
        event.preventDefault();
        let shift = 0;
        if (event.which == 3 || event.altKey || event.ctrlKey || event.ShiftKey) {
            shift = parseInt(await this._onShiftRoll());
            if (isNaN(shift)) {                                          // TODO
                return;                                                  // TODO
            }
        }
        const dataset = event.currentTarget.dataset;
        const formula = dataset.rollFormula ?? "1d100";
        const roll = await new Roll(formula).evaluate();
        const result = parseInt(roll.result);
        const target = (parseInt(dataset.rollTarget) || 0) + parseInt(shift) || 0;
        const type = dataset.rollType;
        const isNotObjective = type != "objective";
        console.log(isNotObjective);
        let outcome = "";
        switch (result) {
            case 1:
                if (isNotObjective) {
                    outcome = "Crit";
                    break;
                }
            case 100:
                if (isNotObjective) {
                    outcome = "Fumble";
                    break;
                }
            default:
                if (isNotObjective && result > 10) {
                    const tensDigit = Math.floor(result / 10);
                    if (tensDigit == result - tensDigit * 10) {
                        outcome = "Matched";
                    }
                }
                outcome += result <= target ? "Success" : "Failure";
        }
        outcome = game.i18n.localize("UA." + outcome.replace(" ", "")); // MAYBE /\s/g
        let content = dataset.rollContentHeader !== undefined ? `<div>${dataset.rollContentHeader}</div>` : "";
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">${isNotObjective ? result : "+" + result + "%"}${target || target === 0 ? ` <span class="vs">` + game.i18n.localize("UA.Vs") + `</span> ` + target : ""}</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">${formula}</span>`;
        content += `                        <span class="part-total">${result}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        for (let die of roll.dice[0].results) {
            const faces = roll.dice[0].faces;
            content += `                        <li class="roll die d${faces == 100 ? 10 : faces}">${die.result}</li>`;
        }
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `        <div class="dice-formula">${outcome}</div>`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: dataset.rollLabel + (shift == 0 ? "" : (shift > 0 ? " + " : " - ") + Math.abs(shift) + "%"),
            speaker: {                                                   // TODO
                actor: this.actor.id                                     // TODO
            }
        });
    }

    async _onShiftRoll (event) {
        // HACK Re-examine below
        let modifier = false;
        await Dialog.confirm({
            content: `<p>${game.i18n.localize("UA.ShiftRoll_Details")}:</p>
            <input type="number" value="0" min="-100" max="100" step="10" data-dtype="Number" style="max-width: 80px; text-align: center">%`, //FIX
            title: game.i18n.localize("UA.ShiftRoll"),
            yes: html => {
                modifier = html.find("input")[0].value;
            }
        });
        return modifier;
    }
}