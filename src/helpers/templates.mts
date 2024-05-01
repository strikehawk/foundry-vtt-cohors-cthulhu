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
    `${SYSTEM_PATH}/templates/item/item-talent-sheet.hbs`,
  ]);

  // load named partials
  await loadTemplates({
    keywordList: `${SYSTEM_PATH}/templates/components/keyword-list.hbs`,

    characterHeader: `${SYSTEM_PATH}/templates/actor/parts/actor-character-header.hbs`,
    characterAttributes: `${SYSTEM_PATH}/templates/actor/parts/actor-character-attributes.hbs`,
    characterStressChart: `${SYSTEM_PATH}/templates/actor/parts/actor-character-stress-chart.hbs`,
    characterFortune: `${SYSTEM_PATH}/templates/actor/parts/actor-character-fortune.hbs`,
    itemHeader: `${SYSTEM_PATH}/templates/item/parts/item-header.hbs`,
  });
};
