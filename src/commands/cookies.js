const Discord = require('discord.js')
var fs = require('fs');

module.exports = {
    commands: ['cookies', 'descriptions', 'c', 'week', 'weekly', 'd'],
    //expectedArgs: '<num1> <num2>',
    //permissionError: 'You need admin permissions to run this command',

    callback: (message, arguments, text) => {

        //gets cookies from cookies.txt
        var cookies = fs.readFileSync("./src/cookies/cookieNames.txt", 'utf-8')
        var b = cookies.split('\n')
        b.filter(n => n)

        //gets descriptions from descs.txt
        var descs = fs.readFileSync("./src/cookies/cookieDescs.txt", 'utf-8')
        var d = descs.split('\n')
        d.filter(n => n)

        //takes out blank lines in text
        var arr = []
        var j = 0
        for (let i = 0; i < d.length; i++) {
            if (d[i] != '\r') {
                arr[j] = d[i];
                j++;
            }
        }
        const embed2 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('(っ◔◡◔)っ 🍪 𝐂𝐑𝐔𝐌𝐁𝐋 𝐂𝐎𝐎𝐊𝐈𝐄𝐒 𝐎𝐅 𝐓𝐇𝐄 𝐖𝐄𝐄𝐊 🍪ヽ(◕◡◕ヽ)')
            .setURL('https://crumblcookies.com/')

            //.setDescription('Some description here')

            .addFields(
                { name: b[0], value: arr[0], inline: true },
                //{ name: '\u200B', value: '\u200B' },
                { name: b[1], value: arr[1], inline: true },
                { name: b[2], value: arr[2], inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: b[3], value: arr[3], inline: true },
                { name: b[4], value: arr[4], inline: true },
                { name: b[5], value: arr[5], inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: '*Use .vid or .pic to see the cookies in action*', value: '\u200B', inline: false },
                //{ name: 'Inline field title', value: 'Some value here', inline: true },
            )
            //.addField('Inline field title', 'Some value here', true)
            .setTimestamp()
            .setFooter('https://crumblcookies.com/ - use \".help\" to see all commands', 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/120138023_215008373372245_3640239247089399571_n.png?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=uTcO5QSonakAX9u_JHb&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-vs1LvK1JseVVryZ7l3m-kJPV1XaTbnCvWE87olF_-Pg&oe=61E521FB');

        message.channel.send({ embeds: [embed2] }).then(msg => {
            setTimeout(() => msg.delete().catch(console.error), 300000)
        })
            .catch(console.error);
        setTimeout(() => message.delete().catch(console.error), 300000);


        console.log('sending cookies');
    },

}


