const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
    commands: ['help', 'commands', '?'],
    description: 'Lists all commands. Can do \".?\" \"commands\"',
    type: 'list',
    callback: (message, arguments, text) => {
        const commandpath = path.join(__dirname)
        const files = fs.readdirSync(commandpath)
        console.log(files.toString())

        const embed = new Discord.MessageEmbed()
            .setColor('#00C09A')
            .setTitle('All Commands')

            .setTimestamp()
            .setFooter('\u200B', 'https://cdn.shopify.com/s/files/1/0603/4361/5740/products/Bumper_4_2048x.png?v=1637778920');

        embed.addFields(
            { name: `${config.prefix}vid`, value: `Video of this weeks cookies. Can use \"${config.prefix}v\" \"${config.prefix}video\"`, inline: true },
            { name: `${config.prefix}pic`, value: `Image of this week\'s cookies. Can use \"${config.prefix}p\" \"${config.prefix}pic\"`, inline: true },
            { name: `${config.prefix}cookies`, value: `All cookies with descriptions. Can use \"${config.prefix}b\" \"${config.prefix}c\" \"${config.prefix}cookies\" \"${config.prefix}week\"`, inline: true })

        for (const file of files) {

            const name = require(path.join(commandpath, file))
            if (name.type !== 'secret') {
                let description = name.description
                if (!description) description = '\u200B'
                embed.addField(config.prefix + name.commands[0], description, true)
            }

        }

        message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete().catch(console.error), 120000)
        })
            .catch(console.error);
        setTimeout(() => message.delete().catch(console.error), 120000);

    },

}
