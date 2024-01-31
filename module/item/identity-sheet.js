export default class UAIdentitySheet extends ItemSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "identity"
            ],
            height: 707,
            tabs: [{
                navSelector: ".tab-buttons",
                contentSelector: ".tab-panels",
                initial: "main"
            }],
            width: 800
        });
    }

    get template() {
        if (game.user.isGM || !this.item.limited) {
            return "systems/unknownarmies/template/item/identity-sheet.hbs";
        } else {
            return "systems/unknownarmies/template/item/limited-identity-sheet.hbs";
        }
    }

    async getData (options) {
        let data = await super.getData(options);
        data.enrichedOfCourseICan = await TextEditor.enrichHTML(this.object.system.mundane.ofCourseICan, {
            async: true
        });
        data.enrichedAttributes = await TextEditor.enrichHTML(this.object.system.avatar.attributes, {
            async: true
        });
        data.enrichedSymbols = await TextEditor.enrichHTML(this.object.system.avatar.symbols, {
            async: true
        });
        data.enrichedAvatarTaboos = await TextEditor.enrichHTML(this.object.system.avatar.taboos, {
            async: true
        });
        data["enrichedChannel1-50"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["1-50"], {
            async: true
        });
        data["enrichedChannel51-70"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["51-70"], {
            async: true
        });
        data["enrichedChannel71-90"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["71-90"], {
            async: true
        });
        data["enrichedChannel91-98"] = await TextEditor.enrichHTML(this.object.system.avatar.channels["91-98"], {
            async: true
        });
        data.enrichedChannel99 = await TextEditor.enrichHTML(this.object.system.avatar.channels["99-"], {
            async: true
        });
        data.enrichedDomain = await TextEditor.enrichHTML(this.object.system.adept.domain, {
            async: true
        });
        data.enrichedAdeptTaboos = await TextEditor.enrichHTML(this.object.system.adept.taboos, {
            async: true
        });
        data.enrichedGenerateMinorCharge = await TextEditor.enrichHTML(this.object.system.adept.generateCharge.minor, {
            async: true
        });
        data.enrichedGenerateSignificantCharge = await TextEditor.enrichHTML(this.object.system.adept.generateCharge.significant, {
            async: true
        });
        data.enrichedGenerateMajorCharge = await TextEditor.enrichHTML(this.object.system.adept.generateCharge.major, {
            async: true
        });
        data.enrichedDetails = await TextEditor.enrichHTML(this.object.system.details, {
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
        html.find("[data-action='improve']").on("click", this._onImprove.bind(this));
        html.find(".editor-content--medium").parent().addClass("editor--medium");
    }

    setPosition (position) {
        if ($(this.form).hasClass("main-form--limited") && position.width == 800 && position.height == 707) {
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
        new ImagePopout(this.item.img, {
            title: this.item.name
        }).render(true);
    }

    async _onImprove (event) {
        event.preventDefault();
        let roll = new Roll("1d5");
        await roll.evaluate();
        let rollResult = parseInt(roll.result);
        let oldPercentage = this.object.system.percentage;
        let newPercentage = oldPercentage + rollResult;
        let outcome = game.i18n.localize("UA.IdentityImproved") + ": " + oldPercentage + '% <span class="arrow">▶</span> ' + newPercentage + "%";
        this.item.update({
            "system.percentage": newPercentage,
            "system.hasExperience": false
        });
        let content = "";
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">+${rollResult}%</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">1d5</span>`;
        content += `                        <span class="part-total">${rollResult}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        content += `                        <li class="roll die d10">${rollResult}</li>`;
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `        <div class="dice-formula">${outcome}`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: event.currentTarget.dataset["rollLabel"]
        });
    }
}