import Eris from "eris";
import { SlashCommand, ImportCompliation, Import } from "../interfaces";
import { sleep } from "./essentials";
const dotenv = require('dotenv');
dotenv.config();

const bot: Eris.Client = require('../bot');
const cmds: ImportCompliation = require('./CommandCompiler');
const guildID: string = process.env.TESTING_GUILD_ID ?? '';
/* cmds.forEach((cmd: SlashCommand) => {
    console.log(cmd);
}); */
console.log(cmds.exports[0].import.config.options);
