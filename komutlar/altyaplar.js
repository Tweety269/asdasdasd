

const Discord = require('discord.js');

exports.run = function(client, message) {
 
  var role = message.guild.roles.cache.find(role => role.name === "Altyapılar"); // verilecek rol ismi (isterseniz "role.name" yerine "role.id" yapıp "ROL" yazan yere rol id de yazabilirsiniz.
  if (message.member.roles.cache.has(role.id)) return message.channel.send(":warning: ***Beklenmedik Bir Hata Oluştu***\nHmm Sanırım Bu Role Zaten Sahipsiniz :)")
  message.member.roles.add(role);
  message.channel.send(`:white_check_mark: ${message.author} **Başarıyla \`Altyapılar\` Rolü Verildi!**\nEğer Bot Rolü Vermediyse Yetkiliyle İletişime Geçin. (https://discord.gg/JhBA8psGUR)`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['altyapı','altyapı'],
  permLevel: 0
};

exports.help = {
  name: 'altyapı',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'js'
};
//codare

