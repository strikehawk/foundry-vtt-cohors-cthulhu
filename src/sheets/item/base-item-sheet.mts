import { TogglableSheetManager } from "../togglable-sheet-manager.mjs";

export class BaseItemSheet<
  TItem extends Item = Item,
  TOptions extends DocumentSheetOptions = DocumentSheetOptions
> extends ItemSheet<TItem, TOptions> {
  protected _togglableManager: TogglableSheetManager =
    new TogglableSheetManager();

  public get inEdition(): boolean {
    return this._togglableManager.inEdition;
  }

  public override async getData(
    option?: Partial<TOptions> | undefined
  ): Promise<ItemSheetData<TItem>> {
    const context = await super.getData(option);

    context.editable = context.editable && this._togglableManager.inEdition;

    return context;
  }

  protected override async _renderOuter(
    options: RenderOptions
  ): Promise<JQuery<HTMLElement>> {
    const html = await super._renderOuter(options);
    this._togglableManager.renderOuter(this, html);

    return html;
  }
}
