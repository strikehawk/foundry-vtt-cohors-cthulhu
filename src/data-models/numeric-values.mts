import { NumberField } from "foundry-vtt-types/common/data/fields.js";

const fields = foundry.data.fields;

export function PositiveValueField(
  initial: number = 0
): NumberField<number, number, true, true, true> {
  return new fields.NumberField({
    required: true,
    integer: true,
    min: 0,
    initial: initial,
  });
}

export function NumericValueModifierSchemaField(
  choices: string[],
  initialSource: string,
  initialValue: number
) {
  return new fields.SchemaField({
    source: new fields.StringField({
      choices: choices,
      required: true,
      initial: initialSource,
    }),
    value: PositiveValueField(initialValue),
  });
}

export function ModifiersArraySchemaField(
  choices: string[],
  initialSource: string,
  initialValue: number = 0
) {
  return new fields.ArrayField(
    NumericValueModifierSchemaField(choices, initialSource, initialValue)
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
