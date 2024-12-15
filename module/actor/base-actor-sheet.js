// FIX use data-item-id data-roll-type

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
        html.find("input").on("keydown", this._onInputKeydown.bind(this));                   // TODO
        let showImage = html.find("[data-action='show-image']");                             // TODO
        showImage.on("click", this._onShowImage.bind(this));                                 // TODO
        showImage.prop("disabled", false);                                                   // TODO
        html.find("[data-action='create-item']").on("click", this._onCreateItem.bind(this));
        html.find("[data-action='post-item']").on("click", this._onPostItem.bind(this));
        html.find("[data-action='edit-item']").on("click", this._onEditItem.bind(this));
        html.find("[data-action='destroy-item']").on("click", this._onDestroyItem.bind(this));
        html.find("[data-action='roll']").on("click contextmenu", this._onRoll.bind(this));  // HACK Fix contextmenu
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

    setPosition (position) {                                             // TODO
        if ($(this.form).hasClass("main-form--limited")) {               // TODO
            // MAYBE && position.width == 800 && position.height == 905  // TODO
            position.width = 650;                                        // TODO
            position.height = 600;                                       // TODO
        }                                                                // TODO
        super.setPosition(position);                                     // TODO
    }                                                                    // TODO

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

    _onDestroyItem (event) {
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
        if (event.keyCode === 13) {                                      // TODO
            event.preventDefault();                                      // TODO
            super.submit();                                              // TODO
            $(event.currentTarget)[0].blur();                            // TODO
        }                                                                // TODO
    }                                                                    // TODO

    async _onModifyRoll () {                                             // TODO
        let modifier = false;                                            // TODO
        await Dialog.confirm({                                           // TODO
            title: game.i18n.localize("UA.ModifyRoll"),                  // TODO
            content: `<p>${game.i18n.localize("UA.ModifyRoll_Details")}: <input type="number" style="max-width: 80px; text-align: center" data-dtype="Number" value="0" min="0" max="100">%</p>`,                                            // TODO
            yes: (prompt) => {                                           // TODO
                modifier = prompt.find("input")[0].value;                // TODO
            }                                                            // TODO
        });                                                              // TODO
        return modifier;                                                 // TODO
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

    async _onRoll (event) {                                                    // TODO async
        // FIX use data-roll-label, data-roll-target
        event.preventDefault();
        let modifier = 0;                                                // TODO
        if (event.which == 3 || event.shiftKey || event.ctrlKey || event.altKey) {// TODO
            modifier = parseInt(await this._onModifyRoll());             // TODO
            if (isNaN(modifier)) {                                       // TODO
                return;                                                  // TODO
            }                                                            // TODO
        }                                                                // TODO
        let dataset = event.currentTarget.dataset;                       // TODO
        let roll = new Roll("1d100");                                    // TODO
        await roll.evaluate();                                           // TODO
        let rollResult = parseInt(roll.result);                          // TODO
        let vs = game.i18n.localize("UA.Vs");                            // TODO
        let rollTarget = parseInt(dataset["rollTarget"]) + modifier;     // TODO
        let rollType = dataset["rollType"];                              // TODO
        let outcome = "";                                                // TODO
        switch (rollResult) {                                            // TODO
            case 1:                                                      // TODO
                if (rollType != "objective") {                           // TODO
                    outcome = "Crit";                                    // TODO
                    break;                                               // TODO
                }                                                        // TODO
            case 100:                                                    // TODO
                if (rollType != "objective") {                           // TODO
                    outcome = "Fumble";                                  // TODO
                    break;                                               // TODO
                }                                                        // TODO
            default:                                                     // TODO
                if (rollType != "objective" && rollResult > 10) {        // TODO
                    let tensDigit = Math.floor(rollResult / 10);         // TODO
                    if (tensDigit === rollResult - (tensDigit * 10)) {   // TODO
                        outcome = "Matched ";                            // TODO
                    }                                                    // TODO
                }                                                        // TODO
                outcome += rollResult <= rollTarget ? "Success" : "Failure";// TODO
        }                                                                // TODO
        outcome = game.i18n.localize("UA." + outcome.replace(/\s/g, ""));// TODO
        let modifierString = modifier == 0 ? "" : (modifier > 0 ? " + " : " - ") + Math.abs(modifier) + `%`;                                                // TODO
        let content = (typeof dataset["rollContentHeader"] !== "undefined") ? `<h4 class="subheader">${dataset["rollContentHeader"]}</h4>` : "";    // TODO
        content += `<div class="dice-roll">`;                            // TODO
        content += `    <div class="dice-result">`;                      // TODO
        content += `        <h4 class="dice-total">${rollResult} <span class="vs">${vs}</span> ${rollTarget}</h4>`;                                              // TODO
        content += `        <div class="dice-tooltip">`;                 // TODO
        content += `            <section class="tooltip-part">`;         // TODO
        content += `                <div class="dice">`;                 // TODO
        content += `                    <header class="part-header flexrow">`;// TODO
        content += `                        <span class="part-formula">1d100</span>`;// TODO
        content += `                        <span class="part-total">${rollResult}</span>`;// TODO
        content += `                    </header>`;                      // TODO
        content += `                    <ol class="dice-rolls">`;        // TODO
        content += `                        <li class="roll die d100">${rollResult}</li>`;// TODO
        content += `                    </ol>`;                          // TODO
        content += `                </div>`;                             // TODO
        content += `            </section>`;                             // TODO
        content += `        </div>`;                                     // TODO
        content += `        <div class="dice-formula">${outcome}</div>`; // TODO
        content += `    </div>`;                                         // TODO
        content += `</div>`;                                             // TODO
        roll.toMessage({                                                 // TODO
            content: content,                                            // TODO
            flavor: dataset["rollLabel"] + modifierString,               // TODO
            speaker: {                                                   // TODO
                actor: this.actor.id                                     // TODO
            }                                                            // TODO
        });                                                              // TODO
    }                                                                    // TODO

    _onShowImage (event) {
        event.preventDefault();
        new ImagePopout(this.actor.img, {
            title: this.actor.name
        }).render(true);
    }
}