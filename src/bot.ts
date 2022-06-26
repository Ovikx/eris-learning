import Eris from 'eris';
//const Eris = require('eris');
import { sleep } from './utils/essentials';
const dotenv = require('dotenv');
dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const guildID: string = process.env.TESTING_GUILD_ID ?? '';
const bot: Eris.Client = new Eris.Client(token, {
    intents: [],
    messageLimit: 100
});

module.exports.bot = bot;

bot.on('ready', async () => {
    console.log(`Logged in as ${String(bot.user)}`);
    const commands = await bot.getGuildCommands(guildID);
    

    console.log('adding commands');
    console.log(commands);
    await bot.bulkEditGuildCommands(
        guildID ?? '',
        [
            {
                name: 'print_repeat',
                description: 'Prints hello word `n` number of times!!!',
                type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
                options: [
                    {
                        name: 'string',
                        description: 'the string to repeat',
                        type: Eris.Constants.ApplicationCommandOptionTypes.STRING,
                        required: true,
                    },
                    {
                        name: 'repeat',
                        description: 'how many times the string should be repeated',
                        type: Eris.Constants.ApplicationCommandOptionTypes.INTEGER,
                        required: true,
                        min_value: 1,
                        max_value: 100

                    }
                ] as any[]
            }
        ]
    );
    console.log(commands);
    
});

bot.on('error', (err) => {
    console.log(err);
})

bot.on("interactionCreate", (interaction) => {
    if(interaction instanceof Eris.CommandInteraction) {
        switch(interaction.data.name) {
            case 'print_repeat':
                let arr: string[] = [];
                for (let i = 0; i < (interaction.data.options![1] as any).value; i++) {
                    arr.push((interaction.data.options![0] as any).value);
                }

                interaction.createMessage(arr.join('\n'));
                break;
            case "test_delete_command":
                interaction.createMessage("interaction recieved");
                return bot.deleteCommand(interaction.data.id);
            default: {
                return interaction.createMessage("interaction recieved");
            }
        }
    }
});

bot.connect();