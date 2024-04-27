import { DataSchema } from "foundry-vtt-types/common/data/fields.js";
import { ArchetypeDefinitionDocument } from "./archetype-definition-data.mjs";

export class CharacterArchetypeData {
  public static getSchema(): DataSchema {
    const fields = foundry.data.fields;

    return {
      archetypeDef:
        new fields.EmbeddedDocumentField<ArchetypeDefinitionDocument>(
          ArchetypeDefinitionDocument
        ),
    };
  }
}
