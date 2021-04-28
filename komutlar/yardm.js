const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  }

message.channel.send(new Discord.MessageEmbed()
.setColor('BLUE').setDescription(`
***Atalantis Botlist Botu Yardım Menüsü***

\`?avatar\` = Avatarınızı Gösterir.
\`?davet-sırası\` = Sunucudaki Davet Sırasını Gösterir.
\`?davetlerim\` = Davetlerinize Bakarsınız.
\`?altyapı\` = Altyapılar Rolünü Alırsınız

**Sisteme Nasıl Bot Eklerim** (?nasıl-bot-eklerim)

Öncelikle [Buraya](https://botsfordiscord.com/bot/813407970750496828/vote) Tıklayıp Atalantis'e Oy Vermelisin
Sonra İse botlist-bot-add Kanalından Botunu Aşşağıda
Verilen Embed Mesajındaki Şekilde Ekleyebilirsin.
\`\`\`?bot-ekle <id> <prefix> <dbl-durum>\`\`\`
**Not:** <> İşaretlerini Koymayın Loga Düşmez

> **Bildir Yapmak:** **Bize Herangi Birşeyi Bildirmek İstersen:** \`?bildir\`

:thumbsup: ***Bilgi***, Komutu Kullanan: [${message.author}]
`).setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : ''))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['YARDIM', 'Yardım'],
  permLevel: 0
}

exports.help = {
  name: 'yardım'
};