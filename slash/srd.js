import { MessageEmbed } from 'discord.js';

const srdLinks = (fields) => { 
let included;
  switch(fields){
    case 'core':
      included = [{name: "\u200B", value: '[Fate Core](https://fate-srd.com/fate-core/basics)'},
      {name: "\u200B", value: '[Fate Accelerated](https://fate-srd.com/fate-accelerated/get-started)'},
      {name: "\u200B", value: '[Fate Condensed](https://fate-srd.com/fate-condensed/introduction)'}];
      break;
    case 'settings':
      included = [{name: "\u200B", value: '[Atomic Robo](https://fate-srd.com/atomic-robo)'},
      {name: "\u200B", value: '[Venture City](https://fate-srd.com/venture-city)'},
      {name: "\u200B", value: '[War of Ashes](https://fate-srd.com/war-of-ashes)'},
      {name: "\u200B", value: '[#iHunt](https://fate-srd.com/ihunt)'},
      {name: "\u200B", value: '[Frontier Spirit](https://fate-srd.com/frontier-spirit)'},
      {name: "\u200B", value: '[Gods and Monsters](https://fate-srd.com/gods-and-monsters)'},
      {name: "\u200B", value: '[Sails Full of Stars](https://fate-srd.com/sails-full-of-stars)'},
      {name: "\u200B", value: '[Three Rocketeers](https://fate-srd.com/three-rocketeers)'}];
      break;
    case 'codex':
      included = [{name: "\u200B", value: '[Fate Codex Volume 1](https://fate-srd.com/fate-codex/fate-codex-volume-1)'},
      {name: "\u200B", value: '[Fate Codex Volume 2](https://fate-srd.com/fate-codex/fate-codex-volume-2)'},
      {name: "\u200B", value: '[Fate Codex Volume 3](https://fate-srd.com/fate-codex/fate-codex-volume-3)'}];
      break;
    case 'toolkits':
      included = [{name: "\u200B", value: '[Fate System Toolkit](https://fate-srd.com/fate-system-toolkit)'},
      {name: "\u200B", value: '[Fate Adversary Toolkit](https://fate-srd.com/fate-adversary-toolkit)'},
      {name: "\u200B", value: '[Odds & Ends](https://fate-srd.com/odds-and-ends)'}];
      break;
  }
  
  return new MessageEmbed()
    .setColor('#4CB5FF')
    .setTitle('Fate SRD Links')
    .setURL('https://fate-srd.com/')
    .addFields( included );
}

export const data = {
  "name": "srd",
  "description": "Links to the Fate SRD",
  "options": [
    {
      "type": 1,
      "name": "core",
      "description": "links to the core games",
      "options": []
    },
    {
      "type": 1,
      "name": "settings",
      "description": "links to Fate settings",
      "options": []
    },
    {
      "type": 1,
      "name": "codex",
      "description": "The Fate Codex links",
      "options": []
    },
    {
      "type": 1,
      "name": "toolkits",
      "description": "links to the Toolkits, odds & ends",
      "options": []
    }
  ]
}

export const callback = (interaction) => {
  return srdLinks(interaction[0].name);
}