import { UABaseActorSheet } from "./base-actor-sheet.mjs";

export class UACabalSheet extends UABaseActorSheet
{
    static get defaultOptions() {
        // height?: string | number | null; id?: string; left?: number | null; minimizable?: boolean; popOut?: boolean; resizable?: boolean; scale?: number | null; scrollY?: string[]; tabs?: TabsConfiguration[]; template?: string | null; title?: string; top?: number | null; width?: number | null; //TODO
        // dragDrop: DragDropConfiguration[]; 
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "default",
                "sheet",
                "sheet--cabal"
            ],
            height: 700 //FORNOW
        });
    }

    activateListeners (html) {
        super.activateListeners(html);
        new foundry.applications.ux.ContextMenu.implementation(html[0], "[data-action='manage-character']", [ //MAYBE classes, condition, group //TODOfixcontextmenu //MAYBE manage-actor? manage-member?
            // classes?: string; group?: string; label: string; onClick?: ContextMenuCallback; visible?: boolean | ContextMenuCondition; //TODO // MAYBE Does name do anything? Is callback valid?
            //TODO Fix these for AppV2 (name->label, callback->onClick). This breaks v13, though?
            {
                name: game.i18n.localize("UA.OpenCharacter"),
                icon: `<i class="fas fa-user"></i>`,
                callback: element => this._onOpenCharacter(element) //TODO
            },
            {
                name: game.i18n.localize("UA.RemoveFromCabal"),
                icon: `<i class="fas fa-user-minus"></i>`,
                condition: element => this._getMember(element)?.isOwner,
                callback: element => this._onRemoveMember(element) //TODO
            }
        ], {
            // closeOnSelect?: boolean; jQuery?: boolean; onClose?: ContextMenuCallback; onOpen?: ContextMenuCallback; relative?: "target" | "cursor"; //TODO
            eventName: "click", //MAYBE
            fixed: true, //MAYBE
            jQuery: false
        });
    }

    async getData (options) {
        const data = await super.getData(options);
        data.optionsObjectiveScale = this.actor.system.schema.fields.objective.fields.scale.choices;
        data.members = game.actors.filter(actor => actor.type === "character" && actor.system.cabal === this.actor.uuid && actor.testUserPermission(game.user, "LIMITED")).sort((a, b) => a.name.localeCompare(b.name)); // HACK
        return data;
    }

    _getMember (element) {
        return fromUuidSync(element.closest(".member").dataset.actorUuid);
    }

    _onOpenCharacter (element) {
        this._getMember(element)?.sheet.render(true);
    }

    _onRemoveMember (element) { //MAYBE _onRemoveFromCabal?
        const member = this._getMember(element);
        Dialog.confirm({ //HACK Does this need await?
            content: `<p>${game.i18n.format("UA.RemoveFromCabal_Details", {
                cabal: this.actor.name,
                name: member.name
            })}</p>`, //FIX
            title: game.i18n.localize("UA.RemoveFromCabal"),
            yes: () => {
                member.update({
                    "system.cabal": null
                });
            }
        });
    }
}