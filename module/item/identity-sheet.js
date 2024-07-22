import UABaseItemSheet from "./base-item-sheet.js";
import UAUtils from "../utils.js";

export default class UAIdentitySheet extends UABaseItemSheet
{
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "unknownarmies",
                "sheet",
                "identity"
            ],
            height: 707,
            width: 800
        });
    }

    async getData (options) {
        let data = await super.getData(options);
        data.optionsType = UAUtils.optionsIdentityType;
        data.optionsSubstitutesFor = UAUtils.optionsIdentitySubstitutesFor;
        if (game.settings.get("unknownarmies", "IdentitiesAllowMM&YFeatures")) {
            data.optionsSupernaturalAbility = UAUtils.optionsIdentitySupernaturalAbilityMMY;
            data.optionsFeatures = UAUtils.optionsIdentityFeaturesMundaneMMY;
        } else {
            data.optionsSupernaturalAbility = UAUtils.optionsIdentitySupernaturalAbility;
            data.optionsFeatures = UAUtils.optionsIdentityFeaturesMundane;
        }
        data.optionsFeaturesNotMundane = UAUtils.optionsIdentityFeaturesNotMundane;
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
        return data;
    }

    activateListeners (html) {
        super.activateListeners(html);
        html.find("[data-action='improve']").on("click", this._onImprove.bind(this));
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