import Eris from "eris";

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    interaction.createMessage('hello world!');
}

module.exports = {
    config: {
        name: 'print',
        description: 'Prints "hello world!"',
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    action: command
}