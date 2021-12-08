const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "sm",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'time',
            description: 'sm time',
            type: 'INTEGER',
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const time = interaction.options.getInteger('time')
        //interaction.followUp({ content: `${client.ws.ping}ms!` });
        interaction.channel.setRateLimitPerUser(time)
        interaction.reply(`Slowmode set to \`${time}\` seconds.`)
    
    },
};
