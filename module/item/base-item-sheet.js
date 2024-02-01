export default class UABaseItemSheet extends ItemSheet
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            tabs: [{ // TODO Make sure this works with milestones.
                navSelector: ".tab-buttons",
                contentSelector: ".tab-panels",
                initial: "main"
            }]
        });
    }

    get template() {
        // TODO Make sure this works for milestones.
        return "systems/unknownarmies/template/item/" + (game.user.isGM || !this.actor.limited ? "" : "limited-") + this.constructor.name.replaceAll(/UA|Sheet/g, "").toLowerCase() + "-sheet.hbs";
    }

    async getData (options) {
        // TODO Make sure this works with milestones.
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
        html.find(".editor-content--extra-small").parent().addClass("editor--extra-small");
        html.find(".editor-content--medium").parent().addClass("editor--medium");
        html.find(".editor-content--extra-large").parent().addClass("editor--extra-large");
    }

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

    _onShowImage (event) {
        event.preventDefault();
        new ImagePopout(this.item.img, {
            title: this.item.name
        }).render(true);
    }
}