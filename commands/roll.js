const Discord = require("discord.js");

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

function generateEmbed(diceArr, textResult, initialNum, quote) {
  const embed = new Discord.MessageEmbed()
    .setColor("#4CB5FF")
    .setTitle(`You got a ${textResult} result!`)
    .setDescription(`${diceArr.join(" ")} ${initialNum < 0 ? '' : '+'} ${initialNum}`);
  if (quote) {
    embed.setAuthor( quote, '');
  }
  return embed;
}

function findArgs(string) {
  const regex = /([-+]?[^'"])? ?(?:['"](.+)['"])?/;
  const args = string.match(regex);
  return args;
}

module.exports = {
  name: "roll",
  description: "roll 4dF and add an optional number to the result",
  aliases: ["r", "dice"],
  usage: " [optional number]",
  cooldown: 5,
  execute(message, args) {
    let [ignored, numToAdd, quote] = findArgs(args.join(' '));
    if (typeof(numToAdd) === 'undefined') numToAdd = 0;
    if (!numToAdd || isNaN(parseInt(numToAdd))) { return message.reply('you need to add an actual number to the roll!'); }
    const initialNumber = parseInt(numToAdd) || 0;
    let numberRolled = initialNumber;
    const diceRoll = [];
    let rollNumber = 4;
    while (rollNumber > 0) {
      const { result, emoji } = getDieResult();
      diceRoll.push(emoji);
      numberRolled += result;
      rollNumber--;
    }
    const textResult = fateLadder.has(numberRolled) ? `${fateLadder.get(numberRolled)} (${numberRolled < 0 ? '' : '+'}${numberRolled})` : `${numberRolled}`;

    const embedMessage = generateEmbed(diceRoll, textResult, initialNumber, quote);
    message.reply({embed: embedMessage});
  },
};
