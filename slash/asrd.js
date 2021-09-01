
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
    "name": "asrd",
    "description": "show links to the Fate SRD"
  }

const reply = {
  content: "[SRD Links](https://fate-srd.com)",
  components: [
    {
      type: 1,
      components: [
        {
        type: 2,
        style: 5,
        label: "Fate Core",
        url: "https://fate-srd.com/fate-core/basics"
        },
        {
          type: 2,
          style: 5,
          label: "Fate Accelerated",
          url: "https://fate-srd.com/fate-accelerated/get-started"
          },
          {
            type: 2,
            style: 5,
            label: "Fate Condensed",
            url: "https://fate-srd.com/fate-condensed/introduction"
          },
      ],
    }
  ]
}

export const callback = (interaction) => {
  return reply
}