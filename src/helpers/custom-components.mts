import { SlideToggleElement } from "../sheets/components/slide-toggle.mjs";

export class CustomComponents {
  public static defineComponents(): void {
    window.customElements.define("slide-toggle", SlideToggleElement);
  }
}
