const { prefix } = require("../config.json");

module.exports = {
  name: "invite",
  description: "provides an invite link to add the bot to another server",
  aliases: ["join", "add"],
  usage: "",
  cooldown: 5,
  execute(message, args) {
    message.reply(
      `You can invite the bot with this link:
      <https://discord.com/oauth2/authorize?client_id=763485934028718110&scope=bot&permissions=280640>`
    );
  },
};
