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

function generateEmbed(diceArr, textResult, initialNum) {
  const embed = new Discord.MessageEmbed()
    .setColor("#4CB5FF")
    .setTitle(`You got a ${textResult} result!`)
    .setDescription(`${diceArr.join(" ")} ${initialNum < 0 ? '' : '+'} ${initialNum}`);
  return embed;
}


module.exports = {
  name: "roll",
  description: "roll 4dF and add an optional number to the result",
  aliases: ["r", "dice"],
  usage: " [optional number]",
  cooldown: 5,
  execute(message, args) {
    if (args[0] && isNaN(parseInt(args[0]))) { message.reply('you need to add an actual number to the roll!');
      return; }
    const initialNumber = parseInt(args[0]) || 0;
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

    const embedMessage = generateEmbed(diceRoll, textResult, initialNumber);
    message.reply({embed: embedMessage});
  },
};
