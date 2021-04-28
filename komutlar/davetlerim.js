const Discord = require("discord.js");
const config = require("../ayarlar.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let inv =  db.fetch(`inv.${user.id}.total`) || 0;  
    message.channel.send(new Discord.MessageEmbed().setColor('BLUE').addField("Davetleriniz:",inv)) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invite"],
  permLevel: 0
};

exports.help = { 
  name: 'davetlerim', 
  description: "Şapka Verir.",
  usage: "invite"
}
