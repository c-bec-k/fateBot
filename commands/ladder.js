const { prefix } = require("../config.json");
const { MessageEmbed } = require('discord.js')

const embeded = new MessageEmbed()
  .setColor('#4CB5FF')
  .setTitle('The Fate Ladder')
  .setDescription(`+8: Legendary
+7: Epic
+6: Fantastic
+5: Superb
+4: Great
+3: Good
+2: Fair
+1: Average
+0: Mediocre
–1: Poor
–2: Terrible
–3: Catastrophic
–4: Horrifying
`)
  .setURL('https://fate-srd.com/fate-condensed/getting-started#the-adjective-ladder');

module.exports = {
  name: "ladder",
  description: "shows you the Fate ladder",
  aliases: ["adjectives", "numbers"],
  usage: "",
  cooldown: 5,
  execute(message) {

    message.reply({embed: embeded});
  },
};