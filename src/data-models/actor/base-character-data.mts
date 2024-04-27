import { DataSchema } from "foundry-vtt-types/common/data/fields.js";
import { AttributeBlock } from "./attributes.mjs";
import { SkillBlock } from "./skills.mjs";
import {
  NumericValueModifierField,
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
          armor: NumericValueModifierField(
            SystemModifierSources,
            "attribute",
            0
          ),
          courage: NumericValueModifierField(
            SystemModifierSources,
            "attribute",
            0
          ),
        },
        { required: true }
      ),
      bonusDamage: new fields.SchemaField(
        {
          melee: NumericValueModifierField(
            SystemModifierSources,
            "attribute",
            0
          ),
          ranged: NumericValueModifierField(
            SystemModifierSources,
            "attribute",
            0
          ),
          mental: NumericValueModifierField(
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
