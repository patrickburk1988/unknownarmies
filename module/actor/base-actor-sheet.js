export default class UABaseActorSheet extends ActorSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            dragDrop: [{
                dragSelector: ".item-list__item" // FIX
                // FIX dropSelector: null
            }],
            tabs: [{
                navSelector: ".tab-buttons",
                contentSelector: ".tab-panels",
                initial: "main"
            }],
            width: 800
        });
    }

    get template() {
        return "systems/unknownarmies/template/actor/" + (game.user.isGM || !this.actor.limited ? "" : "limited-") + this.constructor.name.replaceAll(/UA|Sheet/g, "").toLowerCase() + "-sheet.hbs";
    }

    async getData (options) {
        let data = await super.getData(options);
        data.items = this.actor.items.contents.sort((a, b) => a.sort - b.sort);
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
        html.find("[data-action='post-item']").on("click", this._onPostItem.bind(this));
        html.find("[data-action='edit-item']").on("click", this._onEditItem.bind(this));
        html.find("[data-action='destroy-item']").on("click", this._onDestroyItem.bind(this));
        html.find("[data-action='roll']").on("click contextmenu", this._onRoll.bind(this));
        html.find(".editor-content--extra-small").parent().addClass("editor--extra-small");
        html.find(".editor-content--small").parent().addClass("editor--small");
        html.find(".editor-content--large").parent().addClass("editor--large");
    }

    setPosition (position) {
        if ($(this.form).hasClass("main-form--limited")) {
            // MAYBE && position.width == 800 && position.height == 905
            position.width = 650;
            position.height = 600;
        }
        super.setPosition(position);
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
            type: type,
        }]).then(item => {
            item[0].sheet.render(true);
        });
    }

    _onPostItem (event) {
        // TODO Make sure this is all formatted correctly.
        let item = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));
        let content = `<div>`;
        content += `    <h3>${item.name}</h3>`;
        switch (item.type) {
            case "artifact":
                // TODO power charges description
                content += `    ${item.system.effect}`;
                break;
            case "identity":
                // TODO PERCENTAGE type isObsession hasExperience ofCourseICan substitutesFor ability attributes symbols taboos channels domain taboos generateCharge features details
                break;
            case "item":
                // TODO description
                content += `    ${item.system.effect}`;
                break;
            case "milestone":
                content += `    ${item.system.percentage}%`;
                break;
            case "ritual":
                // TODO cost action
                content += `    ${item.system.effect}`;
                break;
            case "spell":
                // TODO school cost
                content += `    ${item.system.effect}`;
        }
        content += `</div>`;
        ChatMessage.create({
            content: content
        });
    }

    _onEditItem (event) {
        this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id")).sheet.render(true);
    }

    _onDestroyItem (event) {
        let item = this.actor.items.get($(event.currentTarget).parents(".item-list__item").data("item-id"));
        Dialog.confirm({
            // TODO no render defaultYes rejectClose options
            // TODO buttons default close
            title: game.i18n.localize("UA.Delete" + item.type.charAt(0).toUpperCase() + item.type.slice(1)),
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
        let modifierString = modifier == 0 ? "" : (modifier > 0 ? " + " : " - ") + Math.abs(modifier) + `%`;
        let content = (typeof dataset["rollContentHeader"] !== "undefined") ? `<h4 class="subheader">${dataset["rollContentHeader"]}</h4>` : "";
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">${rollResult} <span class="vs">${vs}</span> ${rollTarget}</h4>`;
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
            flavor: dataset["rollLabel"] + modifierString,
            speaker: {
                actor: this.actor.id
            }
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