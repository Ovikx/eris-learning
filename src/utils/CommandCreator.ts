import Eris from "eris";
import { Import } from "./types";

const bot: Eris.Client = require('../core/bot');
const cmds: Import[] = require('./CommandCompiler');

export default class CommandCreator {
    async createCommands(global: boolean) {
        let configs: Eris.ApplicationCommandStructure[] = [];
        cmds.forEach((cmd: Import) => {
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
