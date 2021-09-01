import { readdirSync } from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import { token } from './token.js';

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
client.slashCommands = new Collection();

const slashFiles = readdirSync('./slash').filter(file => file.endsWith('.js'));

slashFiles.forEach( async (file) =>{
  const command = await import(`./slash/${file}`);
  client.slashCommands.set(command.data.name, command.callback);
  console.log(`Slash ${command.data.name} loaded!`);
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interaction', async (interaction) => {
  console.log(interaction); 
  if(client.slashCommands.get(interaction.commandName)) {
    const data = await client.slashCommands.get(interaction.commandName)(interaction.options);
    interaction.reply(data);
  }
});

client.login(token);
