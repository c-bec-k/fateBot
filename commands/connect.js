export const command = {
  name: "connect",
  description: "tells you how many servers are using Fate Bot",
  aliases: ["brag"],
  usage: "",
  cooldown: 5,
  execute(message, args, client) {
    const totalNumber = client.guilds.cache.size;
    message.reply(
      `**Fate Bot** is currently in ${totalNumber} server${totalNumber === 1 ? '' : 's'}!`
    );
  },
};
