import { APIMessage } from "discord.js";

const data = {
  "name": "button",
  "description": "Show some buttons to interact with!",
  "options": [
    {
      "type": 5,
      "name": "dave",
      "description": "should Dave be involved?",
      "required": false
    }
  ]
}

const button = {
  content: 'What do you want to do?',
  flags: 64,
  components: [
    {
      type: 1,
      components: [
        { 
          type: 2,
          style: 1,
          emoji: {id: "763476296805777431"},
          label: "Buttons are fun!",
          custom_id: 'blueButton'
        },
        { 
          type: 2,
          style: 3,
          label: "GREEN WOO!!",
          custom_id: 'greenButton'
        }
      ]
    }
  ]
}


const callback = (client, interaction) => {
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4, 
      data: button
    }
  });
}


export { data, callback };