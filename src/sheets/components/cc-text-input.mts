/**
 * A custom HTML element that represents a checkbox-like input that is displayed as a slide toggle.
 * @fires change
 */
export class CohorsTextInputElement extends HTMLElement {
  public static observedAttributes = [
    "name",
    "type",
    "value",
    "placeholder",
    "inEdition",
  ];
  /** @override */
  public static formAssociated = true;

  private _legend?: HTMLLegendElement;
  private _valueInput?: HTMLInputElement;
  private _valueSpan?: HTMLSpanElement;

  /** @inheritDoc */
  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#internals.role = "input";
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
   * The name of the input.
   */
  public get name(): string | null {
    return this.getAttribute("name");
  }

  public set name(value: string) {
    this.setAttribute("name", value);
  }

  /* -------------------------------------------- */

  /**
   * The label of the input.
   */
  public get label(): string {
    return this.getAttribute("label") || "";
  }

  public set label(value: string) {
    this.setAttribute("label", value);
    this._updateLabel();
  }

  /* -------------------------------------------- */

  /**
   * True if the value of the input can be modified; false otherwise.
   */
  public get inEdition(): boolean {
    return this.getAttribute("inEdition") === "true" ? true : false;
  }

  public set inEdition(value: boolean) {
    this.setAttribute("inEdition", value ? "true" : "false");
    this._updateLabel();
  }

  /* -------------------------------------------- */

  /**
   * The value of the input as it appears in form data.
   */
  public get value(): string {
    return this._valueInput?.value || "";
  }

  public set value(value: string) {
    this._updateValue(value);
  }

  /* -------------------------------------------- */

  /**
   * The placeholder value of the input.
   */
  public get placeholder(): string {
    return this.getAttribute("placeholder") || "";
  }

  public set placeholder(value: string) {
    this.setAttribute("placeholder", value);
    this._updatePlaceholder();
  }

  /* -------------------------------------------- */

  /**
   * Masquerade as a checkbox input.
   */
  public get type(): string {
    return "input";
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

    const label = game.i18n.localize(`${this.name}`);
    // this.dataset.tooltip = label;
    this.setAttribute("aria-label", label);
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "label":
        this._updateLabel();
        break;
      case "value":
        this._updateValue(newValue || "");
        break;
      case "inEdition":
        this._updateInEdition();
        break;
      default:
        break;
    }
  }

  /* -------------------------------------------- */

  /**
   * Create the constituent components of this element.
   */
  protected _buildElements(): HTMLElement[] {
    const fieldset = document.createElement("fieldset");
    fieldset.classList.add("single-field");

    this._legend = document.createElement("legend");
    fieldset.append(this._legend);

    this._valueInput = document.createElement("input");
    this._valueInput.type = "text";
    this._valueInput.setAttribute("placeholder", this.placeholder);
    fieldset.append(this._valueInput);

    this._valueSpan = document.createElement("span");
    this._valueSpan.classList.add("content");
    fieldset.append(this._valueSpan);

    this._updateLabel();
    this._updateValue(this.getAttribute("value") || "");
    this._updateInEdition();

    return [fieldset];
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
    this.addEventListener("dblclick", (event) => event.stopPropagation());
    this.#listenersAdded = true;
  }

  /* -------------------------------------------- */

  private _updateLabel(): void {
    if (!this._legend) {
      return;
    }

    this._legend.innerText = this.label;
  }

  private _updateValue(value: string): void {
    if (this._valueInput) {
      this._valueInput.value = value;
    }

    if (this._valueSpan) {
      this._valueSpan.innerText = value;
    }
  }

  private _updatePlaceholder(): void {
    if (!this._valueInput) {
      return;
    }

    this._valueInput.placeholder = this.placeholder;
  }

  private _updateInEdition(): void {
    if (this._valueInput) {
      this._valueInput.style.display = this.inEdition ? "block" : "none";
    }

    if (this._valueSpan) {
      this._valueSpan.style.display = this.inEdition ? "none" : "block";
    }
  }
}
