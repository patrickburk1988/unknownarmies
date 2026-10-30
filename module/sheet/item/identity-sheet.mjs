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
        data.enrichedOfCourseICan = await this._enrich(this.object.system.mundane.ofCourseICan);
        data.enrichedAttributes = await this._enrich(this.object.system.avatar.attributes);
        data.enrichedSymbols = await this._enrich(this.object.system.avatar.symbols);
        data.enrichedAvatarTaboos = await this._enrich(this.object.system.avatar.taboos);
        data.channels = await Promise.all(UAIdentityData.avatarChannels.map(async channel => ({
            ...channel,
            enriched: await this._enrich(this.item.system.avatar.channels[channel.name]),
            isUnlocked: this.item.system.percentage >= channel.percentage
        })));
        data.enrichedDomain = await this._enrich(this.object.system.adept.domain);
        data.enrichedAdeptTaboos = await this._enrich(this.object.system.adept.taboos);
        data.enrichedGenerateMinorCharge = await this._enrich(this.object.system.adept.generateCharge.minor);
        data.enrichedGenerateSignificantCharge = await this._enrich(this.object.system.adept.generateCharge.significant);
        data.enrichedGenerateMajorCharge = await this._enrich(this.object.system.adept.generateCharge.major);
        data.enrichedDetails = await this._enrich(this.object.system.details);
        data.features = this.item.system.toObject().features;
        return data;
    }

    async _onImprove (event) {
        event.preventDefault();
        const formula = "1d5";
        const roll = await new Roll(formula).evaluate();
        const total = roll.total;
        const oldPercentage = this.item.system.percentage;
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
            flavor: event.currentTarget.dataset.rollLabel,
            speaker: this.item.actor ? ChatMessage.getSpeaker({actor: this.item.actor}) : undefined
        });
    }
}