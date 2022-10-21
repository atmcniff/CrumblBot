const Discord = require('discord.js')
module.exports = {
    commands: ['details',],
    description: 'Posts some details about the bot',
    callback: (message, arguments, text) => {
        const embed2 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('🍪 𝐂𝐑𝐔𝐌𝐁𝐋𝐁𝐋𝐁𝐎𝐓® 𝐁𝐘 𝐀𝐔𝐒𝐓𝐈𝐍 🍪')
            .setAuthor('A Captain Clap\'em® Production', 'https://external-preview.redd.it/Uy4d0R3nqa5Kk1r2DLh9EYN1QRMMDGDn-0EzrZdUZQk.jpg?auto=webp&s=711dbbc1ce97eb596083437cb94e48325454c10c', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription('CrumblBot® is made and maintained by Austin, aka Captain Clap\'em®')
            .setThumbnail('https://cdn.shopify.com/s/files/1/0603/4361/5740/products/Bumper_4_2048x.png?v=1637778920')

            .addField('Bot details', 'All command-related messages sent by users and this bot remain on the server for up to 5 minutes.')

            .setTimestamp()
            .setFooter('Version: 2.5.0 - use \".help\" to see all commands', 'https://cdn.shopify.com/s/files/1/0603/4361/5740/products/Bumper_4_2048x.png?v=1637778920');

        message.channel.send({ embeds: [embed2] }).then(msg => {
            setTimeout(() => msg.delete().catch(console.error), 300000)
        })
            .catch(console.error);
            setTimeout(() => message.delete().catch(console.error), 300000);
    },
}
