import { TogglableSheetManager } from "../togglable-sheet-manager.mjs";

export class BaseActorSheet<
  TActor extends Actor = Actor
> extends ActorSheet<TActor> {
  protected _togglableManager: TogglableSheetManager =
    new TogglableSheetManager();

  public get inEdition(): boolean {
    return this._togglableManager.inEdition;
  }

  public override async getData(
    options: ActorSheetOptions
  ): Promise<ActorSheetData<TActor>> {
    const context = await super.getData(options);

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
