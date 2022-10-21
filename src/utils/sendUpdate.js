const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const updater = require('./updater.js')
const today = require('./today.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.siteUpdated = async (client) => {
    while (true) {

        if (updater.isUpdated()) {
            console.log("Site updated: " + today.getDateTime())
            try {
                //sends to every text chat named #general
                let channel = client.channels.cache
                channel.forEach(function (chan) {
                    if (chan.type === 'GUILD_TEXT' && chan.name === 'general') channel.get(chan.id).send(`(っ◔◡◔)っ 🍪 𝐍𝐄𝐖 𝐂𝐎𝐎𝐊𝐈𝐄𝐒 𝐇𝐀𝐕𝐄 𝐀𝐑𝐑𝐈𝐕𝐄𝐃 🍪ヽ(◕◡◕ヽ)\nSite updated: ${today.getDateTime()}\n*Check them out with \".cookies\" \".pic\" \".vid\"*`)
                    //.then(msg => {setTimeout(() => msg.delete(), 300000)})
                })
            } catch (err) {
                console.error(err.message);
            }


            await sleep(7200000);
        }
        await sleep(20000);
        console.log("Site not updated yet: " + today.getDateTime())
    }
}