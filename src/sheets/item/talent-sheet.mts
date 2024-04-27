import { SYSTEM_ID, SYSTEM_PATH } from "../../constants.mjs";
import { Talent } from "../../data-models/item/talent.mjs";
import {
  KeywordListAdapter,
  KeywordListHandler,
} from "../general/keyword-list.mjs";

export class TalentSheet extends ItemSheet<Talent, DocumentSheetOptions> {
  public static override get defaultOptions(): any {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item", "talent"],
      width: 520,
      height: 520,
      submitOnChange: true,
      submitOnClose: true,
    });
  }

  public override get template(): string {
    const path = `${SYSTEM_PATH}/templates/item`;
    return `${path}/item-${this.item.type.toLowerCase()}-sheet.hbs`;
  }

  public override async getData(
    options: Partial<DocumentSheetOptions>
  ): Promise<ItemSheetData<Talent>> {
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

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);

    const adapter: KeywordListAdapter = {
      sheet: this,
      document: this.item,
      propertyPath: "system.keywords",
      accessor: () => this.item.system.keywords,
    };
    KeywordListHandler.register(html, adapter);
  }
}
