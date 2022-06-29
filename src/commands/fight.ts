import Eris, { Constants } from "eris";
import { randRange, sleep } from "../utils/essentials";

class Player {
    name: string;
    health: number;
    constructor(
        name: string,
        health: number = 100
    ) {
        this.name = name;
        this.health = health;
    }
}

async function command(bot: Eris.Client, interaction: Eris.CommandInteraction) {
    let user = new Player(interaction.member?.username ?? 'Player');
    let enemy = new Player('Enemy');
    let ongoing = true;

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
                    name: user.name,
                    icon_url: interaction.member?.avatarURL
                },
                color: 0x3e43cf,
                fields: [
                    {
                        name: user.name,
                        value: String(user.health),
                        inline: true
                    },
                    {
                        name: enemy.name,
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
                        name: user.name,
                        value: String(user.health),
                        inline: true
                    },
                    {
                        name: enemy.name,
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
                        name: user.name,
                        value: String(user.health),
                        inline: true
                    },
                    {
                        name: enemy.name,
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

    async function makeMove(attacker: Player, target: Player, buttonClick: Eris.ComponentInteraction) {
        target.health -= Math.floor(50*randRange(1,1.5));
        const postMoveMsg = checkedEmbed(buttonClick);
        buttonClick.editParent({
            embeds: postMoveMsg.embeds,
            components: postMoveMsg.components
        });
    }

    function checkedEmbed(buttonClick: Eris.ComponentInteraction) {
        let embed = ongoingEmbed();
        let comps = components;

        if (user.health <= 0) {
            embed = loseEmbed();
        }
        if (enemy.health <= 0) {
            embed = winEmbed();
        }

        if (user.health <= 0 || enemy.health <= 0) {
            bot.removeListener('interactionCreate', onClick);
            comps = [];
            ongoing = false;
        }

        return {embeds: embed, components: comps};
    }

    await interaction.acknowledge();
    const msg = await interaction.createFollowup({
        embeds: ongoingEmbed(),
        components: components
    });

    async function onClick(buttonClick: Eris.Interaction) {
        if (buttonClick instanceof Eris.ComponentInteraction && buttonClick.message.id === msg.id) {
            
            components[0].components[0].disabled = true;
            await makeMove(user, enemy, buttonClick);
            if (!ongoing) {
                return;
            }
            await sleep(1500);
            components[0].components[0].disabled = false;
            await makeMove(enemy, user, buttonClick);
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