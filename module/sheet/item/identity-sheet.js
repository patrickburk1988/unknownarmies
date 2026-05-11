import { UABaseItemSheet } from "./base-item-sheet.js";
import { UAIdentityData }  from "../../data/item/identity-data.js"

export class UAIdentitySheet extends UABaseItemSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            height: 700, //TODO 707
            classes: [
                "sheet",
                "sheet--identity"
            ],
            width: 780 //FORNOW 800
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='improve']").on("click", this._onImprove.bind(this));
        html.find(".stats-features .editor").addClass([
            "pseudo-editors__editor",
            "stats-features__editor"
        ]);
    }

    async getData (options) {
        const data = await super.getData(options);
        // TODO Sort allFeatures, etc. to prevent non-English options from being out of order.
        const allFeatures = this.item.system.schema.fields.features?.fields?.one?.choices ?? {}; //MAYBE const allFeatures = UAIdentityData.optionsFeatures;
        const allowMMY = game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures");
        const allSupernaturalAbilities = this.item.system.schema.fields.supernatural?.fields?.ability?.choices ?? {};
        const type = this.item.system.type ?? "";
        if (type === "Adept" || type === "Avatar" || type === "Supernatural") {
            data.optionsFeaturesForType = UAIdentityData.optionsNonMundaneFeatures;
        } else if (allowMMY) {
            data.optionsFeaturesForType = allFeatures;
        } else {
            data.optionsFeaturesForType = Object.fromEntries(Object.entries(allFeatures).filter(([key]) => !UAIdentityData.optionsMMY.has(key)));
        }
        data.optionsSubstitutesFor = this.item.system.schema.fields.mundane?.fields?.substitutesFor?.choices ?? {};
        data.optionsSupernaturalAbility = allowMMY ? allSupernaturalAbilities : Object.fromEntries(Object.entries(allSupernaturalAbilities).filter(([key]) => !UAIdentityData.optionsMMY.has(key)));
        data.optionsType = this.item.system.schema.fields.type?.choices ?? {};
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
        data["enrichedChannel1-50"] = await TextEditor.enrichHTML(this.object.system.avatar.channels.first, {
            async: true
        });
        data["enrichedChannel51-70"] = await TextEditor.enrichHTML(this.object.system.avatar.channels.second, {
            async: true
        });
        data["enrichedChannel71-90"] = await TextEditor.enrichHTML(this.object.system.avatar.channels.third, {
            async: true
        });
        data["enrichedChannel91-98"] = await TextEditor.enrichHTML(this.object.system.avatar.channels.fourth, {
            async: true
        });
        data.enrichedChannel99 = await TextEditor.enrichHTML(this.object.system.avatar.channels.godwalker, {
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
        data.features = this.item.system.toObject().features;
        return data;
    }

    async _onImprove (event) {
        // HACK Re-examine below
        event.preventDefault();
        const roll = await new Roll("1d5").evaluate();
        const result = parseInt(roll.result);
        const oldPercentage = this.object.system.percentage;
        await this.item.update({
            "system.hasExperience": false,
            "system.percentage": oldPercentage + result
        });
        let content = ``;
        content += `<div class="dice-roll">`;
        content += `    <div class="dice-result">`;
        content += `        <h4 class="dice-total">+${result}%</h4>`;
        content += `        <div class="dice-tooltip">`;
        content += `            <section class="tooltip-part">`;
        content += `                <div class="dice">`;
        content += `                    <header class="part-header flexrow">`;
        content += `                        <span class="part-formula">1d5</span>`;
        content += `                        <span class="part-total">${result}</span>`;
        content += `                    </header>`;
        content += `                    <ol class="dice-rolls">`;
        content += `                        <li class="roll die d10">${result}</li>`;
        content += `                    </ol>`;
        content += `                </div>`;
        content += `            </section>`;
        content += `        </div>`;
        content += `        <div class="dice-formula">${game.i18n.localize("UA.IdentityImproved") + ": " + oldPercentage + '% <span class="arrow">▶</span> ' + this.item.system.percentage + "%"}</div>`;
        content += `    </div>`;
        content += `</div>`;
        roll.toMessage({
            content: content,
            flavor: event.currentTarget.dataset.rollLabel
        });
    }
}