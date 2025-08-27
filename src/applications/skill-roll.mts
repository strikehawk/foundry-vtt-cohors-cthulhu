import { SYSTEM_PATH } from "../constants.mjs";

interface SkillRollData {
  numDice: number;
  numSuccesses: number;
}

export interface SkillRollOptions extends SkillRollData, DialogOptions {}

export class SkillRollDialog extends Dialog {
  public data: SkillRollData;

  constructor(options?: SkillRollOptions) {
    super(options);

    this.data = {
      numDice: 2,
      numSuccesses: 2,
    };

    if (typeof options?.numDice === "number") {
      this.data.numDice = options.numDice;
    }

    if (typeof options?.numSuccesses === "number") {
      this.data.numSuccesses = options.numSuccesses;
    }
  }

  public static override get defaultOptions(): DialogOptions {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cohors-cthulhu", "dialog", "dice-icon"],
      title: "Custom Skill Roll",
      width: 400,
    });
  }

  public override get template(): string {
    const path = `${SYSTEM_PATH}/templates/dialogs`;
    return `${path}/skill-roll.hbs`;
  }

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);
    html
      .find('input[name="numDice"]')
      .on("change", this._onChangeInput.bind(this));
    html
      .find('input[name="numSuccesses"]')
      .on("change", this._onChangeInput.bind(this));
  }
}
