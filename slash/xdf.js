import { MessageEmbed } from "discord.js";

const dice = [
  { result: -1, emoji: `<:dF1:763476980363427840>` },
  { result: 0, emoji: `<:dF0:763476296763179078>` },
  { result: 1, emoji: `<:dF1:763476296805777431>` },
];

function getDieResult() {
  return dice[Math.floor(Math.random() * 3)];
}

export const data = {
  "name": "xdf",
  "description": "Roll an arbitrary number of Fate dice",
  "options": [
    {
      "type": 4,
      "name": "df",
      "description": "How many dice do you want to roll?",
      "required": true
    },
    {
      "type": 3,
      "name": "desc",
      "description": "description of the action",
      "required": false
    }
  ]
}

export const callback = (options) => {
  let opts = {};
  if (options) {
    for (const {name, value} of options) {
      opts[name] = value;
    }
  }
  console.log(opts);
  const dice = [];
  do {
    dice.push(getDieResult())
  } while (dice.length < opts.df);

  let emojis = [];
  dice.forEach(die => emojis.push(die.emoji))
  const embed = slashEmbed(emojis, opts);
  return embed;
}

function slashEmbed(emoji, opts) {
  const embed = new MessageEmbed()
    .setColor("#4CB5FF")
    .setTitle(`You rolled ${opts.df} Fate dice!`)
    .setDescription(`${emoji.join(" ")}`)
  if (opts.desc) {
    embed.setAuthor( `"${opts.desc}"`, '');
    
  }
  return embed;
}