import { CohorsTextInputElement } from "../sheets/components/cc-text-input.mjs";
import { SlideToggleElement } from "../sheets/components/slide-toggle.mjs";

export class CustomComponents {
  public static defineComponents(): void {
    window.customElements.define("slide-toggle", SlideToggleElement);
    window.customElements.define("cc-text-input", CohorsTextInputElement);
  }
}
