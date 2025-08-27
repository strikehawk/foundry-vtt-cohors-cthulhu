import { SkillRollDialog } from "../applications/skill-roll.mjs";

export class SkillRollCommand {
  public static execute(): void {
    new SkillRollDialog().render(true);
  }
}
