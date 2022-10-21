const Discord = require('discord.js')
const fs = require('fs');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const path = require('path');

module.exports = {
    commands: ['picture','cookies-image', 'image', 'img', 'pic', 'p', 'i'],
    callback: (message, arguments, text) => {

        (async () => {

            try {
                const image = await fs.readFileSync(path.join('./src/cookies/cookies.png'))
                const attachment = await new MessageAttachment(image)

                await message.channel.send({ files: ['./src/cookies/cookies.png'] }).then(msg => {
                    setTimeout(() => msg.delete().catch(console.error), 300000)
                })
                    .catch(console.error);
                setTimeout(() => message.delete().catch(console.error), 300000);
            } catch (error) {
                console.error(error);
                message.channel.send("Cookies not loaded yet, please try again later...").then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                })
            }

        })();
    },


}





