import Eris from "eris";
import { Import } from "./interfaces";
const fs = require('fs');

const dir = `${__dirname}/../events/`;
let imports: Function[] = [];
const files = fs.readdirSync(dir);

files.forEach((file: string) => {
    imports.push(require(`${dir}/${file}`))
});

module.exports = imports;