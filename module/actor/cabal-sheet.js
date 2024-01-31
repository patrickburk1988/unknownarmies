export default class UACabalSheet extends ActorSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "cabal"
            ],
            height: 600,
            tabs: [{
                navSelector: ".tab-buttons",
                contentSelector: ".tab-panels",
                initial: "main"
            }],
            width: 800
        });
    }

    get template() {
        if (game.user.isGM || !this.actor.limited) {
            return "systems/unknownarmies/template/actor/cabal-sheet.hbs";
        } else {
            return "systems/unknownarmies/template/actor/limited-cabal-sheet.hbs";
        }
    }

    async getData (options) {
        let data = await super.getData(options);
        data.enrichedPublicNotes = await TextEditor.enrichHTML(this.object.system.notes.public, {
            async: true
        });
        data.enrichedPrivateNotes = await TextEditor.enrichHTML(this.object.system.notes.private, {
            async: true
        });
        return data;
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("input").on("keydown", this._onInputKeydown.bind(this));
        let showImage = html.find("[data-action='show-image']");
        showImage.on("click", this._onShowImage.bind(this));
        showImage.prop("disabled", false);
        html.find("[data-action='create-item']").on("click", this._onCreateItem.bind(this));
        html.find("[data-action='edit-item']").on("click", this._onEditItem.bind(this));
        html.find("[data-action='destroy-item']").on("click", this._onDestroyItem.bind(this));
        html.find("[data-action='roll']").on("click contextmenu", this._onRoll.bind(this));
        html.find(".editor-content--extra-small").parent().addClass("editor--extra-small");
    }

    _onInputKeydown (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            super.submit();
            $(event.currentTarget)[0].blur();
        }
    }

    _onShowImage (event) {
        event.preventDefault();
        new ImagePopout(this.actor.img, {
            title: this.actor.name
        }).render(true);
    }

    _onCreateItem (event) {
        let type = $(event.currentTarget).data("item-type");
        this.actor.createEmbeddedDocuments("Item", [{
            name: game.i18n.localize("UA.New" + type.charAt(0).toUpperCase() + type.slice(1)),
            type: type
        }]).then(item => {
            item[0].sheet.render(true);
        });
    }

    _onEditItem (event) {
        this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id")).sheet.render(true);
    }

    _onDestroyItem (event) {
        let item = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));
        let type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
        Dialog.confirm({
            // TODO no render defaultYes rejectClose options
            // TODO buttons default close
            title: game.i18n.localize("UA.Delete" + type),
            content: `<p>${game.i18n.format("UA.DeleteItem_Details", {
                name: item.name
            })}</p>`,
            yes: () => {
                this.actor.deleteEmbeddedDocuments("Item", [
                    item.id
                ]);
            }
        });
    }

    async _onRoll (event) {
        event.preventDefault();
        let modifier = 0;
        if (event.which == 3 || event.shiftKey || event.ctrlKey || event.altKey) {
            modifier = parseInt(await this._onModifyRoll());
            if (isNaN(modifier)) {
                return;
            }
        }
        let dataset = event.currentTarget.dataset;
        let roll = new Roll("1d100");
        await roll.evaluate();
        let rollResult = parseInt(roll.result);
        let vs = game.i18n.localize("UA.Vs");
        let rollTarget = parseInt(dataset["rollTarget"]) + modifier;
        let modifierString = modifier == 0 ? "" : ` <span class="roll-modifier">(` + (modifier > 0 ? "+" : "") + modifier + `%)</span>`;
        let rollType = dataset["rollType"];
        let outcome = "";
        switch (rollResult) {
            case 1:
                if (rollType != "objective") {
                    outcome = "Crit";
                    break;
                }
            case 100:
                if (rollType != "objective") {
                    outcome = "Fumble";
                    break;
                }
            default:
                if (rollType != "objective" && rollResult > 10) {
                    let tensDigit = Math.floor(rollResult / 10);
                    if (tensDigit === rollResult - (tensDigit * 10)) {
                        outcome = "Matched ";
                    }
                }
                outcome += rollResult <= rollTarget ? "Success" : "Failure";
        }
        outcome = game.i18n.localize("UA." + outcome.replace(/\s/g, ""));
        let content = "";
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">${rollResult} <span class="vs">${vs}</span> ${rollTarget}${modifierString}</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">1d100</span>`;
        content += `                        <span class="part-total">${rollResult}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        content += `                        <li class="roll die d100">${rollResult}</li>`;
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `        <div class="dice-formula">${outcome}</div>`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: dataset["rollLabel"]
        });
    }

    async _onModifyRoll () {
        let modifier = false;
        await Dialog.confirm({
            title: game.i18n.localize("UA.ModifyRoll"),
            content: `<p>${game.i18n.localize("UA.ModifyRoll_Details")}: <input type="number" style="max-width: 80px; text-align: center" data-dtype="Number" value="0" min="0" max="100">%</p>`,
            yes: (prompt) => {
                modifier = prompt.find("input")[0].value;
            }
        });
        return modifier;
    }
}