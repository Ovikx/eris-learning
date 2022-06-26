import Eris from "eris";

const dotenv = require('dotenv');
const bot: Eris.Client = require('../bot');
const cmds = require('./CommandCompiler');
dotenv.config();
console.log(cmds);

