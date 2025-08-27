import { SYSTEM_ID, SYSTEM_LABEL } from "../constants.mjs";

import { DieCohorsCoin } from "../roller/die-cohors-coin.mjs";
import {
  ChallengeDieResult,
  DieCohorsChallenge,
} from "../roller/die-cohors-challenge.mjs";
import { ChatSpeakerData } from "foundry-vtt-types/common/documents/module.js";

export interface DSNColorSet {
  name: string;
  description: string;
  category: string;
  foreground: string;
  background: string;
  outline: string;
  texture: string;
  material: string;
}

export interface DSNDicePreset {
  type: string;
  labels: string[];
  system: string;
  colorset: string;
}

export interface DiceSoNice {
  addSystem(system: { id: string; name: string }, isDefault: boolean): void;
  addColorset(colorSet: DSNColorSet): void;
  addDicePreset(preset: DSNDicePreset): void;

  /**
   * Show the 3D Dice animation for the Roll made by the User.
   * @param roll an instance of Roll class to show 3D dice animation.
   * @param user the user who made the roll (game.user by default).
   * @param synchronize if the animation needs to be shown to other players. Default: false
   * @param whisper list of users or userId who can see the roll, set it to null if everyone can see. Default: null
   * @param blind if the roll is blind for the current user. Default: false
   * @param chatMessageID A chatMessage ID to reveal when the roll ends. Default: null
   * @param speaker An object using the same data schema than ChatSpeakerData. <br/>Needed to hide NPCs roll when the GM enables this setting.
   * @returns when resolved true if the animation was displayed, false if not.
   */
  showForRoll(
    roll: Roll,
    user?: User,
    synchronize?: boolean,
    whisper?: string[],
    blind?: boolean,
    chatMessageID?: string,
    speaker?: ChatSpeakerData
  ): Promise<boolean>;
}

export class RollConfiguration {
  public static initialize(): void {
    RollConfiguration._configureDiceTerms();
    RollConfiguration._configureDiceSoNice();
  }

  public static async renderChatMessage(
    message: ChatMessage,
    html: JQuery<HTMLElement>,
    data: object
  ): Promise<void> {
    if (!message.isRoll) {
      return;
    }

    if (!Array.isArray(message.rolls) || message.rolls.length === 0) {
      return;
    }

    await RollConfiguration._processRoll(message, html, data);
  }

  private static _configureDiceTerms(): void {
    CONFIG.Dice.terms["c"] = DieCohorsCoin;
    CONFIG.Dice.terms["f"] = DieCohorsChallenge as any; // TODO Inelegant solution
  }

  private static _configureDiceSoNice(): void {
    /* -------------------------------------------- */
    /*  DICE SO NICE                                */
    /* -------------------------------------------- */

    Hooks.once("diceSoNiceReady", (args: unknown) => {
      const dice3d: DiceSoNice = args as DiceSoNice;
      dice3d.addSystem({ id: SYSTEM_ID, name: SYSTEM_LABEL }, true);

      dice3d.addColorset({
        name: SYSTEM_ID,
        description: SYSTEM_LABEL,
        category: "Colors",
        foreground: "#a22525",
        background: "#e2dfd4",
        outline: "#d3cfc5",
        texture: "marble",
        material: "stone",
      });

      dice3d.addDicePreset({
        type: "dc",
        labels: DieCohorsCoin.faceTextures,
        system: SYSTEM_ID,
        colorset: SYSTEM_ID,
      });

      dice3d.addDicePreset({
        type: "df",
        labels: DieCohorsChallenge.faceTextures,
        system: SYSTEM_ID,
        colorset: SYSTEM_ID,
      });

      // set the instance of DiceSoNice on Game object for easier reference.
      game.dice3d = dice3d;
    });
  }

  private static async _processRoll(
    message: ChatMessage,
    html: JQuery<HTMLElement>,
    data: object
  ): Promise<void> {
    const rolls = message.rolls;

    const diceRolls = html.find(".message-content .dice-roll").toArray();

    let i: number = 0;

    let diceRoll: JQuery;

    for (const roll of rolls) {
      diceRoll = jQuery(diceRolls[i]);

      if (RollConfiguration._isChallengeRoll(roll)) {
        RollConfiguration._processChallengeRoll(roll, diceRoll);
      }

      if (RollConfiguration._isCoinRoll(roll)) {
        RollConfiguration._processCoinRoll(roll, diceRoll);
      }
      i++;
    }
  }

  private static _isChallengeRoll(roll: Roll): boolean {
    for (const term of roll.terms) {
      if (term instanceof DieCohorsChallenge) {
        return true;
      }
    }

    return false;
  }

  private static _processChallengeRoll(
    roll: Roll,
    jQueryRoll: JQuery<HTMLElement>
  ): void {
    jQueryRoll.addClass("challenge-roll");

    let effects = RollConfiguration._getEffectCount(roll);

    if (effects === 0) {
      return;
    }

    const span = jQueryRoll.find(".dice .part-total");
    let spanText = span.text();
    span.text(spanText + " + " + effects);
    span.append(
      `<img src='${DieCohorsChallenge.faceTextures[5]}' class='effect'/>`
    );
  }

  private static _getEffectCount(roll: Roll): number {
    let effects: number = 0;

    for (const diceTerm of roll.dice) {
      for (const res of diceTerm.results as ChallengeDieResult[]) {
        if (res.effect) {
          effects++;
        }
      }
    }

    return effects;
  }

  private static _isCoinRoll(roll: Roll): boolean {
    for (const term of roll.terms) {
      if (term instanceof DieCohorsCoin) {
        return true;
      }
    }

    return false;
  }

  private static _processCoinRoll(roll: Roll, jQueryRoll: JQuery): void {
    jQueryRoll.addClass("coin-roll");
  }

  // TODO Check if this the correct pattern. It seems that the modifiers should be declared in the custom Die class itself
  // private _configureDieModifiers(): void {
  //     Die.MODIFIERS['ef'] = function minResult(modifier) {
  //         this.results = this.results.flatMap((result) => {
  //             if (result.result < 5) {
  //                 result.active = false
  //                 result.discarded = true
  //             }
  //             DiceTerm._applyCount(this.results, '>', 4, { flagSuccess: true })
  //             return [result]
  //         })
  //     }

  //     Die.MODIFIERS['sum'] = function minResult(modifier) {
  //         this.results = this.results.flatMap((result) => {
  //             if (result.result == 1 || result.result == 5 || result.result == 6) {
  //                 result.active = true
  //                 result.discarded = false
  //                 result.success = true
  //                 result.count = 1
  //             } else if (result.result == 2) {
  //                 result.active = true
  //                 result.discarded = false
  //                 result.success = true
  //                 result.count = 2
  //             } else {
  //                 result.active = true
  //                 result.discarded = true
  //                 result.success = false
  //                 result.count = 0
  //             }

  //             //DiceTerm._applyCount(this.results, '>', 4, {flagSuccess: true});
  //             return [result]
  //         })
  //     }
  // }
}
