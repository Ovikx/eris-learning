import Eris from "eris";
import { Import } from "../utils/types";
import CommandCreator from "../utils/CommandCreator";

const bot: Eris.Client = require('../core/bot');
const commandCreator = new CommandCreator();
const commands = commandCreator.getCommands();

bot.on('interactionCreate', async (interaction) => {
    if (interaction instanceof Eris.CommandInteraction) {
        console.log('command interaction received!');
        let matched = false;
        commands.every(async (cmd: Import) => {
            if (interaction.data.name == cmd.import.config.name) {
                await cmd.import.action(bot, interaction);
                matched = true;
            }
            
            return matched == false;
        });
    }
})