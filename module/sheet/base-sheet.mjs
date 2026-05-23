export const UABaseSheet = (BaseSheet) => class extends BaseSheet
{
    activateListeners (html) {
        // HACK Re-evaluate below
        super.activateListeners(html);
        if (this._focusTrapHandler) {
            document.removeEventListener("keydown", this._focusTrapHandler, true);
        }
        this._focusTrapHandler = e => { // Fixes tabbing away from an editor edit button.
            if (e.key !== "Tab" || (!this.element[0].contains(document.activeElement))) {
                return;
            }
            const focusable = $(this.element).find("[href], [tabindex]:not([tabindex='-1']), button, input, select, textarea").filter(":visible").toArray();
            const index = focusable.indexOf(document.activeElement);
            if (index === -1) {
                return;
            }
            e.preventDefault();
            e.stopImmediatePropagation(); // Silences all other handlers at every phase.
            if (e.shiftKey) {
                focusable[(index - 1 + focusable.length) % focusable.length].focus();
            } else {
                focusable[(index + 1) % focusable.length].focus();
            }
        };
        document.addEventListener("keydown", this._focusTrapHandler, true); // `true` is the capture flag which allows beating Foundry to the event.
        html.find("input").on("keydown", this._onInputKeydown.bind(this));
        html.find("option").addClass("option");
        const $showImage = this.element.find("[data-action='show-image']"); //MAYBE button class
        $showImage.on("click", this._onShowImage.bind(this));
        $showImage.prop("disabled", false);
        if (!this._hoveredCheckboxes) {
            this._hoveredCheckboxes = new Set();
        }
        html.find(".checkbox-input").each((_, el) => {
            const $checkbox = $(el);
            $checkbox.addClass("checkbox-input--no-transition");
            $checkbox.toggleClass("checkbox-input--checked", el.checked);
            $checkbox.toggleClass("checkbox-input--hovered", this._hoveredCheckboxes.has(el.name));
            el.offsetHeight; // Forces reflow and flushes the style.
            $checkbox.removeClass("checkbox-input--no-transition");
        });
        html.find(".checkbox-input").on("click", function (e) {
            const $checkbox = $(this);
            if ($checkbox.hasClass("checkbox-input--transitioning")) {
                return;
            }
            const willBeChecked = this.checked; // Captures before preventDefault() reverts it.
            e.preventDefault(); // Defers Foundry's re-render.
            $checkbox.addClass("checkbox-input--transitioning");
            $checkbox.toggleClass("checkbox-input--checked", willBeChecked);
            setTimeout(() => {
                $checkbox.removeClass("checkbox-input--transitioning");
                this.checked = willBeChecked;
                $checkbox.trigger("change"); // Foundry's _onChangeInput() detects this.
            }, 300); //MAYBE TRANSITION_MS
        }).on("mouseenter", (e) => {
            this._hoveredCheckboxes.add(e.currentTarget.name);
            $(e.currentTarget).addClass("checkbox-input--hovered");
            // $(this).addClass("checkbox-input--hovered");
        }).on("mouseleave", (e) => {
            this._hoveredCheckboxes.delete(e.currentTarget.name);
            $(e.currentTarget).removeClass("checkbox-input--hovered");
            // $(this).removeClass("checkbox-input--hovered");
        });
        html.find(".editor-edit").addClass(["button", "button--enlarge"]).attr("tabindex", "0");
    }

    // FIX Required for tabbing away from editor buttons. "You'll also want to clean up that document listener when the sheet closes, otherwise it accumulates on every re-render. Override close:"
    async close (options) {
        if (this._focusTrapHandler) {
            document.removeEventListener("keydown", this._focusTrapHandler, true);
        }
        return super.close(options);
    }

    async getData (options) {
        const data = await super.getData(options);
        data.enrichedPublicNotes = await TextEditor.enrichHTML(this.object.system.notes.public, {
            async: true
        });
        data.enrichedPrivateNotes = await TextEditor.enrichHTML(this.object.system.notes.private, {
            async: true
        });
        return data;
    }

    _onInputKeydown (event) {
        // HACK Re-examine below
        if (event.keyCode == 13) {
            event.preventDefault();
            super.submit();
            $(event.currentTarget)[0].blur();
        }
    }

    _onShowImage (event) {
        // HACK Re-examine below
        event.preventDefault();
        new ImagePopout(this.document.img, {
            title: this.document.name
        }).render(true);
    }
}