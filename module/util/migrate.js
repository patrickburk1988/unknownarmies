const MIGRATION_VERSION = "1.3.7";

export async function migrate() {
    if (!game.user.isGM || !foundry.utils.isNewerVersion(MIGRATION_VERSION, game.settings.get("unknownarmies", "SystemVersion"))) {
        return;
    }
    async function delegateItemMigration (item) {
        switch (item.type) {
            case "artifact":
                await migrateArtifact(item);
                return;
            case "identity":
                await migrateIdentity(item);
                return;
            case "item":
                await migrateItem(item);
                return;
            case "milestone":
                await migrateMilestone(item);
                return;
            case "ritual":
                await migrateRitual(item);
                return;
            case "spell":
                await migrateSpell(item);
                return;
            default:
                throw new Error(`Unknown Armies | Invalid item type: ${item}`); //FORNOW
        }
    }
    ui.notifications.info("Unknown Armies | Migrating world, please wait.");
    for (const actor of game.actors) {
        switch (actor.type) {
            case "cabal":
                await migrateCabal(actor);
                break;
            case "character":
                await migrateCharacter(actor);
                break;
            default:
                throw new Error(`Unknown Armies | Invalid actor type: ${actor}`); //FORNOW
        }
        for (let item of actor.items) {
            await delegateItemMigration(item);
        }
    }
    for (let item of game.items) {
        await delegateItemMigration(item);
    }
    await game.settings.set("unknownarmies", "SystemVersion", MIGRATION_VERSION);
    ui.notifications.info("Unknown Armies | World migration complete.");
}

async function migrateArtifact (artifact) {
    if (artifact._source?.charges?.isHidden === undefined) {
        return;
    }
    await artifact.update({
        "system.charges.-=isHidden": null, // -= deletes a key in Foundry (null is a placeholder and has no effect).
        "system.options.hideCharges": artifact.system.options.hideCharges
    });
    console.log(`Unknown Armies | Migrated artifact: ${artifact.name}`);
}

async function migrateCabal (cabal) {
}

async function migrateCharacter (character) {
}

async function migrateIdentity (identity) {
    const channels = identity._source?.system?.avatar?.channels;
    if (!channels || !(["1-50", "51-70", "71-90", "91-98", "99-"].some(key => key in channels))) {
        return;
    }
    await identity.update({
        "system.avatar.channels": {
            first:     identity.system.avatar.channels.first,
            second:    identity.system.avatar.channels.second,
            third:     identity.system.avatar.channels.third,
            fourth:    identity.system.avatar.channels.fourth,
            godwalker: identity.system.avatar.channels.godwalker
        }
    }, {
        recursive: false
    });
    console.log(`Unknown Armies | Migrated identity: ${identity.name}`);
}

async function migrateItem (item) {
}

async function migrateMilestone (milestone) {
}

async function migrateRitual (ritual) {
}

async function migrateSpell (spell) {
}