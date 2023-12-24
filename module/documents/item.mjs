/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class FalloutItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  // async _preCreate(data, options, user) {
  //   await super._preCreate(data, options, user);
  //   if (data.type == "weapon") {
  //     let flags = {};
  //     flags['fallout.weaponQualities'] = duplicate(CONFIG.FALLOUT.WEAPONS.weaponQuality);
  //     flags['fallout.damageEffects'] = duplicate(CONFIG.FALLOUT.WEAPONS.damageEffect);
  //     this.data.update({ 'flags': flags });
  //   }
  // }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
  getRollData() {
    // If present, return the actor's roll data.
    if (!this.actor) return null;
    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  // async roll() {
  //   const item = this.data;

  //   // Initialize chat data.
  //   const speaker = ChatMessage.getSpeaker({ actor: this.actor });
  //   const rollMode = game.settings.get('core', 'rollMode');
  //   const label = `[${item.type}] ${item.name}`;

  //   // If there's no roll data, send a chat message.
  //   if (!this.system.formula) {
  //     ChatMessage.create({
  //       speaker: speaker,
  //       rollMode: rollMode,
  //       flavor: label,
  //       content: item.data.description ?? ''
  //     });
  //   }
  //   // Otherwise, create a roll and send a chat message from it.
  //   else {
  //     // Retrieve roll data.
  //     const rollData = this.getRollData();

  //     // Invoke the roll and submit it to chat.
  //     const roll = new Roll(rollData.item.formula, rollData).roll();
  //     roll.toMessage({
  //       speaker: speaker,
  //       rollMode: rollMode,
  //       flavor: label,
  //     });
  //     return roll;
  //   }
  // }


  /**
   * Handle send to chat clicks.
   * @param {Event} event   The originating click event
   * @private
   */
  async sendToChat(){    
    
    const itemData = duplicate(this.system);
    itemData._id = this._id;
    itemData.img = this.img;
    itemData.name = this.name;
    itemData.type = this.type;
    itemData.isPhysical = this.system.hasOwnProperty('weight')
    itemData.isSkill = this.type === "skill"
    itemData.isPerk = this.type === "perk"
    itemData.isWeapon = this.type === "weapon";
    itemData.isApparel = this.type === "apparel";
    itemData.isWeaponMod = this.type === "weapon_mod";
    itemData.isApparelMod = this.type === "apparel_mod";
    itemData.isConsumable = this.type === "consumable";
    itemData.isBook = this.type === "books_and_magz";
    itemData.isRobotArmor = this.type === "robot_armor";
    itemData.isRobotMod = this.type === "robot_mod";
    itemData.isDisease = this.type === "disease";

    const html = await renderTemplate("systems/fallout/templates/chat/item.html", itemData);
    const chatData = {
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: html,
    };
    if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
        chatData.whisper = ChatMessage.getWhisperRecipients("GM");
    } else if (chatData.rollMode === "selfroll") {
        chatData.whisper = [game.user];
    }
    ChatMessage.create(chatData);
  }
}
