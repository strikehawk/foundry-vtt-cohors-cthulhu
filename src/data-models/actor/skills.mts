import { ModifiersArraySchemaField } from "../numeric-values.mjs";

export const SkillRankModifierSources = [
  "base",
  "archetype",
  "culture",
  "background",
  "characteristics",
  "agenda",
];

const fields = foundry.data.fields;

export function SkillSchemaField() {
  return new fields.SchemaField({
    ranks: ModifiersArraySchemaField(SkillRankModifierSources, "archetype", 1),
    focuses: new fields.ArrayField(new fields.StringField(), {
      required: false,
    }),
  });
}

export function SkillBlock() {
  return new fields.SchemaField({
    academia: SkillSchemaField(),
    athletics: SkillSchemaField(),
    crafting: SkillSchemaField(),
    engineering: SkillSchemaField(),
    fighting: SkillSchemaField(),
    medicine: SkillSchemaField(),
    observation: SkillSchemaField(),
    persuasion: SkillSchemaField(),
    resilience: SkillSchemaField(),
    stealth: SkillSchemaField(),
    survival: SkillSchemaField(),
    tactics: SkillSchemaField(),
  });
}
