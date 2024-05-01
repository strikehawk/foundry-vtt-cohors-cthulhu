/**
 * A custom HTML element that represents a checkbox-like input that is displayed as a slide toggle.
 * @fires change
 */
export class SlideToggleElement extends HTMLElement {
  /** @override */
  public static formAssociated = true;

  /** @inheritDoc */
  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#internals.role = "switch";
    this.#internals.ariaChecked = this.hasAttribute("checked")
      ? "true"
      : "false";
  }

  /**
   * The custom element's form and accessibility internals.
   * @type {ElementInternals}
   */
  #internals: ElementInternals;

  /**
   * The form this element belongs to, if any.
   * @type {HTMLFormElement}
   */
  public get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  /* -------------------------------------------- */

  /**
   * The name of the toggle.
   * @type {string}
   */
  public get name(): string | null {
    return this.getAttribute("name");
  }

  public set name(value: string) {
    this.setAttribute("name", value);
  }

  /* -------------------------------------------- */

  /**
   * Whether the slide toggle is toggled on.
   * @type {boolean}
   */
  public get checked(): boolean {
    return this.hasAttribute("checked");
  }

  public set checked(value: boolean) {
    if (typeof value !== "boolean")
      throw new Error("Slide toggle checked state must be a boolean.");
    this.toggleAttribute("checked", value);
    this.#internals.ariaChecked = `${value}`;
  }

  /* -------------------------------------------- */

  /**
   * The value of the input as it appears in form data.
   */
  public get value(): string {
    return this.getAttribute("value") || "on";
  }

  public set value(value: string) {
    this.setAttribute("value", value);
  }

  /* -------------------------------------------- */

  /**
   * Masquerade as a checkbox input.
   */
  public get type(): string {
    return "checkbox";
  }

  /* -------------------------------------------- */

  /**
   * Activate the element when it is attached to the DOM.
   * @inheritDoc
   */
  public connectedCallback(): void {
    this.replaceChildren();
    this.append(...this._buildElements());
    this._activateListeners();

    this.classList.add("mode-slider");
    const label = game.i18n.localize(`${this.checked ? "Edit" : "Play"}`);
    this.dataset.tooltip = label;
    this.setAttribute("aria-label", label);
  }

  /* -------------------------------------------- */

  /**
   * Create the constituent components of this element.
   */
  protected _buildElements(): HTMLElement[] {
    const track = document.createElement("div");
    track.classList.add("slide-toggle-track");
    const thumb = document.createElement("div");
    thumb.classList.add("slide-toggle-thumb");
    track.append(thumb);
    return [track];
  }

  /* -------------------------------------------- */

  /**
   * Guard against adding event listeners more than once.
   */
  #listenersAdded: boolean = false;

  /**
   * Activate event listeners.
   * @protected
   */
  protected _activateListeners(): void {
    if (this.#listenersAdded) return;
    this.addEventListener("click", this._onToggle.bind(this));
    this.addEventListener("dblclick", (event) => event.stopPropagation());
    this.#listenersAdded = true;
  }

  /* -------------------------------------------- */

  /**
   * Handle toggling the control.
   * @param event  The triggering event.
   * @protected
   */
  protected _onToggle(event: MouseEvent): void {
    this.checked = !this.checked;
    const label = game.i18n.localize(`${this.checked ? "Edit" : "Play"}`);
    // const label = game.i18n.localize(
    //   `DND5E.SheetMode${this.checked ? "Play" : "Edit"}`
    // );
    this.dataset.tooltip = label;
    this.setAttribute("aria-label", label);
    this.dispatchEvent(new Event("change"));
  }
}
