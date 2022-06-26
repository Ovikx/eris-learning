import Eris from "eris";
const fs = require('fs');

interface Import {
    filename: string,
    import: any
}

const dir = `${__dirname}/../commands/`;
let imports: Import[] = [];

const files = fs.readdir(
    dir,
    (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(file => {
            imports.push(
                {
                    filename: file,
                    import: require(`${dir}/${file}`)
                }
            )
            console.log(imports);
        })
        module.exports.commands = imports;
    }
)

//console.log(imports);
//module.exports.exports = imports;