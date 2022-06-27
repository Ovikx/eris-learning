import Eris from "eris";
import { SlashCommand } from "../interfaces";
const bot: Eris.Client = require('../bot');

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