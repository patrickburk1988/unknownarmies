export class UAUtils
{
    static #scrollbarWidth = null;

    static get scrollbarWidth() {
        // MAYBE Integrate into onRenderActorSheet()?
        // Returns 0 for browsers with overlay scrollbars (e.g. macOS Safari/Chrome).
        if (this.#scrollbarWidth === null) {
            const el = document.createElement("div");
            el.style.cssText = "overflow: scroll; position: absolute; visibility: hidden;"
            document.body.appendChild(el);
            this.#scrollbarWidth = el.offsetWidth - el.clientWidth;
            el.remove();
        }
        return this.#scrollbarWidth;
    }
}