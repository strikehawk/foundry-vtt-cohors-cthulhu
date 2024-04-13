import { ChatMessageSchema } from "foundry-vtt-types/common/documents/chat-message.js";

import { RollConfiguration } from "./hooks/roll-configuration.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { SystemData } from "./hooks/system-data.mjs";
import { SheetsConfiguration } from "./hooks/sheets-configuration.mjs";
import { CustomConfig } from "./hooks/system-config.mjs";

export abstract class HooksCohors {
  public static listen(): void {
    HooksCohors._init();
    HooksCohors._renderChatMessage();
  }

  private static _init(): void {
    CustomConfig.register();

    Hooks.once("init", async function () {
      // // Add utility classes to the global game object so that they're more easily
      // // accessible in global contexts.
      // game.fallout = {
      //   FalloutActor,
      //   FalloutItem,
      //   rollItemMacro,
      //   Roller2D20,
      //   Dialog2d20,
      //   DialogD6,
      //   FOHovers,
      //   APTracker
      // }

      // // Add custom constants for configuration.
      // CONFIG.FALLOUT = FALLOUT;
      // CONFIG.COHORS = COHORS;

      RollConfiguration.initialize();

      // Define custom Document classes
      // CONFIG.Actor.documentClass = FalloutActor
      // CONFIG.Item.documentClass = FalloutItem
      SystemData.register();

      // // Register custom system settings
      // registerSettings()

      // Register sheet application classes
      SheetsConfiguration.register();

      // Preload Handlebars templates.
      await preloadHandlebarsTemplates();
    });
  }

  private static _renderChatMessage(): void {
    Hooks.on(
      "renderChatMessage",
      (
        msg: ChatMessage,
        html: JQuery<HTMLElement>,
        data: SourceFromSchema<ChatMessageSchema>
      ) => {
        RollConfiguration.renderChatMessage(msg, html, data);
      }
    );
  }
}
