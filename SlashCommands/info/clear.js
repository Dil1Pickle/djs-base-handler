const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "clear",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'channel',
            description: 'Channel',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'amount',
            description: 'amount',
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
        const amount = interaction.options.getInteger('amount')
        const channel = interaction.options.getChannel('channel')
        //interaction.followUp({ content: `${client.ws.ping}ms!` });
        interaction.channel.bulkDelete(amount).catch(console.error);
            interaction.reply(`Cleared \`${amount}\` Messages In ${channel.toString()}!`)
    
    },
};
