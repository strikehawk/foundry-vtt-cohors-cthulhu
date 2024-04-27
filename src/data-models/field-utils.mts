import {
  ArrayField,
  StringField,
} from "foundry-vtt-types/common/data/fields.js";

export type StringArrayField = ArrayField<
  StringField<string, string, boolean, boolean, boolean>,
  string[],
  object,
  boolean,
  boolean,
  boolean
>;
