import { ChatMessageSchema } from "foundry-vtt-types/common/documents/chat-message.js";

import { RollConfiguration } from "./hooks/roll-configuration.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { SystemData } from "./hooks/system-data.mjs";
import { SheetsConfiguration } from "./hooks/sheets-configuration.mjs";
import { CustomConfig } from "./hooks/system-config.mjs";
import { CommandManager } from "./commands/command.manager.mjs";

export abstract class HooksCohors {
  public static listen(): void {
    HooksCohors._init();
    HooksCohors._ready();
    HooksCohors._renderChatMessage();
  }

  private static _init(): void {
    CustomConfig.register();

    Hooks.once("init", async function () {
      RollConfiguration.initialize();

      SystemData.register();

      // // Register custom system settings
      // registerSettings()

      // Register sheet application classes
      SheetsConfiguration.register();

      // Preload Handlebars templates.
      await preloadHandlebarsTemplates();
    });
  }

  private static _ready(): void {
    Hooks.on("ready", () => {
      CommandManager.registerCommands();
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
