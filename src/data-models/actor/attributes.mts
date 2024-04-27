import {
  NumberField,
  SchemaField,
} from "foundry-vtt-types/common/data/fields.js";
import {
  ModifiersArrayField,
  ModifiersArraySchemaField,
  PositiveValueField,
} from "../numeric-values.mjs";

export const AttributeModifierSources = [
  "base",
  "archetype",
  "culture",
  "background",
  "characteristics",
];

const fields = foundry.data.fields;

export type AttributeModifierBlockSchemaField = SchemaField<{
  agility: NumberField<number, number, boolean, boolean, boolean>;
  brawn: NumberField<number, number, boolean, boolean, boolean>;
  coordination: NumberField<number, number, boolean, boolean, boolean>;
  gravitas: NumberField<number, number, boolean, boolean, boolean>;
  insight: NumberField<number, number, boolean, boolean, boolean>;
  reason: NumberField<number, number, boolean, boolean, boolean>;
  will: NumberField<number, number, boolean, boolean, boolean>;
}>;

export function AttributeModifiersBlock(): AttributeModifierBlockSchemaField {
  return new fields.SchemaField({
    agility: PositiveValueField(),
    brawn: PositiveValueField(),
    coordination: PositiveValueField(),
    gravitas: PositiveValueField(),
    insight: PositiveValueField(),
    reason: PositiveValueField(),
    will: PositiveValueField(),
  });
}

export type AttributeBlockSchemaField = SchemaField<{
  agility: ModifiersArraySchemaField;
  brawn: ModifiersArraySchemaField;
  coordination: ModifiersArraySchemaField;
  gravitas: ModifiersArraySchemaField;
  insight: ModifiersArraySchemaField;
  reason: ModifiersArraySchemaField;
  will: ModifiersArraySchemaField;
}>;

export function AttributeBlock() {
  return new fields.SchemaField({
    agility: ModifiersArrayField(AttributeModifierSources, "base", 6),
    brawn: ModifiersArrayField(AttributeModifierSources, "base", 6),
    coordination: ModifiersArrayField(AttributeModifierSources, "base", 6),
    gravitas: ModifiersArrayField(AttributeModifierSources, "base", 6),
    insight: ModifiersArrayField(AttributeModifierSources, "base", 6),
    reason: ModifiersArrayField(AttributeModifierSources, "base", 6),
    will: ModifiersArrayField(AttributeModifierSources, "base", 6),
  });
}
