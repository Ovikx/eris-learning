import Eris from 'eris';
const dotenv = require('dotenv');
dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot: Eris.Client = new Eris.Client(token, {
    intents: [],
    messageLimit: 100
});

module.exports = bot;