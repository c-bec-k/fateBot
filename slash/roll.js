import { MessageEmbed } from "discord.js";

const dice = [
  { result: -1, emoji: `<:dF1:763476980363427840>` },
  { result: 0, emoji: `<:dF0:763476296763179078>` },
  { result: 1, emoji: `<:dF1:763476296805777431>` },
];

function getDieResult() {
  return dice[Math.floor(Math.random() * 3)];
}

const fateLadder = new Map([
  [-4, "Horrifying"],
  [-3, "Catastrophic"],
  [-2, "Terrible"],
  [-1, "Poor"],
  [0, "Mediocre"],
  [1, "Average"],
  [2, "Fair"],
  [3, "Good"],
  [4, "Great"],
  [5, "Superb"],
  [6, "Fantastic"],
  [7, "Epic"],
  [8, "Legendary"]
]);

export const data = {
  "name": "roll",
  "description": "roll 4dF and add an optional number to the result",
  "options": [
    {
      "type": 4,
      "name": "modifier",
      "description": "what number to add to the roll",
      "required": false
    },
    {
      "type": 3,
      "name": "description",
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
  const dice = [];
  do {
    dice.push(getDieResult())
  } while (dice.length < 4);

  const total = generateTotal(dice, opts);

  let emojis = [];
  dice.forEach(die => emojis.push(die.emoji))
  const text = generateTextResult(total);
  const embed = slashEmbed(text, emojis, total, opts);
  return embed;
}

function generateTotal(diceArr, opts) {
  let total = opts.modifier || 0;
  diceArr.forEach( die => {
    total += die.result
  })
  return total;
}

function generateTextResult(num) {
  const formattedNum = Intl.NumberFormat(undefined, {signDisplay: 'always'}).format(num);
  return `${(fateLadder.get(num)) ? `**${fateLadder.get(num)}** (${formattedNum})` : `${formattedNum}`}`;
}

function slashEmbed(textResult, emoji, total, opts) {
  const embed = new MessageEmbed()
    .setColor("#4CB5FF")
    .setTitle(`You got a${+total === 1 ? 'n' : +total === 7 ? 'n' : ''} ${textResult} result!`)
    .setDescription(`${emoji.join(" ")} ${opts.modifier < 0 ? '' : '+'}${opts.modifier || 0}`)
    // .setFooter(`${who.displayName}`, who.user.avatarURL());
  if (opts.description) {
    embed.setAuthor( `"${opts.description}"`, '');
    
  }
  return embed;
}