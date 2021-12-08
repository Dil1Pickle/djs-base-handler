const { guilds } = require('../../index')
const Client = require('../../index'),
    {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js'),
    db = require('../../models/muterole')

module.exports = {
    name: 'channel',
    description: 'Moderate a user',
    options: [
        {
            name: 'channel',
            description: 'the channel',
            type: 'CHANNEL',
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {string[]} args
     */
    run: async (client, interaction, args) => {
        let channel = interaction.options.getChannel('channel')

        let embed = new MessageEmbed().setColor("BLUE").setDescription('Please choose an action.')
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId('lock').setLabel('Lock').setStyle('PRIMARY').setEmoji('🔒').setDisabled(state),
                new MessageButton().setCustomId('unlock').setLabel('Unlock').setStyle('PRIMARY').setEmoji('🔓').setDisabled(state),
                new MessageButton().setCustomId('slowmode').setLabel('Slowmode').setStyle('PRIMARY').setEmoji('🕙').setDisabled(state),
               
            )
        ]

        const slowmomenu = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId('slowmodemenu')
                .setPlaceholder('No Amount Of Time Selected.')
                .addOptions([
                    {
                        label: 'Off',
                        description: 'This is a description',
                        value: '0',
                    },
                    {
                        label: '5s',
                        description: 'This is also a description',
                        value: '5',
                    },
                    {
                        label: '10s',
                        description: 'This is a description',
                        value: '10',
                    },
                    {
                        label: '15s',
                        description: 'This is also a description',
                        value: '15',
                    },
                    {
                        label: '30s',
                        description: 'This is a description',
                        value: '30',
                    },
                    {
                        label: '1m',
                        description: 'This is also a description',
                        value: '60',
                    },
                    {
                        label: '2m',
                        description: 'This is a description',
                        value: '120',
                    },
                    {
                        label: '5m',
                        description: 'This is also a description',
                        value: '300',
                    },
                    {
                        label: '10m',
                        description: 'This is a description',
                        value: '600',
                    },
                    {
                        label: '15m',
                        description: 'This is also a description',
                        value: '900',
                    },
                    {
                        label: '30m',
                        description: 'This is a description',
                        value: '1800',
                    },
                    {
                        label: '1h',
                        description: 'This is also a description',
                        value: '3600',
                    },
                    {
                        label: '2h',
                        description: 'This is a description',
                        value: '7200',
                    },
                    {
                        label: '6h',
                        description: 'This is also a description',
                        value: '21600',
                    },
                ]),
            )
        ]

        await interaction.reply({embeds: [embed], components: components(false)})

        const filter = (i) => i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({filter, time: 30000})


        collector.on('collect', async (i) => {
            if (i.customId === 'lock') {
                if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`MANAGE_CHANNELS\` permission to use this command.`).setColor('RED')], ephemeral: true})

                // let role = interaction.guild.roles.cache.some(role.name === 'Member') 
    
                channel.permissionOverwrites.create('896380155512115230', {
                    SEND_MESSAGES: true
                  })
        
        
                  channel.permissionOverwrites.edit('896380155512115230', { SEND_MESSAGES: false });
                const embed1 = new MessageEmbed().setColor("BLUE").setDescription(`Successfully Locked ${channel.toString()}!`)
                i.update({embeds: [embed1]})
            } else if (i.customId === 'unlock') {
                if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`MANAGE_CHANNELS\` permission to use this command.`).setColor('RED')], ephemeral: true})

                //let role = interaction.guild.roles.cache.some(role.id === "896380155512115230");
    
                channel.permissionOverwrites.create('896380155512115230', {
                    SEND_MESSAGES: false
                  })
        
        
        
                  channel.permissionOverwrites.edit('896380155512115230', { SEND_MESSAGES: true });

                const embed2 = new MessageEmbed().setColor("BLUE").setDescription(`Successfully Unlocked ${channel.toString()}!`)
                i.update({embeds: [embed2]})
            } else if (i.customId === 'slowmode') {
                if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`MANAGE_CHANNELS\` permission to use this command.`).setColor('RED')], ephemeral: true})
               interaction.channel.send({content: "Choose a Amount Of Time", components: slowmomenu(false)})
               
            const embed3 = new MessageEmbed().setColor("BLUE").setDescription(`Please Select a Amount Of Slowmode Below!`)
            i.update({embeds: [embed3]})
            }  else if (i.customId === 'slowmodemenu') {
                const value = i.values[0]
                interaction.channel.setRateLimitPerUser(value)
                

             interaction.channel.send({ content: `Slowmode set to \`${value}\` seconds.`, components: [] });
                i.deferUpdate()
            }
        })
        collector.on('end', () => {
            interaction.editReply({components: components(true)})
        })

        

    }
}
