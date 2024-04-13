import { Truth } from "../../data-models/item/truth.mjs";
import { SYSTEM_ID, SYSTEM_PATH } from "../../constants.mjs";

export class TruthSheet extends ItemSheet<Truth, DocumentSheetOptions> {
  public static override get defaultOptions(): any {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item"],
      width: 520,
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
    const path = `${SYSTEM_PATH}/templates/item`;
    return `${path}/item-${this.item.type.toLowerCase()}-sheet.hbs`;
  }

  public override async getData(
    options: Partial<DocumentSheetOptions>
  ): Promise<ItemSheetData<Truth>> {
    // Retrieve base data structure.
    const context = await super.getData(options);
    const item = context.item;
    const source = item.toObject();

    foundry.utils.mergeObject(context, {
      source: source.system,
      system: item.system,
      isEmbedded: item.isEmbedded,
      type: item.type,
      flags: item.flags,
      COHORS: CONFIG.COHORS,
      //   effects: prepareActiveEffectCategories(item.effects),
      descriptionHTML: await TextEditor.enrichHTML(item.system.description, {
        secrets: item.isOwner,
        async: true,
      }),
    });

    return context;
  }
}
