import Eris from "eris";
const db = require('../core/db');

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    const acknowledged: boolean = await db.addUser(interaction.member?.id);
    console.log(`User added: ${acknowledged}`);
    await interaction.createMessage('Acknowledged');

}

module.exports = {
    config: {
        name: 'start',
        description: 'Begin your adventure!',
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    action: command
}