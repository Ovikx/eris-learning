import Eris, { Constants } from 'eris';

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    let strArray: string[] = [];
    for (const [key, value] of Object.entries(process.memoryUsage())) {
        strArray.push(`${key}: ${value/1000000} MB`);
    }
    
    interaction.createMessage({
        embeds: [
            {
                title: 'Memory usage',
                description: strArray.join('\n')
            }
        ]
    });
}

module.exports = {
    config: {
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        name: 'memory',
        description: 'Prints the bot\'s current memory usage.'
    },
    action: command
}