import { SkillRollCommand } from "./skill-roll.command.mjs";

export class CommandManager {
  public static registerCommands(): void {
    (game as any).commands = {
      SkillRollCommand,
    };
  }
}
