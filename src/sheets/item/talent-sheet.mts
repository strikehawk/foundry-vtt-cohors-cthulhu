import { TalentRequirementConfig } from "../../applications/talents/talent-requirement-config.mjs";
import { SYSTEM_ID, SYSTEM_PATH } from "../../constants.mjs";
import { Talent } from "../../data-models/item/talents/talent.mjs";
import {
  KeywordListAdapter,
  KeywordListHandler,
} from "../components/keyword-list.mjs";
import { BaseItemSheet } from "./base-item-sheet.mjs";

export class TalentSheet extends BaseItemSheet<Talent, DocumentSheetOptions> {
  private _keywordsAdapter: KeywordListAdapter | undefined;

  public static override get defaultOptions(): any {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item", "talent"],
      width: 580,
      height: 520,
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

    // create Keywords adapter
    this._keywordsAdapter = {
      sheet: this,
      document: this.item,
      propertyPath: "system.keywords",
      accessor: () => this.item.system.keywords,
    };

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
      validation: item.system.getValidationErrors(),
      addRequirement: () => this._addRequirement(),
    });

    return context;
  }

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);

    if (this._keywordsAdapter) {
      KeywordListHandler.register(html, this._keywordsAdapter);
    }

    html.on(
      "click",
      ".add-requirement",
      undefined,
      async (ev: JQuery.Event) => {
        this._addRequirement();
      }
    );

    html.on(
      "click",
      ".edit-requirement",
      undefined,
      async (ev: JQuery.Event) => {
        this._editRequirement();
      }
    );

    html.on(
      "click",
      ".delete-requirement",
      undefined,
      async (ev: JQuery.Event) => {
        this._deleteRequirement();
      }
    );
  }

  protected override async _updateObject(
    event: Event,
    formData: Record<string, unknown>
  ): Promise<void> {
    super._updateObject(event, formData);

    this.render();
  }

  private _addRequirement(): void {
    console.log("Add requirement");
    const app = new TalentRequirementConfig();
    app.render(true);
  }

  private _editRequirement(): void {
    console.log("Edit requirement");
  }

  private _deleteRequirement(): void {
    console.log("Remove requirement");
  }
}
