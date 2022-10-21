const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] })
const config = require('./config.json')
const sendUpdate = require('./utils/sendUpdate.js')
const commandbase = require('./commands/command-base.js')

require('dotenv').config()

client.on('ready', async () => {
    console.log('CrumblBot is online!')
    try {
        sendUpdate.siteUpdated(client);
    } catch (error) {
        console.error(error.message);
    }

})

client.on('messageCreate', async (message) => {
    try {

        if (message.content.startsWith(`${config.prefix}`)) {
            commandbase.runcommand(client, message)
        }
    } catch (error) {
        console.error(error.message);
    }
})

client.login(process.env.TOKEN)