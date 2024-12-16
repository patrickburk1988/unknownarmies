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
        html.find("input").on("keydown", this._onInputKeydown.bind(this));                   // TODO
        let showImage = html.find("[data-action='show-image']");                             // TODO
        showImage.on("click", this._onShowImage.bind(this));                                 // TODO
        showImage.prop("disabled", false);                                                   // TODO
        html.find(".editor-content--extra-small").parent().addClass("editor--extra-small");  // TODO
        html.find(".editor-content--medium").parent().addClass("editor--medium");            // TODO
        html.find(".editor-content--extra-large").parent().addClass("editor--extra-large");  // TODO
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

    setPosition (position) {
        if ($(this.form).hasClass("main-form--limited")) {
            position.width = 650;
            position.height = 600;
        }
        super.setPosition(position);
    }

    _onInputKeydown (event) {                                            // TODO
        if (event.keyCode == 13) {                                       // TODO
            event.preventDefault();                                      // TODO
            super.submit();                                              // TODO
            $(event.currentTarget)[0].blur();                            // TODO
        }                                                                // TODO
    }                                                                    // TODO

    _onShowImage (event) {
        event.preventDefault();
        new ImagePopout(this.item.img, {
            title: this.item.name
        }).render(true);
    }
}