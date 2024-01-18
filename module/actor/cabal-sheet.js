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
        html.find("[data-action='roll']").on("click", this._onRoll.bind(this));
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
        this.actor.deleteEmbeddedDocuments("Item", [
            $(event.currentTarget).parents(".item-list__item").data("item-id")
        ]);
    }

    async _onRoll (event) {
        event.preventDefault();
        let dataset = event.currentTarget.dataset;
        let roll = new Roll("1d100");
        await roll.evaluate();
        let rollResult = parseInt(roll.result);
        let rollTarget = parseInt(dataset["rollTarget"]);
        let outcome = game.i18n.localize("UA." + (rollResult <= rollTarget ? "Success" : "Failure"));
        let vs = game.i18n.localize("UA.Vs");
        let content = "";
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
            flavor: dataset["rollLabel"]
        });
    }
}