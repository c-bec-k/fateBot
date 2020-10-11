const { prefix } = require("../config.json");
const { MessageEmbed } = require('discord.js');

const srdLinks = new MessageEmbed()
  .setColor('#4CB5FF')
  .setTitle('Fate SRD Links')
  .setURL('https://fate-srd.com/')
  .addFields(
    {name: "\u200B", value: '[Fate Core](https://fate-srd.com/fate-core/basics)'},
    {name: "\u200B", value: '[Fate Accelerated](https://fate-srd.com/fate-accelerated/get-started)'},
    {name: "\u200B", value: '[Fate Condensed](https://fate-srd.com/fate-condensed/introduction)'}
    )

module.exports = {
  name: "srd",
  description: "Links to the Fate SRD",
  aliases: ["cc", "ogl"],
  usage: "",
  cooldown: 5,
  execute(message) {
    message.reply({embed: srdLinks});
  },
};