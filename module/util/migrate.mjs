const MIGRATION_VERSION = "1.4.5";

export async function migrate() {
    if (!game.users.activeGM?.isSelf || !foundry.utils.isNewerVersion(MIGRATION_VERSION, game.settings.get("unknownarmies", "SystemVersion"))) {
        return;
    }
    ui.notifications.info("Unknown Armies | Migrating world, please wait.");
    const failures = [];
    await migrateActors(game.actors.contents, failures);
    await migrateItems(game.items.contents, failures);
    await migrateTokens(failures);
    await migrateCompendia(failures);
    await game.settings.set("unknownarmies", "SystemVersion", MIGRATION_VERSION);
    if (failures.length) {
        ui.notifications.error(`Unknown Armies | World migration finished with ${failures.length} error(s). See the console (F12) for details.`, {
            permanent: true
        });
    } else {
        ui.notifications.info("Unknown Armies | World migration complete.");
    }
}

async function migrateActors (actors, failures) {
    await resave(actors, failures);
    for (const actor of actors) {
        await migrateItems(actor.items.contents, failures);
    }
}

async function migrateCompendia (failures) {
    for (const pack of game.packs) {
        const type = pack.documentName;
        if (pack.metadata.packageType !== "world" || !["Actor", "Item"].includes(type)) { // Excludes module, system, and non-actor/item compendia.
            continue;
        }
        const wasLocked = pack.locked;
        try {
            await pack.configure({
                locked: false
            });
            const documents = await pack.getDocuments();
            if (type === "Actor") {
                await migrateActors(documents, failures);
            } else {
                await migrateItems(documents, failures);
            }
        } catch (error) {
            failures.push(error);
            console.error(`Unknown Armies | Failed to migrate compendium: ${pack.title}`, error); //HACK
        } finally {
            await pack.configure({
                locked: wasLocked
            });
        }
    }
}

async function migrateItems (items, failures) {
    await resave(items, failures);
}

async function migrateTokens (failures) {
    for (const scene of game.scenes) {
        for (const token of scene.tokens) {
            if (token.actorLink || !token.actor) { // Excludes linked and orphan tokens.
                continue;
            }
            await migrateItems(token.actor.items.filter(item => token.delta.items.manages(item.id)), failures); // Excludes items that are unchanged from the original actor.
            //TODO Account for changes to actor data key names (e.g. wounds.suffered => wounds.taken).
        }
    }
}

async function resave (documents, failures) {
    documents = documents.filter(document => document.type in game.system.documentTypes[document.documentName]);
    if (!documents.length) {
        return;
    }
    const { pack, parent } = documents[0];
    try {
        await documents[0].constructor.updateDocuments(documents.map(document => ({
            _id: document.id,
            system: document.system.toObject()
        })), {
            diff: false, // Sends the data even if it looks unchanged.
            pack,
            parent,
            recursive: false // Replaces the data instead of merging it.
        });
    } catch (error) {
        failures.push(error);
        console.error(`Unknown Armies | Failed to migrate: ${documents.map(document => document.uuid).join(", ")}`, error); //HACK
    }
}