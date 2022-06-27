import Eris from 'eris';
//const Eris = require('eris');
import { sleep } from '../utils/essentials';
const dotenv = require('dotenv');
dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const guildID: string = process.env.TESTING_GUILD_ID ?? '';
const bot: Eris.Client = new Eris.Client(token, {
    intents: [],
    messageLimit: 100
});

module.exports = bot;