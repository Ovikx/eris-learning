import Eris from "eris";
import { SlashCommand, ImportCompliation, Import } from "../interfaces";

const bot: Eris.Client = require('../bot');
const cmds: ImportCompliation = require('./CommandCompiler');

export default class CommandCreator {
    async createCommands(global: boolean) {
        let configs: Eris.ApplicationCommandStructure[] = [];
        cmds.exports.forEach((cmd: Import) => {
            configs.push(cmd.import.config);
        });

        if (global) {
            bot.bulkEditCommands(configs);
        } else {
            const dotenv = require('dotenv');
            dotenv.config();
            const guildID: string = process.env.TESTING_GUILD_ID ?? '';
            bot.bulkEditGuildCommands(
                guildID,
                configs
            );
        }
    }

    getCommands() {
        return cmds;
    }
}
