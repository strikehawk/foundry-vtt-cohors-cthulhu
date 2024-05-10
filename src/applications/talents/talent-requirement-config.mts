import { SYSTEM_PATH } from "../../constants.mjs";

interface TalentRequirementData {}

export class TalentRequirementConfig extends FormApplication<TalentRequirementData> {
  public static override get defaultOptions(): FormApplicationOptions {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["cohors-cthulhu", "sheet"],
      popOut: true,
      id: "talent-requirement-application",
      title: "Talent requirement",
      width: 580,
      height: 520,
    });
  }

  public override get template(): string {
    const path = `${SYSTEM_PATH}/templates/applications`;
    return `${path}/talents/talent-requirement.hbs`;
  }

  public override async getData(
    options: Partial<DocumentSheetOptions>
  ): Promise<FormApplicationData<TalentRequirementData>> {
    // Retrieve base data structure.
    const context = await super.getData(options);

    return context;
  }

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);
  }

  protected override async _updateObject(
    event: Event,
    formData: Record<string, unknown>
  ): Promise<void> {
    // super._updateObject(event, formData);
  }
}
