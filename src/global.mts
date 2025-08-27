import { DiceSoNice } from "./hooks/roll-configuration.mjs";
import { CohorsConstant } from "./hooks/system-config.mjs";

export interface ConfiguredConfig
  extends Config<
    AmbientLightDocument<Scene | null>,
    ActiveEffect<Actor | Item | null>,
    Actor,
    ActorDelta<TokenDocument>,
    ChatLog,
    ChatMessage,
    Combat,
    Combatant<Combat | null, TokenDocument>,
    CombatTracker<Combat | null>,
    CompendiumDirectory,
    Hotbar,
    Item,
    Macro,
    MeasuredTemplateDocument<Scene | null>,
    TileDocument<Scene | null>,
    TokenDocument,
    WallDocument<Scene | null>,
    Scene,
    User,
    EffectsCanvasGroup
  > {
  COHORS: CohorsConstant;
}

export type ConfiguredCanvas = Canvas<
  Scene,
  AmbientLight<AmbientLightDocument<Scene>>,
  MeasuredTemplate<MeasuredTemplateDocument<Scene>>,
  Token<TokenDocument<Scene>>,
  EffectsCanvasGroup
>;

export type ConfiguredGame = Game<
  Actor<null>,
  Actors<Actor<null>>,
  ChatMessage,
  Combat,
  Item<null>,
  Macro,
  Scene,
  User
> & {
  dice3d?: DiceSoNice;
};

declare global {
  const CONFIG: ConfiguredConfig;
  const canvas: ConfiguredCanvas;

  namespace globalThis {
    // eslint-disable-next-line no-var
    var game: ConfiguredGame;
    // eslint-disable-next-line no-var
    var fu: typeof foundry.utils;

    // eslint-disable-next-line no-var
    var ui: FoundryUI<
      ActorDirectory<Actor<null>>,
      ItemDirectory<Item<null>>,
      ChatLog,
      CompendiumDirectory,
      CombatTracker<Combat | null>,
      Hotbar
    >;

    // Add functions to the `Math` namespace for use in `Roll` formulas
    interface Math {
      eq: (a: number, b: number) => boolean;
      gt: (a: number, b: number) => boolean;
      gte: (a: number, b: number) => boolean;
      lt: (a: number, b: number) => boolean;
      lte: (a: number, b: number) => boolean;
      ne: (a: number, b: number) => boolean;
      ternary: (
        condition: boolean | number,
        ifTrue: number,
        ifFalse: number
      ) => number;
    }
  }
}
