import { DataSchema } from "foundry-vtt-types/common/data/fields.js";
import { BaseCharacterData } from "./base-character-data.mjs";

export class CharacterDataModel extends foundry.abstract.TypeDataModel {
  public static override defineSchema(): DataSchema {
    // const fields = foundry.data.fields;

    const schema: DataSchema = BaseCharacterData.getSchema();

    return schema;
  }
}

export interface CharacterData {}

export class Character extends Actor {
  public override get system(): CharacterData {
    return this.system as CharacterData;
  }
}
