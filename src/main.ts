import Eris, { Interaction } from 'eris';
import CommandCreator from './utils/CommandCreator';
import { Import } from './interfaces';

const bot: Eris.Client = require('./bot');
const events: Function[] = require('./utils/EventLoader');

bot.connect();