import Eris from "eris";
import CommandCreator from "../utils/CommandCreator";

const bot: Eris.Client = require('../bot');
const GLOBAL = false;
const commandCreator = new CommandCreator();

module.exports = 
bot.on('ready', async () => {
    console.log('Bot has logged in!');
    commandCreator.createCommands(GLOBAL);
});