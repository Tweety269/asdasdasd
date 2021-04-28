

const Discord = require('discord.js');

exports.run = function(client, message) {
 
  var role = message.guild.roles.cache.find(role => role.name === "Atalantis Community"); // verilecek rol ismi (isterseniz "role.name" yerine "role.id" yapıp "ROL" yazan yere rol id de yazabilirsiniz.
  if (message.member.roles.cache.has(role.id)) return message.channel.send(":mag_right: | Bu Discord Sunucusuna Zaten **Kayıtlısınız.**")
  message.member.roles.add(role);
  message.channel.send(`:inbox_tray: | **Discord Sunucumuza Yeni Birisi Kayıt Oldu!**\n:warning: | Kayıt Olan Discord Kullanıcısı: "${message.author}"\n:white_check_mark: | Kayıt Olduğu Discord Sunucusu: \`Atalantis Botlist Clôud\``)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayitol','kayit'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtol',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'js'
};
//codare

