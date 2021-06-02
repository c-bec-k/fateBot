const data = {
  "name": "invite",
  "description": "gives you the link to invite Fate Bot to another server!"
}

const callback = () => {
  return `[You can invite the bot with this link!](<https://discord.com/api/oauth2/authorize?client_id=763485934028718110&permissions=0&scope=bot%20applications.commands>)`
}


export { data, callback };