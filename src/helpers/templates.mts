import { SYSTEM_PATH } from "../constants.mjs";

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 */
export const preloadHandlebarsTemplates = async function (): Promise<void> {
  await loadTemplates([
    // Actor sheets
    `${SYSTEM_PATH}/templates/actor/actor-character-sheet.hbs`,

    // Item sheets
    `${SYSTEM_PATH}/templates/item/item-truth-sheet.hbs`,
  ]);

  // load named partials
  await loadTemplates({
    characterHeader: `${SYSTEM_PATH}/templates/actor/parts/actor-character-header.hbs`,
    characterAttributes: `${SYSTEM_PATH}/templates/actor/parts/actor-character-attributes.hbs`,
    itemHeader: `${SYSTEM_PATH}/templates/item/parts/item-header.hbs`,
  });
};
