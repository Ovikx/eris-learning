import Eris from 'eris';
import { sleep } from './utils/essentials';
const dotenv = require('dotenv');
dotenv.config()

const token: string = process.env.BOT_TOKEN ?? '';
const bot: Eris.Client = new Eris.Client(token, {
    intents: ['guildMessages'],
    messageLimit: 100
})

bot.on('ready', async () => {
    console.log(`Logged in as ${String(bot.user)}`);
    const commands = await bot.getCommands();
});

bot.on('messageCreate', async (msg) => {
    if (msg.content === 'hello') {
        bot.createMessage(msg.channel.id, 'AYOO');
    }
})

bot.connect();