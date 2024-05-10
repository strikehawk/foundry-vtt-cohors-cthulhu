import { AbstractData, BaseDataModel } from "../../data-model-utils.mjs";

export enum TALENT_REQUIREMENT_TYPE {
  ADVANCED_SKILL = "AdvancedSkill",
  ARCHETYPE = "Archetype",
  CASTE = "Caste",
  CULTURE = "Culture",
  TALENT = "Talent",
  CHARACTERISTIC = "Characteristic",
}
export class TalentRequirementField extends foundry.data.fields
  .EmbeddedDataField {
  /**
   * Construct an enchantment field.
   * @param [options={}]  Options to configure this field's behavior.
   */
  constructor(options = {}) {
    super(TalentRequirementDataModel, options);
  }
}

export type TalentRequirementDataSchema = {
  type: foundry.data.fields.StringField<
    string,
    string,
    boolean,
    boolean,
    boolean
  >;
};

export class TalentRequirementDataModel extends BaseDataModel {
  public static override defineSchema(): TalentRequirementDataSchema {
    const fields = foundry.data.fields;

    return {
      type: new fields.StringField({
        required: true,
        choices: Object.values(TALENT_REQUIREMENT_TYPE),
      }),
    };
  }
}

export interface TalentRequirementData
  extends AbstractData<TalentRequirementDataSchema> {
  type: string;
}

export abstract class BaseTalentRequirement extends Item {
  public override get system(): TalentRequirementData {
    return this.system as TalentRequirementData;
  }
}
