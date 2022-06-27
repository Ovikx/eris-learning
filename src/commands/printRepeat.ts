import Eris from "eris";
import { SlashCommand } from "../utils/types";
const bot: Eris.Client = require('../core/bot');

module.exports = {
    config: {
        name: 'printrepeat',
        description: 'Prints the specified `string` `repeat` number of times',
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
        options: [
            {
                name: 'string',
                description: 'The string to repeat',
                type: Eris.Constants.ApplicationCommandOptionTypes.STRING,
                required: true,
            },
            {
                name: 'repeat',
                description: 'How many times the string should be repeated',
                type: Eris.Constants.ApplicationCommandOptionTypes.INTEGER,
                required: true,
                min_value: 1,
                max_value: 100

            }
        ] as any[]
    },
    action: async function (bot: Eris.Client, interaction: Eris.CommandInteraction) {
        let arr: string[] = [];
        for (let i = 0; i < (interaction.data.options![1] as any).value; i++) {
            arr.push((interaction.data.options![0] as any).value);
        }

        interaction.createMessage(arr.join('\n'));
    }
}