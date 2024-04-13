import { DataSchema } from "foundry-vtt-types/common/data/fields.js";
import { AttributeBlock } from "./attributes.mjs";
import { SkillBlock } from "./skills.mjs";
import {
  NumericValueModifierSchemaField,
  PositiveValueField,
  SystemModifierSources,
} from "../numeric-values.mjs";

export class BaseCharacterData {
  public static getSchema(): DataSchema {
    const fields = foundry.data.fields;

    return {
      name: new fields.StringField(),
      attributes: AttributeBlock(),
      skills: SkillBlock(),
      stress: new fields.SchemaField(
        {
          max: PositiveValueField(),
          value: PositiveValueField(),
        },
        { required: true }
      ),
      resistance: new fields.SchemaField(
        {
          armor: NumericValueModifierSchemaField(
            SystemModifierSources,
            "attribute",
            0
          ),
          courage: NumericValueModifierSchemaField(
            SystemModifierSources,
            "attribute",
            0
          ),
        },
        { required: true }
      ),
      bonusDamage: new fields.SchemaField(
        {
          melee: NumericValueModifierSchemaField(
            SystemModifierSources,
            "attribute",
            0
          ),
          ranged: NumericValueModifierSchemaField(
            SystemModifierSources,
            "attribute",
            0
          ),
          mental: NumericValueModifierSchemaField(
            SystemModifierSources,
            "attribute",
            0
          ),
        },
        { required: true }
      ),
    };
  }
}
