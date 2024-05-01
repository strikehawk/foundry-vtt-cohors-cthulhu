import { SYSTEM_ID, SYSTEM_PATH } from "../../constants.mjs";
import { Talent } from "../../data-models/item/talent.mjs";
import {
  KeywordListAdapter,
  KeywordListHandler,
} from "../components/keyword-list.mjs";
import { SlideToggleElement } from "../components/slide-toggle.mjs";
import { SHEET_MODES } from "../sheet-helpers.mjs";

export class TalentSheet extends ItemSheet<Talent, DocumentSheetOptions> {
  private _keywordsAdapter: KeywordListAdapter | undefined;

  public static override get defaultOptions(): any {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item", "talent"],
      width: 520,
      height: 520,
    });
  }

  /**
   * The mode the sheet is currently in.
   */
  protected _mode: SHEET_MODES = SHEET_MODES.PLAY;

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
    });

    return context;
  }

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);

    if (this._keywordsAdapter) {
      KeywordListHandler.register(html, this._keywordsAdapter);
    }
  }

  protected override async _renderOuter(
    options: RenderOptions
  ): Promise<JQuery<HTMLElement>> {
    const html = await super._renderOuter(options);
    const header = html[0].querySelector(".window-header");

    if (!header) {
      return html;
    }

    // Add edit <-> play slide toggle.
    if (this.isEditable) {
      const toggle = document.createElement(
        "slide-toggle"
      ) as SlideToggleElement;
      toggle.checked = this._mode === SHEET_MODES.EDIT;
      // toggle.classList.add("mode-slider");
      // toggle.dataset.tooltip = "DND5E.SheetModeEdit";
      // toggle.setAttribute(
      //   "aria-label",
      //   game.i18n.localize("DND5E.SheetModeEdit")
      // );
      toggle.addEventListener("change", this._onChangeSheetMode.bind(this));
      header.insertAdjacentElement("afterbegin", toggle);
    }

    return html;
  }

  protected override async _updateObject(
    event: Event,
    formData: Record<string, unknown>
  ): Promise<void> {
    super._updateObject(event, formData);

    this.render();
  }

  /**
   * Handle the user toggling the sheet mode.
   * @param event  The triggering event.
   */
  protected async _onChangeSheetMode(event: Event): Promise<void> {
    const toggle = event.currentTarget as SlideToggleElement;

    if (!toggle) {
      return;
    }

    // const label = game.i18n.localize(
    //   `DND5E.SheetMode${toggle.checked ? "Play" : "Edit"}`
    // );
    // toggle.dataset.tooltip = label;
    // toggle.setAttribute("aria-label", label);
    this._mode = toggle.checked ? SHEET_MODES.EDIT : SHEET_MODES.PLAY;
    await this.submit();
    this.render();
  }
}
