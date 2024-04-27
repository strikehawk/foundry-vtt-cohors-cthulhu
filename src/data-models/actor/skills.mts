import { ModifiersArrayField } from "../numeric-values.mjs";

/**
const FOCUS_ACADEMIA = [
  "Finance",
  "History",
  "Linguistics",
  "Philosophy",
  "Religion",
];
const FOCUS_ATHLETICS = [
  "Climbing",
  "Lifting",
  "Physical Training",
  "Running",
  "Swimming",
];
const FOCUS_CRAFTING = [
  "Armorsmithing",
  "Cooking",
  "Tailoring",
  "Weaponsmithing",
];
const FOCUS_ENGINEERING = [
  "Architecture",
  "Defenses",
  "Demolition",
  "Infrastructure",
  "Siege Engines",
];
const FOCUS_FIGHTING = [
  "Archery",
  "Melee Weapons",
  "Thrown Weapons",
  "Unarmed",
  "War Magic",
];
const FOCUS_MEDICINE = [
  "Contagion",
  "Faith Healing",
  "Field Treatment",
  "Pharmacia",
  "Surgery",
];
const FOCUS_OBSERVATION = ["Hearing", "Instincts", "Sights", "Smell and Taste"];
const FOCUS_PERSUASION = [
  "Charm",
  "Deception",
  "Innuendo",
  "Intimidation",
  "Invocation",
  "Negotiation",
  "Rhetoric",
];
const FOCUS_RESILIENCE = ["Discipline", "Fortitude", "Immunity"];
const FOCUS_STEALTH = [
  "Concealment",
  "Disguise",
  "Escape Artistry",
  "Lock Picking",
  "Sleight of Hand",
  "Sneak",
];
const FOCUS_SURVIVAL = [
  "Animal Handling",
  "Boating",
  "Foraging",
  "Hunting",
  "Mysticism",
  "Navigation",
  "Tracking",
  "Woodcraft",
];
const FOCUS_TACTICS = [
  "Cavalry",
  "Infantry",
  "Leadership",
  "Navy",
  "Omen Reading",
  "Scouting",
];
*/

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
    ranks: ModifiersArrayField(SkillRankModifierSources, "archetype", 1),
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
