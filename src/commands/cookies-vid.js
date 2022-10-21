const Discord = require('discord.js')
const fs = require('fs');


module.exports = {
    commands: ['video', 'vid', 'v', 'action'],
    callback: (message, arguments, text) => {
        
        try {
            var video = fs.readFileSync("./src/cookies/cookieVid.txt", 'utf-8')
            var v = video.split('\n')
            v.filter(n => n)
            console.log(v);

            message.channel.send('(っ◔◡◔)っ 🍪 𝐂𝐑𝐔𝐌𝐁𝐋 𝐂𝐎𝐎𝐊𝐈𝐄𝐒 𝐎𝐅 𝐓𝐇𝐄 𝐖𝐄𝐄𝐊 🍪ヽ(◕◡◕ヽ)\n' + v).then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 300000)
            })
                .catch(console.error);
            setTimeout(() => message.delete().catch(console.error), 300000);
        } catch (error) {
            console.error(error);
            message.channel.send("cookies not loaded yet, please try again later...").then(msg => {
                setTimeout(() => msg.delete(), 3000)
            })
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
    },
}