import {
  ArrayField,
  NumberField,
  SchemaField,
  StringField,
} from "foundry-vtt-types/common/data/fields.js";

const fields = foundry.data.fields;

export type PositiveValueSchemaField = NumberField<
  number,
  number,
  boolean,
  boolean,
  boolean
>;

export function PositiveValueField(
  initial: number = 0
): PositiveValueSchemaField {
  return new fields.NumberField({
    required: true,
    integer: true,
    min: 0,
    initial: initial,
  });
}

export type NumericValueModifierSchemaField = SchemaField<{
  source: StringField<
    string,
    NonNullable<JSONValue>,
    boolean,
    boolean,
    boolean
  >;
  value: PositiveValueSchemaField;
}>;

export function NumericValueModifierField(
  choices: string[],
  initialSource: string,
  initialValue: number
): NumericValueModifierSchemaField {
  return new fields.SchemaField({
    source: new fields.StringField({
      choices: choices,
      required: true,
      initial: initialSource,
    }),
    value: PositiveValueField(initialValue),
  });
}

export type ModifiersArraySchemaField =
  ArrayField<NumericValueModifierSchemaField>;

export function ModifiersArrayField(
  choices: string[],
  initialSource: string,
  initialValue: number = 0
): ModifiersArraySchemaField {
  return new fields.ArrayField(
    NumericValueModifierField(choices, initialSource, initialValue)
  );
}

export const SystemModifierSources = [
  "base",
  "archetype",
  "attribute",
  "culture",
  "background",
  "characteristics",
  "agenda",
];
