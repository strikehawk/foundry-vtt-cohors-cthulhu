import { SlideToggleElement } from "./components/slide-toggle.mjs";

export class TogglableSheetManager {
  /**
   * The mode the sheet is currently in.
   */
  private _inEdition: boolean = false;

  public get inEdition(): boolean {
    return this._inEdition;
  }

  public async renderOuter(
    app: FormApplication,
    html: JQuery<HTMLElement>
  ): Promise<JQuery<HTMLElement>> {
    const header = html[0].querySelector(".window-header");

    if (!header) {
      return html;
    }

    // Add edit <-> play slide toggle.
    if (app.isEditable) {
      const toggle = document.createElement(
        "slide-toggle"
      ) as SlideToggleElement;
      toggle.checked = this._inEdition;
      toggle.addEventListener("change", (event: Event) =>
        this._onChangeSheetMode(event, app)
      );
      header.insertAdjacentElement("afterbegin", toggle);
    }

    return html;
  }

  /**
   * Handle the user toggling the sheet mode.
   * @param event The triggering event.
   */
  protected async _onChangeSheetMode(
    event: Event,
    app: FormApplication
  ): Promise<void> {
    const toggle = event.currentTarget as SlideToggleElement;

    if (!toggle) {
      return;
    }

    this._inEdition = toggle.checked;
    await app.submit();
    app.render();
  }
}
