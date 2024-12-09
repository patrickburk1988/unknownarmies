export default class UABaseItemSheet extends ItemSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            tabs: [{
                navSelector: ".tab-buttons",
                contentSelector: ".tab-panels",
                initial: "main"
            }]
        });
    }

    get template() {
        return "systems/unknownarmies/template/item/" + (game.user.isGM || !this.item.limited ? "" : "limited-") + this.constructor.name.replaceAll(/UA|Sheet/g, "").toLowerCase() + "-sheet.hbs";
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("input").on("keydown", this._onInputKeydown.bind(this));
        let showImage = html.find("[data-action='show-image']");
        showImage.on("click", this._onShowImage.bind(this));
        showImage.prop("disabled", false);
        html.find(".editor-content--extra-small").parent().addClass("editor--extra-small");
        html.find(".editor-content--medium").parent().addClass("editor--medium");
        html.find(".editor-content--extra-large").parent().addClass("editor--extra-large");
    }

    async getData (options) {
        const data = await super.getData(options);
        if (this.constructor.name != "UAMilestoneSheet") {
            data.enrichedPublicNotes = await TextEditor.enrichHTML(this.object.system.notes.public, {
                async: true
            });
            data.enrichedPrivateNotes = await TextEditor.enrichHTML(this.object.system.notes.private, {
                async: true
            });
        }
        return data;
    }

    _onShowImage (event) {
        event.preventDefault();
        new ImagePopout(this.item.img, {
            title: this.item.name
        }).render(true);
    }
    // FIX BELOW ---------------------------------------------------------------

    setPosition (position) {
        if ($(this.form).hasClass("main-form--limited")) {
            // MAYBE Move this to identity sheet?
            // MAYBE && position.width == 800 && position.height == 707
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
}