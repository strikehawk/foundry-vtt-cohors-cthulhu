export class RollerDiceSoNice {
  public static async showDiceSoNice(roll: Roll): Promise<void> {
    if (
      game.modules.get("dice-so-nice") &&
      game.modules.get("dice-so-nice")?.active
    ) {
      const { whisper, blind } = RollerDiceSoNice.getRollModeSettings();

      await game.dice3d?.showForRoll(roll, game.user, true, whisper, blind);
    }
  }

  public static getRollModeSettings() {
    const rollMode: RollMode = game.settings.get("core", "rollMode");

    let blind = false;
    let whisper: string[] | undefined = undefined;

    switch (rollMode) {
      case "blindroll": {
        blind = true;
      }
      case "gmroll": {
        const gmList = game.users.filter((user) => user.isGM);
        const gmIDList: string[] = [];
        gmList.forEach((gm) => gmIDList.push(gm.id));
        whisper = gmIDList;
        break;
      }
      case "publicroll": {
        const userList = game.users.filter((user) => user.active);
        const userIDList: string[] = [];
        userList.forEach((user) => userIDList.push(user.id));
        whisper = userIDList;
        break;
      }
      case "selfroll": {
        whisper = [game.user.id];
        break;
      }
      default: {
        break;
      }
    }

    return { whisper, blind };
  }
}
