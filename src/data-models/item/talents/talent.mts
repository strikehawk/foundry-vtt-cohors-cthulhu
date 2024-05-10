import {
  AbstractData,
  BaseDataModel,
  StringArrayField,
} from "../../data-model-utils.mjs";
import {
  TalentRequirementData,
  TalentRequirementField,
} from "./base-talent-requirement.mjs";

export type TalentDataSchema = {
  tag: foundry.data.fields.StringField<
    string,
    string,
    boolean,
    boolean,
    boolean
  >;
  description: foundry.data.fields.HTMLField<
    string,
    string,
    boolean,
    boolean,
    boolean
  >;
  keywords: StringArrayField;
  requirement: TalentRequirementField;
};

export class TalentDataModel extends BaseDataModel {
  public static override defineSchema(): TalentDataSchema {
    const fields = foundry.data.fields;

    return {
      tag: new fields.StringField({ required: true }),
      description: new fields.HTMLField({ required: false }),
      keywords: new fields.ArrayField(
        new fields.StringField({ required: true, blank: false }),
        {
          required: true,
        }
      ),
      requirement: new TalentRequirementField({
        required: false,
        nullable: true,
        initial: undefined,
      }),
    };
  }
}

export interface TalentData extends AbstractData<TalentDataSchema> {
  tag: string;
  description: string;
  keywords: string[];
  requirement?: TalentRequirementData;
}

export class Talent extends Item {
  public override get system(): TalentData {
    return this.system as TalentData;
  }
}
