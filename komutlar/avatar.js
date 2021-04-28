const Discord = require('discord.js');

exports.run = async (client, message, args) => {// can#0002

let target = message.mentions.users.first() || message.author;
message.channel.send(new Discord.MessageEmbed()

                     .setColor("BLUE").setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
.setTitle('Merhaba, Avatarınız Aşşağıda')
.setImage(target.displayAvatarURL({ dynamic: true, size: 512 })));
                     
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['av'],
  permLevel: 0
};
 
exports.help = {
  name: 'avatar'
};// codare 