import {
  HTMLField,
  StringField,
} from "foundry-vtt-types/common/data/fields.js";
import { default as Document } from "foundry-vtt-types/common/abstract/document.js";

export type ArchetypeDefinitionDataSchema = {
  name: StringField<string, string, boolean, boolean, boolean>;
  description: HTMLField;
};

export class ArchetypeDefinitionData {
  public static getSchema(): ArchetypeDefinitionDataSchema {
    const fields = foundry.data.fields;

    return {
      name: new fields.StringField({ required: true }),
      description: new fields.HTMLField(),
    };
  }
}

export class ArchetypeDefinitionDocument extends Document<
  null,
  ArchetypeDefinitionDataSchema
> {}
