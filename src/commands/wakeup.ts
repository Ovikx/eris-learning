import Eris, { Constants } from "eris";
import { sleep } from "../utils/essentials";

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    let clicked = false;
    let msgComponents = [
        {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
                {
                    type: Constants.ComponentTypes.BUTTON,
                    style: Constants.ButtonStyles.PRIMARY,
                    custom_id: 'wake_up',
                    label: 'Wake up.',
                    disabled: false
                }
                
            ]    
        }
    ];

    await interaction.acknowledge();
    const msg = await interaction.createFollowup({
        content: 'Wake up',
        components: msgComponents
    });


    async function onClick(buttonClick: Eris.Interaction) {
        if (buttonClick instanceof Eris.ComponentInteraction && buttonClick.message.id === msg.id) {
            bot.removeListener('interactionCreate', onClick);
            await buttonClick.editParent({
                content: 'HEY BROO WELCOME!!',
                components: [
                    {
                        type: Constants.ComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: Constants.ComponentTypes.BUTTON,
                                style: Constants.ButtonStyles.SUCCESS,
                                custom_id: 'success',
                                label: 'Success!',
                                disabled: true
                            }
                            
                        ]    
                    }
                ]
            });
            clicked = true;
        }
    }

    bot.on('interactionCreate', onClick);
    await sleep(10000);
    if (clicked == false) {
        bot.editMessage(msg.channel.id, msg.id, {
            content: 'You didn\'t wake up.',
            components: []
        });
    }
}

module.exports = {
    config: {
        name: 'wakeup',
        description: 'Wake up.',
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    action: command
}