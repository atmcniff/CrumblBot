module.exports = {
    commands: ['add', 'addition'],
    description: 'adds 2 numbers',
    expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const num1 = +arguments[0]
        const num2 = +arguments[1]

        message.channel.send(`The sum is ${num1 + num2}`).then(msg => {
            setTimeout(() => msg.delete().catch(console.error), 300000)
        })
            .catch(console.error);
        setTimeout(() => message.delete().catch(console.error), 300000);
    },
    permissions: '',
    requiredRoles: [],
}