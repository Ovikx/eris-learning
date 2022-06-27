import Eris from 'eris';

const bot: Eris.Client = require('../core/bot');
const events: Function[] = require('../utils/EventLoader');

bot.connect();