// Invite: https://discord.com/api/oauth2/authorize?client_id=990291850051092491&scope=bot&permissions=8

import Eris from 'eris';
import { sleep } from './utils/essentials';
const dotenv = require('dotenv');

dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot: Eris.Client = new Eris.Client(token, {
    intents: ['guildMessages']
});

bot.on('ready', async () => {
    console.log(`Loaded bot in ${bot.guilds.size} servers`)
    console.log(bot.guilds);
});

bot.on('messageCreate', async (msg) => {
    if (msg.content === '!ping') {
        bot.createMessage(msg.channel.id, 'Pong!');
    }
})

bot.connect();

