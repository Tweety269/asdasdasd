const Discord = require('discord.js');

exports.run = function(client, message) {

message.channel.send(`:mag_right:  ${message.author} **Nasıl Bot Eklerim**\nÖncelikle Adresinden https://botsfordiscord.com/bot/813407970750496828/vote Linkine Tıklayıp Atalantis'e Oy Vermelisin\nSonra İse botlist-bot-add Kanalına Gelip Aşşağıdaki Şekilde Botunuzu Ekliyebilirsiniz\n\`\`\`?bot-ekle <id> <prefix> <dbl-durum>\`\`\`**Not:** <> İşaretlerini Koymayın Loga Düşmez`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['nasıl-bot-eklerim', 'nasıl-bot-eklerim'],
  permLevel: 0
}
exports.help = {
  name: 'nasıl-bot-eklerim'
};
