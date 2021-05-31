import { readdirSync } from 'fs';
import { Client, Collection } from 'discord.js';
import { prefix } from './config.js';
import { token } from './token.js';

const client = new Client();
client.commands = new Collection();
client.slashCommands = new Collection();
const cooldowns = new Collection();

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
const slashFiles = readdirSync('./slash').filter(file => file.endsWith('.js'));

slashFiles.forEach( async (file) =>{
  const command = await import(`./slash/${file}`);
  client.slashCommands.set(command.data.name, command.callback);
  console.log(`Slash ${command.data.name} loaded!`);
});

commandFiles.forEach( async (file) =>{
  const {command} = await import(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(command.name, "loaded");
});

client.once('ready', () => {
  // console.log(client.commands);
  console.log('Ready!');
});

client.on('message', message => {
  if(!message.content.startsWith(`${prefix}`) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  };

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});


client.ws.on('INTERACTION_CREATE', async (interaction) => {
  if(client.slashCommands.get(interaction.data.name)) {
    const data = await client.slashCommands.get(interaction.data.name)(interaction.data);
    client.api.interactions(interaction.id, interaction.token).callback.post({ data });
  }      
});

client.login(token);
