import Eris from "eris";
import { Import } from "../utils/types";
import CommandCreator from "../utils/CommandCreator";

const bot: Eris.Client = require('../core/bot');
const commandCreator = new CommandCreator();
const commands = commandCreator.getCommands();

bot.on('interactionCreate', async (interaction) => {
    console.log('interaction received!');
    if (interaction instanceof Eris.CommandInteraction) {
        let matched = false;
        commands.every((cmd: Import) => {
            if (interaction.data.name == cmd.import.config.name) {
                cmd.import.action(bot, interaction);
                matched = true;
            }
            
            return matched == false;
        });
    }
})