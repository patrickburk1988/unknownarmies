export default class UABaseActorSheet extends ActorSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            dragDrop: [{
                dragSelector: ".item-list__item"
            }],
            tabs: [{
                navSelector: ".tab-buttons",
                contentSelector: ".tab-panels",
                initial: "main"
            }],
            width: 800                                                   // TODO
        });
    }

    get template() {
        return "systems/unknownarmies/template/actor/" + (game.user.isGM || !this.actor.limited ? "" : "limited-") + this.constructor.name.replaceAll(/UA|Sheet/g, "").toLowerCase() + "-sheet.hbs";
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='create-item']").on("click", this._onCreateItem.bind(this));
        html.find("[data-action='delete-item']").on("click", this._onDeleteItem.bind(this));
        html.find("[data-action='edit-item']").on("click", this._onEditItem.bind(this));
        html.find("[data-action='post-item']").on("click", this._onPostItem.bind(this));
        html.find("[data-action='roll']").on("click contextmenu", this._onRoll.bind(this));  // HACK Fix contextmenu
        html.find("input").on("keydown", this._onInputKeydown.bind(this));                   // TODO
        let showImage = html.find("[data-action='show-image']");                             // TODO
        showImage.on("click", this._onShowImage.bind(this));                                 // TODO
        showImage.prop("disabled", false);                                                   // TODO
        html.find(".editor-content--extra-small").parent().addClass("editor--extra-small");  // TODO
        html.find(".editor-content--small").parent().addClass("editor--small");              // TODO
        html.find(".editor-content--large").parent().addClass("editor--large");              // TODO
    }

    async getData (options) {
        const data = await super.getData(options);
        data.items = this.actor.items.contents.sort((a, b) => a.sort - b.sort);           // TODO
        data.enrichedPublicNotes = await TextEditor.enrichHTML(this.object.system.notes.public, {
            async: true
        });
        data.enrichedPrivateNotes = await TextEditor.enrichHTML(this.object.system.notes.private, {
            async: true
        });
        return data;
    }

    setPosition (position) {
        if ($(this.form).hasClass("main-form--limited")) {
            position.width = 650;
            position.height = 600;
        }
        super.setPosition(position);
    }

    _onCreateItem (event) {
        // FIX Use data-item-type
        let type = $(event.currentTarget).data("item-type");             // TODO
        this.actor.createEmbeddedDocuments("Item", [{                    // TODO
            name: game.i18n.localize("UA.New" + type.charAt(0).toUpperCase() + type.slice(1)),// TODO
            type: type,                                                  // TODO
        }]).then(item => {                                               // TODO
            item[0].sheet.render(true);                                  // TODO
        });                                                              // TODO
    }

    _onDeleteItem (event) {
        let item = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));                                                    // TODO
        Dialog.confirm({                                                 // TODO
            // TODO no render defaultYes rejectClose options             // TODO
            // TODO buttons default close                                // TODO
            title: game.i18n.localize("UA.Delete" + item.type.charAt(0).toUpperCase() + item.type.slice(1)),                                                   // TODO
            content: `<p>${game.i18n.format("UA.DeleteItem_Details", {   // TODO
                name: item.name                                          // TODO
            })}</p>`,                                                    // TODO
            yes: () => {                                                 // TODO
                this.actor.deleteEmbeddedDocuments("Item", [             // TODO
                    item.id                                              // TODO
                ]);                                                      // TODO
            }                                                            // TODO
        });                                                              // TODO
    }

    _onEditItem (event) {
        this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id")).sheet.render(true);                                              // TODO
    }

    _onInputKeydown (event) {                                            // TODO
        if (event.keyCode == 13) {                                       // TODO
            event.preventDefault();                                      // TODO
            super.submit();                                              // TODO
            $(event.currentTarget)[0].blur();                            // TODO
        }                                                                // TODO
    }                                                                    // TODO

    _onPostItem (event) {
        let item = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));                                                    // TODO
        let content = `<div>`;                                           // TODO
        content += `    <h3>${item.name}</h3>`;                          // TODO
        switch (item.type) {                                             // TODO
            case "artifact":                                             // TODO
                // TODO power charges description                        // TODO
                content += `    ${item.system.effect}`;                  // TODO
                break;                                                   // TODO
            case "identity":                                             // TODO
                // TODO PERCENTAGE type isObsession hasExperience ofCourseICan substitutesFor ability attributes symbols taboos channels domain taboos generateCharge features details                                                  // TODO
                break;                                                   // TODO
            case "item":                                                 // TODO
                // TODO description                                      // TODO
                content += `    ${item.system.effect}`;                  // TODO
                break;                                                   // TODO
            case "milestone":                                            // TODO
                content += `    ${item.system.percentage}%`;             // TODO
                break;                                                   // TODO
            case "ritual":                                               // TODO
                // TODO cost action                                      // TODO
                content += `    ${item.system.effect}`;                  // TODO
                break;                                                   // TODO
            case "spell":                                                // TODO
                // TODO school cost                                      // TODO
                content += `    ${item.system.effect}`;                  // TODO
        }                                                                // TODO
        content += `</div>`;                                             // TODO
        ChatMessage.create({                                             // TODO
            content: content                                             // TODO
        });                                                              // TODO
    }                                                                    // TODO

    async _onRoll (event) {
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
        let outcome = "";
        switch (result) {
            case 1:
                if (type != "objective") {
                    outcome = "Crit";
                    break;
                }
            case 100:
                if (type != "objective") {
                    outcome = "Fumble";
                    break;
                }
            default:
                if (type != "objective" && result > 10) {
                    const tensDigit = Math.floor(result / 10);
                    if (tensDigit == result - tensDigit * 10) {
                        outcome = "Matched";
                    }
                }
                outcome += result <= target ? "Success" : "Failure";
        }
        outcome = game.i18n.localize("UA." + outcome.replace(" ", "")); // MAYBE /\s/g
        let content = (typeof dataset["rollContentHeader"] !== "undefined") ? `<h4 class="subheader">${dataset["rollContentHeader"]}</h4>` : "";    // TODO
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">${type != "objective" ? result : "+" + result + "%"}${target ? "" : ` <span class="vs">` + game.i18n.localize("UA.Vs") + `</span> ` + target}</h4>`;
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
        let modifier = false;
        await Dialog.confirm({
            content: `<p>${game.i18n.localize("UA.ShiftRoll_Details")}: <input type="number" value="0" min="-100" max="100" step="10" data-dtype="Number" style="max-width: 80px; text-align: center">%</p>`,                                  // TODO
            title: game.i18n.localize("UA.ShiftRoll"),
            yes: (dialog) => {
                modifier = dialog.find("input")[0].value; // MAYBE
            }
        });
        return modifier;
    }

    _onShowImage (event) {
        event.preventDefault();
        new ImagePopout(this.actor.img, {
            title: this.actor.name
        }).render(true);
    }
}