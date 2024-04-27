import { SYSTEM_ID } from "../constants.mjs";
import { CharacterSheet } from "../sheets/actor/character-sheet.mjs";
import { TruthSheet } from "../sheets/item/truth-sheet.mjs";
import { TalentSheet } from "../sheets/item/talent-sheet.mjs";

export class SheetsConfiguration {
  public static register(): void {
    // Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet(SYSTEM_ID, CharacterSheet, {
      types: ["Character"],
      makeDefault: true,
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet(SYSTEM_ID, TruthSheet, {
      types: ["Truth"],
      makeDefault: false,
    });
    Items.registerSheet(SYSTEM_ID, TalentSheet, {
      types: ["Talent"],
      makeDefault: false,
    });
  }
}
