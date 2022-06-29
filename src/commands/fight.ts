import Eris, { Constants } from "eris";
import { create } from "ts-node";
import { randRange, sleep } from "../utils/essentials";

class Player {
    health: number;
    constructor(health: number = 100) {
        this.health = health;
    }
}

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    let user = new Player();
    let enemy = new Player();
    let components = [
        {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
                {
                    type: Constants.ComponentTypes.BUTTON,
                    custom_id: 'attack',
                    style: Constants.ButtonStyles.PRIMARY,
                    label: 'Attack',
                    disabled: false
                }
            ]
        }
    ]

    function ongoingEmbed() {
        return [
            {
                title: 'Fight!',
                description: 'Just win bro',
                author: {
                    name: interaction.member?.username ?? '',
                    icon_url: interaction.member?.avatarURL
                },
                color: 0x3e43cf,
                fields: [
                    {
                        name: 'You',
                        value: String(user.health),
                        inline: true
                    },
                    {
                        name: 'Enemy',
                        value: String(enemy.health),
                        inline: true
                    }
                ]
            }
        ];
    }

    function winEmbed() {
        return [
            {
                title: 'You won!',
                description: 'YOU DID IT OMG',
                author: {
                    name: interaction.member?.username ?? '',
                    icon_url: interaction.member?.avatarURL
                },
                color: 0x00ff00,
                fields: [
                    {
                        name: 'You',
                        value: String(user.health),
                        inline: true
                    },
                    {
                        name: 'Enemy',
                        value: String(enemy.health),
                        inline: true
                    },
                    {
                        name: 'REWARDS:',
                        value: 'absolutely nothing lol',
                        inline: false
                    }
                ]
            }
        ];
    }

    function loseEmbed() {
        return [
            {
                title: 'You lost...',
                description: 'loser lol',
                author: {
                    name: interaction.member?.username ?? '',
                    icon_url: interaction.member?.avatarURL
                },
                color: 0xff0000,
                fields: [
                    {
                        name: 'You',
                        value: String(user.health),
                        inline: true
                    },
                    {
                        name: 'Enemy',
                        value: String(enemy.health),
                        inline: true
                    },
                    {
                        name: 'REWARDS:',
                        value: 'absolutely nothing lol',
                        inline: false
                    }
                ]
            }
        ];
    }

    await interaction.acknowledge();
    const msg = await interaction.createFollowup({
        embeds: ongoingEmbed(),
        components: components
    });

    async function onClick(buttonClick: Eris.Interaction) {
        if (buttonClick instanceof Eris.ComponentInteraction && buttonClick.message.id === msg.id) {
            
            components[0].components[0].disabled = true;
            enemy.health -= Math.floor(20*randRange(1, 1.5));
            if (enemy.health <= 0) {
                await buttonClick.editParent({
                    embeds: winEmbed(),
                    components: []
                });
                bot.removeListener('interactionCreate', onClick);
                return
            }
            if (user.health <= 0) {
                await buttonClick.editParent({
                    embeds: loseEmbed(),
                    components: []
                });
                bot.removeListener('interactionCreate', onClick);
                return
            }

            await buttonClick.editParent({
                embeds: ongoingEmbed(),
                components: components
            });

            user.health -= Math.floor(20*randRange(1, 1.5));

            await sleep(1500);
            components[0].components[0].disabled = false;

            if (enemy.health <= 0) {
                await buttonClick.editParent({
                    embeds: winEmbed(),
                    components: []
                });
                bot.removeListener('interactionCreate', onClick);
                return
            }
            if (user.health <= 0) {
                await buttonClick.editParent({
                    embeds: loseEmbed(),
                    components: []
                });
                bot.removeListener('interactionCreate', onClick);
                return
            }

            await buttonClick.editParent({
                embeds: ongoingEmbed(),
                components: components
            });
        }
    }

    bot.on('interactionCreate', onClick);
}

module.exports = {
    config: {
        name: 'fight',
        description: 'Fight an enemy.',
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    action: command
}