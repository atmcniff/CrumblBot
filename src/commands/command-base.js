 const fs = require('fs')
 const path = require('path')
 const { prefix } = require('../config.json')
 
 //all permissions
 const validatePermissions = (permissions) => {
     const validPermissions = [
         'CREATE_INSTANT_INVITE',
         'KICK_MEMBERS',
         'BAN_MEMBERS',
         'ADMINISTRATOR',
         'MANAGE_CHANNELS',
         'MANAGE_GUILD',
         'ADD_REACTIONS',
         'VIEW_AUDIT_LOG',
         'PRIORITY_SPEAKER',
         'STREAM',
         'VIEW_CHANNEL',
         'SEND_MESSAGES',
         'SEND_TTS_MESSAGES',
         'MANAGE_MESSAGES',
         'EMBED_LINKS',
         'ATTACH_FILES',
         'READ_MESSAGE_HISTORY',
         'MENTION_EVERYONE',
         'USE_EXTERNAL_EMOJIS',
         'VIEW_GUILD_INSIGHTS',
         'CONNECT',
         'SPEAK',
         'MUTE_MEMBERS',
         'DEAFEN_MEMBERS',
         'MOVE_MEMBERS',
         'USE_VAD',
         'CHANGE_NICKNAME',
         'MANAGE_NICKNAMES',
         'MANAGE_ROLES',
         'MANAGE_WEBHOOKS',
         'MANAGE_EMOJIS',
     ]
 
     for (const permission of permissions) {
         if (!validPermissions.includes(permission)) {
             throw new Error(`Unknown permission node "${permission}"`)
         }
     }
 }

 var ran = false
 
 function checkCommand(client, commandOptions, message) {
     let {
         commands = '',
         expectedArgs = '',
         permissionError = 'You do not have permission to run this command.',
         minArgs = 0,
         maxArgs = null,
         permissions = [],
         requiredRoles = [],
         callback,
     } = commandOptions
 
     // Ensure the command and aliases are in an array
     if (typeof commands === 'string') {
         commands = [commands]
     }
 
     // Ensure the permissions are in an array and are all valid
     if (permissions.length) {
         if (typeof permissions === 'string') {
             permissions = [permissions]
         }
 
         validatePermissions(permissions)
     }
 
     const { member, content, guild } = message
     for (const alias of commands) {
         const command = `${prefix}${alias.toLowerCase()}`
 
         if (
             content.toLowerCase().startsWith(`${command} `) ||
             content.toLowerCase() === command
         ) {
             // A command has been ran
 
             // Ensure the user has the required permissions
             for (const permission of permissions) {
                 if (!member.roles.cache.has(permission)) {
                     message.reply(permissionError).then(msg => {
                         setTimeout(() => msg.delete(), 10000)
                     })
                         .catch(console.error);
                     setTimeout(() => message.delete().catch(console.error), 10000);
                     return
                 }
             }
 
             // Ensure the user has the required roles
             for (const requiredRole of requiredRoles) {
                 const role = guild.roles.cache.find(
                     (role) => role.name === requiredRole
                 )
 
                 if (!role || !member.roles.cache.has(role.id)) {
                     message.reply(
                         `You must have the "${requiredRole}" role to use this command.`
                     ).then(msg => {
                         setTimeout(() => msg.delete(), 10000)
                     })
                         .catch(console.error);
                     setTimeout(() => message.delete().catch(console.error), 10000);
                     return
                 }
             }
 
             // Split on any number of spaces
             const arguments = content.split(/[ ]+/)
 
             // Remove the command which is the first index
             arguments.shift()
 
             // Ensure we have the correct number of arguments
             if (
                 arguments.length < minArgs ||
                 (maxArgs !== null && arguments.length > maxArgs)
             ) {
                 message.reply(
                     `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
                 ).then(msg => {
                     setTimeout(() => msg.delete(), 10000)
                 })
                     .catch(console.error);
                 setTimeout(() => message.delete().catch(console.error), 10000);
                 return
             }
 
             // Handle the custom command code
             try {
                 callback(message, arguments, arguments.join(' '), client)
                 console.log(`Running the ${command} command`)
                 ran = true;
             } catch (error) {
                 console.error(error)
             }
 
             return
         }
 
     }
 
 }
 
 module.exports.runcommand = (client, message) => {
 
     const baseFile = 'command-base.js'
 
 
     const readCommands = (dir) => {
 
         //store dirname/dir to files array
         const files = fs.readdirSync(dir)
        
         //for every item of the files array
         for (const file of files) {
 
             //stores dirname/dir/file in stat
             const stat = fs.lstatSync(path.join(dir, file))
 
             //checks if stat is a directory
             if (stat.isDirectory()) {
                 readCommands(path.join(dir, file))
             }
             //goes here once its not a directory
             //skips basefile
             else if (file !== baseFile) {
                 const option = require(path.join(dir, file))

                 //calls exported in command-base.js passing client and the file name in commands folder
                 checkCommand(client, option, message)
             }
         }
     }
 
     //runs  
     readCommands(__dirname)
 
     if (!ran) {
         console.log(`${message.content} not a working command`);
         message.channel.send('not a working command').then(msg => {
             setTimeout(() => msg.delete().catch(console.error), 300)
         })
             .catch(console.error);
         setTimeout(() => message.delete().catch(console.error), 1000);
     }
     ran = false;
 
 
 }