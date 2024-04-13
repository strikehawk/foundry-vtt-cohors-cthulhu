import { DataSchema } from "foundry-vtt-types/common/data/fields.js";

export class TruthDataModel extends foundry.abstract.TypeDataModel {
  public static override defineSchema(): DataSchema {
    const fields = foundry.data.fields;

    return {
      tag: new fields.StringField({ required: true }),
      description: new fields.HTMLField({ required: false }),
    };
  }
}

export interface TruthData {
  tag: string;
  description: string;
}

export class Truth extends Item {
  public override get system(): TruthData {
    return this.system as TruthData;
  }
}
