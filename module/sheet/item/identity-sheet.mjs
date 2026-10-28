import { postRoll } from "../../util/roll.mjs";
import { UABaseItemSheet } from "./base-item-sheet.mjs";
import { UAIdentityData }  from "../../data/item/identity-data.mjs"

export class UAIdentitySheet extends UABaseItemSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            height: 700, //TEST 707
            classes: [
                "default",
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
        const allFeatures = UAIdentityData.optionsMundaneFeatures;
        const allowMMY = game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures");
        const allSupernaturalAbilities = this.item.system.schema.fields.supernatural.fields.ability.choices;
        const type = this.item.system.type;
        if (type === "Adept" || type === "Avatar" || type === "Supernatural") {
            data.optionsFeaturesForType = UAIdentityData.optionsNonMundaneFeatures;
        } else if (allowMMY) {
            data.optionsFeaturesForType = allFeatures;
        } else {
            data.optionsFeaturesForType = Object.fromEntries(Object.entries(allFeatures).filter(([key]) => !UAIdentityData.optionsMMY.has(key)));
        }
        data.optionsSubstitutesFor = this.item.system.schema.fields.mundane.fields.substitutesFor.choices;
        data.optionsSupernaturalAbility = allowMMY ? allSupernaturalAbilities : Object.fromEntries(Object.entries(allSupernaturalAbilities).filter(([key]) => !UAIdentityData.optionsMMY.has(key)));
        data.optionsType = this.item.system.schema.fields.type.choices;
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
        data.channels = await Promise.all(UAIdentityData.avatarChannels.map(async channel => ({
            ...channel,
            enriched: await TextEditor.enrichHTML(this.item.system.avatar.channels[channel.name], {
                async: true
            }),
            isUnlocked: this.item.system.percentage >= channel.percentage
        })));
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
        // MAYBE Return early if there is no actor owning it?
        event.preventDefault();
        const formula = "1d5";
        const roll = await new Roll(formula).evaluate();
        const total = parseInt(roll.result); //MAYBE roll.total
        const oldPercentage = this.object.system.percentage;
        await this.item.update({
            "system.hasExperience": false,
            "system.percentage": oldPercentage + total
        });
        await postRoll(roll, {
            dice: roll.dice[0].results,
            faces: 10,
            footer: `${game.i18n.localize("UA.IdentityImproved")}: ${oldPercentage}% <span class="arrow">▶</span> ${this.item.system.percentage}%`,
            formula,
            result: `${total >= 0 ? "+" : ""}${total}%`,
            total
        }, {
            flavor: event.currentTarget.dataset.rollLabel
        });
    }
}