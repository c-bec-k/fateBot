import { MessageEmbed } from 'discord.js';

const srdLinks = new MessageEmbed()
  .setColor('#4CB5FF')
  .setTitle('Fate SRD Links')
  .setURL('https://fate-srd.com/')
  .addFields(
    {name: "\u200B", value: '[Fate Core](https://fate-srd.com/fate-core/basics)'},
    {name: "\u200B", value: '[Fate Accelerated](https://fate-srd.com/fate-accelerated/get-started)'},
    {name: "\u200B", value: '[Fate Condensed](https://fate-srd.com/fate-condensed/introduction)'}
    );

export const command = {
  name: "srd",
  description: "Links to the Fate SRD",
  aliases: ["cc", "ogl"],
  usage: "",
  cooldown: 5,
  execute(message) {
    message.reply({embed: srdLinks});
  },
};

export const data = {
  "name": "srd",
  "description": "Links to the Fate SRD"
}

export const callback = () => {
  return {
    type: 4,
    data: {
      embeds: [srdLinks]
    }
  }
}