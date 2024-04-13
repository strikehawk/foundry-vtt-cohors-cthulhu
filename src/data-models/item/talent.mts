import { DataSchema } from "foundry-vtt-types/common/data/fields.js";

export class TalentData extends foundry.abstract.TypeDataModel {
  public static override defineSchema(): DataSchema {
    const fields = foundry.data.fields;

    return {
      tag: new fields.StringField({ required: true }),
      label: new fields.StringField({ required: true }),
      description: new fields.StringField({ required: false }),
      keywords: new fields.ArrayField(new fields.StringField(), {
        required: true,
      }),
      prerequisiteTags: new fields.ArrayField(new fields.StringField(), {
        required: false,
      }),
    };
  }
}
