import { Character } from "../../data-models/actor/character-data.mjs";
import { SYSTEM_ID, SYSTEM_PATH } from "../../constants.mjs";
import { BaseActorSheet } from "./base-actor-sheet.mjs";

export class CharacterSheet extends BaseActorSheet<Character> {
  public static override get defaultOptions(): any {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "actor"],
      width: 1000,
      height: 520,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "attributes",
        },
      ],
    });
  }

  public override get template(): string {
    const path = `${SYSTEM_PATH}/templates/actor`;
    return `${path}/actor-${this.actor.type.toLowerCase()}-sheet.hbs`;
  }

  public override async getData(
    options: ActorSheetOptions
  ): Promise<ActorSheetData<Character>> {
    // Retrieve base data structure.
    const context = await super.getData(options);
    const actor = context.actor;
    const source = actor.toObject();

    foundry.utils.mergeObject(context, {
      source: source.system,
      system: actor.system,
      type: actor.type,
      flags: actor.flags,
      COHORS: CONFIG.COHORS,
      //   effects: prepareActiveEffectCategories(item.effects),
      descriptionHTML: await TextEditor.enrichHTML(actor.system.description, {
        secrets: actor.isOwner,
        async: true,
      }),
    });

    return context;
  }
}
