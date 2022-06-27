import Eris from "eris";

module.exports = {
    config: {
        name: 'print',
        description: 'Prints "hello world!"',
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    action: async function (bot: Eris.Client, interaction: Eris.CommandInteraction) {
        interaction.createMessage('hello world!');
    }
}