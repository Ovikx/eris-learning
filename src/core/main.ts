import Eris, { Interaction } from 'eris';
import CommandCreator from '../utils/CommandCreator';
import { Import } from '../utils/types';

const bot: Eris.Client = require('../core/bot');
const events: Function[] = require('../utils/EventLoader');

bot.connect();