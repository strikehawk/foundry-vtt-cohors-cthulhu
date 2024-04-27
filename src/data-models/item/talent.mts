import {
  HTMLField,
  StringField,
} from "foundry-vtt-types/common/data/fields.js";
import { StringArrayField } from "../field-utils.mjs";

export type TalentDataSchema = {
  tag: StringField<string, string, boolean, boolean, boolean>;
  description: HTMLField<string, string, boolean, boolean, boolean>;
  keywords: StringArrayField;
  prerequisiteTags: StringArrayField;
};

export class TalentDataModel extends foundry.abstract.TypeDataModel {
  public static override defineSchema(): TalentDataSchema {
    const fields = foundry.data.fields;

    return {
      tag: new fields.StringField({ required: true }),
      description: new fields.HTMLField({ required: false }),
      keywords: new fields.ArrayField(new fields.StringField(), {
        required: true,
      }),
      prerequisiteTags: new fields.ArrayField(new fields.StringField(), {
        required: false,
      }),
    };
  }
}

export interface TalentData {
  tag: string;
  description: string;
  keywords: string[];
  prerequisiteTags: string[];
}

export class Talent extends Item {
  public override get system(): TalentData {
    return this.system as TalentData;
  }
}
