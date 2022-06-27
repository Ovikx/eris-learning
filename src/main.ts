import Eris, { Interaction } from 'eris';
import CommandCreator from './utils/CommandCreator';
import { Import } from './interfaces';

const bot: Eris.Client = require('./bot');
const GLOBAL = false;
const commandCreator = new CommandCreator();
const commands = commandCreator.getCommands().exports;

bot.on('ready', async () => {
    console.log('Bot has logged in!');
    commandCreator.createCommands(GLOBAL);
})

bot.on('interactionCreate', async (interaction) => {
    console.log('interaction received!');
    if (interaction instanceof Eris.CommandInteraction) {
        let matched = false;
        commands.every((cmd: Import) => {
            console.log(cmd.import.config.name);
            if (interaction.data.name == cmd.import.config.name) {
                cmd.import.action(bot, interaction);
                matched = true;
            }
            
            return matched == false;
        });
    }
})

bot.connect();