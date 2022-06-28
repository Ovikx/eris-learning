import Eris, { Constants } from "eris";

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    let state = 0;
    const components = [
        {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
                {
                    type: Constants.ComponentTypes.BUTTON,
                    style: Constants.ButtonStyles.SUCCESS,
                    custom_id: 'increase',
                    label: 'Increase',
                    disabled: false
                },
                {
                    type: Constants.ComponentTypes.BUTTON,
                    style: Constants.ButtonStyles.DANGER,
                    custom_id: 'decrease',
                    label: 'Decrease',
                    disabled: false
                }
            ]
        }
    ];
    await interaction.acknowledge();
    const msg = await interaction.createFollowup({
        content: `Counter: ${state}`,
        components: components
    });

    async function countChange(buttonClick: any) {
        if (buttonClick instanceof Eris.ComponentInteraction && buttonClick.message.id === msg.id) {
            state += buttonClick.data.custom_id === 'increase' ? 1 : -1;
            console.log('button called');
            if (state >= 3) {
                bot.removeListener('interactionCreate', countChange);
                console.log('State is greater than 3, removed listener');
                components[0].components[0].disabled = true;
                components[0].components[1].disabled = true;
            }
            
            buttonClick.editParent({
                content: `Counter: ${state}`,
                components: components
            });
        }
        
    }

    bot.on('interactionCreate', countChange);
}

module.exports = {
    config: {
        name: 'counter',
        description: 'Sets up an interactive counter. Once it hits 3, it\'ll disable itself.',
        type: Constants.ApplicationCommandTypes.CHAT_INPUT,
    },
    action: command
}