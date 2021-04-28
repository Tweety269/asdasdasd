const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Davetleri göremiyorum yeterli iznim yok');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`<@!${invites.inviter.id}> 丨  ${invites.uses}`)
    })

    const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.addField('Davet Sıralaması',`${possibleinvites.join('\n')}`)
        .setTimestamp();
    message.channel.send(embed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet-sırası","davet-sıra"],
  permLevel: 0
};
exports.help = {
  name: 'davet-sıralaması',
  description: 'Sunucunuza en çok kullanıcı getirenleri sıralar.',
  usage: 'davet-sıralaması',
};