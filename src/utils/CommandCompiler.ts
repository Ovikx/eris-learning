import { Import } from "./types";
const fs = require('fs');

const dir = `${__dirname}/../commands/`;
let imports: Import[] = [];
const files = fs.readdirSync(dir);

files.forEach((file: string) => {
    imports.push({
        filename: file,
        import: require(`${dir}/${file}`)
    })
});

module.exports = imports;