export default class UACharacterSheet extends ActorSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "character"
            ],
            dragDrop: [{
                dragSelector: ".item-list__item" // FIX
                // FIX dropSelector: null
            }],
            height: 905,
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
            return "systems/unknownarmies/template/actor/character-sheet.hbs";
        } else {
            return "systems/unknownarmies/template/actor/limited-character-sheet.hbs";
        }
    }

    async getData (options) {
        let data = await super.getData(options);
        data.cabals = game.actors.filter(actor => actor.type === "cabal" && actor.testUserPermission(game.user, "OBSERVER"));
        data.enrichedAppearance = await TextEditor.enrichHTML(this.object.system.appearance, {
            async: true
        });
        data.enrichedPersonality = await TextEditor.enrichHTML(this.object.system.personality, {
            async: true
        });
        data.enrichedBackground = await TextEditor.enrichHTML(this.object.system.background, {
            async: true
        });
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
        html.find("[data-action='open-cabal']").on("click", this._onOpenCabal.bind(this));
        html.find("[data-action='reset-failed-notches']").on("click", this._onResetFailedNotches.bind(this));
        html.find("[data-action='create-item']").on("click", this._onCreateItem.bind(this));
        html.find("[data-action='edit-item']").on("click", this._onEditItem.bind(this));
        html.find("[data-action='destroy-item']").on("click", this._onDestroyItem.bind(this));
        html.find("[data-action='roll']").on("click", this._onRoll.bind(this));
        html.find("[data-action='identity-levelup-roll']").on("click", this._identityLevelUpRoll.bind(this));
        html.find(".editor-content--small").parent().addClass("editor--small");
        html.find(".editor-content--large").parent().addClass("editor--large");
    }

    setPosition (position) {
        if ($(this.form).hasClass("main-form--limited") && position.width == 800 && position.height == 905) {
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

    _onOpenCabal (event) {
        game.actors.get(this.actor.system.cabal).sheet.render(true);
    }

    _onResetFailedNotches (event) {
        //Works not as intended. Will check later.
        this.actor.system.shockGauge[$(event.currentTarget).data("shock-meter")].notches.failed = 0;
        this.render(true);
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
        let outcome = "";
        switch (rollResult) {
            case 1:
                outcome = "Crit";
                break;
            case 100:
                outcome = "Fumble";
                break;
            default:
                if (rollResult > 10) {
                    let tensDigit = Math.floor(rollResult / 10);
                    if (tensDigit === rollResult - (tensDigit * 10)) {
                        outcome = "Matched ";
                    }
                }
                outcome += rollResult <= rollTarget ? "Success" : "Failure";
        }
        outcome = game.i18n.localize("UA." + outcome.replace(/\s/g, ""));
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
    
    async _identityLevelUpRoll(event){
        event.preventDefault();
        let dataset = event.currentTarget.dataset;
        
        let formula      = dataset["rollFormula"];
        let identityID   = dataset["rollLabel"];
        let roll         = new Roll(formula);
        await roll.evaluate();
        let rollTotal    = parseInt(roll.total);
        let percentTotal = Math.ceil(rollTotal / 2);
        let entry        = await this.object.items.get(identityID);

        let oldPercent = entry.system.percentage;
        let finalPercent = oldPercent + percentTotal;
        
        entry.update({
            "system.percentage": finalPercent,
            "system.hasExperience" : false
        });
        let roundedUp = game.i18n.localize("UA.RoundedUp");
        let content = "";
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">${oldPercent}% + ${percentTotal}% = ${finalPercent}%</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">1d10 / 2 <span class="vs">${roundedUp}</span></span>`;
        content += `                        <span class="part-total">${percentTotal}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        content += `                        <li class="roll die d10">${rollTotal}</li>`;
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: entry.name
        });
    }
}
