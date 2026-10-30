## v1.4.5

- Fixed bug where migration wasn't running (and it would have been disastrous if it had).
- Added limited milestone sheet.
- Tweaked data schema options.
- Converted Google Fonts to local fonts.
- Improved font stacks.
- Clamped objectives between 0% and 100%.
- Moved avatar channels and supernatural abilities before other features on character sheets.
- Allowed limited sheet resizing.
- Sorted localized identity feature options correctly.
- Refactored chat messages for identity/milestone improvements to use owner as speaker.
- Handled milestone improvements when not owned by a cabal.
- Refactored manifest to allow installation of old versions.

## v1.4.4

- Fixed old avatar channel values taking precedence over newer edits.
- Fixed leftover old avatar channel keys displaying on character sheets.
- Fixed drag-and-drop for character sheet items.
- Fixed pre-updates to skip unrecognized actor/item types rather than throwing an error.
- Fixed "Casts Rituals" feature clearing when changing identity type.
- Synchronized and simplified "burned out" threshold logic.

## v1.4.3

- Fixed missing columns on cabal artifact and item lists.
- Fixed editor section height.

## v1.4.2

- Updated and corrected Russian localization (many thanks to alxnsk).
- Increased min-height of editors being edited.
- Fixed bug with identity details covering other info.
- Fixed bug with new characters showing as dead.

## v1.4.1

- Consolidated common roll logic.
- Fixed bug with shift + roll.
- Fixed bug with new identities not having a type.
- Added default of 0 for percentage values.
- Set item list header scrollbar offset via CSS property.

## v1.4.0

- Hotfix for Carolingian UI.

## v1.3.9

- Hotfix to correct hidden artifact charges showing.

## v1.3.8

- Moved shared identity feature sorting logic to identity data.
- Fixed bug with ritual/spell cost options and their localization.

## v1.3.7

- Disabled item roll buttons until properly implemented.
- CSS quick fix.

## v1.3.6

- Updated for Foundry v14!
- Converted template into DataModel.
- Added migration script.
- Added setting for identity button style.
- Complete CSS structural redesign/overhaul.
- Added fancy animations.
- Added backgrounds for transparent portraits.
- Converted button-input pairs into capsule style.
- Restructured shock gauge.
- Refactored identity cards (toggleable expansion).
- Refactored item list layout.
- Added options tab to actor/item sheets. Actual functionality coming soon!
- Refactored objective percentage calculations.
- Tightened up sheet logic.
- Added tabs to milestone sheet.
- Refactored character sheets to automatically uncheck used passions when burned out.
- Refactored roll button in chat sidebar to no longer get re-bound upon switching tabs.
- Added Spanish localization (many thanks to Ellyjah).

## v1.3.5

- Actually fixed character sheet bug. 🙃

## v1.3.4

- Fixed character sheet bug.

## v1.3.3

- Tweaked README.
- Organized manifest and replaced outdated grid units.
- Moved option maps to their respective sheets.
- Removed wound threshold maximum.
- Minor JavaScript and Handlebars tweaks.

## v1.3.2

- Added grey theme.
- Make purple theme slightly less blue.

## v1.3.1

- Added setting for sheet/UI theme.
- Corrected default for "Identities: Select Feature When Rolling" setting.
- Improved dialog styles.
- Replaced deprecated API function for future compatibility.
- Replaced deprecated Handlebars helper for future compatibility.

## v1.3.0

- Improved description of "Me, Myself & You" setting.
- Add setting to select feature when rolling identity.

## v1.2.9

- Update to v12. Nothing appears to be broken?

## v1.2.8

- Added speaker to roll chat messages.
- Russian localization update.

## v1.2.7

- Changed chat button icon to d10.

## v1.2.6

- Added functionality to otherwise useless chat button (rolls 1d100).

## v1.2.5

- Added world setting for using "Me, Myself & You" identity features.

## v1.2.4

- Fixed identity feature localization in identity/character sheets.

## v1.2.3

- Added ability to reorder items on actor sheets.

## v1.2.2

- Uncentered artifact sheet name field.
- Resized sheet elements for Russian localization.

## v1.2.1

- Moved common functions from actor sheets to base actor sheet.
- Moved common functions from item sheets to base item sheet.
- Added "post item to chat" buttons to character/cabal sheets.
- Added effect tooltip to items in character/cabal sheets.

## v1.2.0

- Moved roll modifier to chat message flavor text.
- Fixed identity feature non-English localization issues.

## v1.1.9

- Added option to modify rolls via popup when right-clicking roll button (or when left-clicking while holding shift, control or alt).
- Fixed objective percentage miscalculation when re-rolling milestone tasks.

## v1.1.8

- Restyled actor-owned identity cards.

## v1.1.7

- Added custom pause icon.

## v1.1.6

- Added confirmation dialog when deleting items from sheets.

## v1.1.5

- Added button for rolling Objective (i.e. "taking the plunge").

## v1.1.4

- Added Russian localization (many thanks to alxnsk).
- Tweaked some localization strings.
- Fixed bug that occurred when resetting failed shock meter notches?
- Added button to roll for identity improvement.
- Standardized chat message when improving identities and objectives.

## v1.1.3

- Aligned form elements with actor/item name input.
- Added option to hide artifact charges from players.
- Add items tab to the cabal sheet.

## v1.1.2

- Restyled sheet blockquotes.
- Localized chat messages.

## v1.1.1

- Fixed issue with milestones updating.
- Hid identities from document creation dialog.

## v1.1.0

- Corrected misspellings.
- Added objectives and milestones to cabal sheet.

## v1.0.6

- Moved text indent to paragraphs only.
- Added "show image" button to actor and item sheets.
- Corrected thumbnail object-fit.

## v1.0.5

- Changed directory thumbnail object-position.

## v1.0.4

- Corrected manifest URL.

## v1.0.3

- Changed portrait width/height for limited sheets.

## v1.0.2

- Fixed cover image URL for The Forge.

## v1.0.1

- Added cover photo for The Forge.
- Moved character statuses to top of the sheet.

## v1.0.0

- Initial release.