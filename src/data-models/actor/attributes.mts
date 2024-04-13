import {
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

export function AttributeModifiersBlock() {
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

export function AttributeBlock() {
  return new fields.SchemaField({
    agility: ModifiersArraySchemaField(AttributeModifierSources, "base", 6),
    brawn: ModifiersArraySchemaField(AttributeModifierSources, "base", 6),
    coordination: ModifiersArraySchemaField(
      AttributeModifierSources,
      "base",
      6
    ),
    gravitas: ModifiersArraySchemaField(AttributeModifierSources, "base", 6),
    insight: ModifiersArraySchemaField(AttributeModifierSources, "base", 6),
    reason: ModifiersArraySchemaField(AttributeModifierSources, "base", 6),
    will: ModifiersArraySchemaField(AttributeModifierSources, "base", 6),
  });
}
