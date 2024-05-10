import { CharacterDataModel } from "../data-models/actor/character-data.mjs";

import { TalentDataModel } from "../data-models/item/talents/talent.mjs";
import { TruthDataModel } from "../data-models/item/truth.mjs";

export class SystemData {
  public static register(): void {
    CONFIG.Actor.dataModels.Character = CharacterDataModel;

    CONFIG.Item.dataModels.Talent = TalentDataModel;
    CONFIG.Item.dataModels.Truth = TruthDataModel;

    CONFIG.Actor.trackableAttributes = {
      baseCharacter: {
        bar: ["stress"],
        value: ["resistance.armor", "resistance.courage"],
      },
    };
  }
}
