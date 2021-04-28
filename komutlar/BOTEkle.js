const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
exports.run = async (client, message, args) => {
if (message.channel.id !== ayarlar.BOTEkletmeKanalı) return message.channel.send('<:793774692762255382:819210252749635604> **Bu Komutu Lütfen Bot Ekleme Kanalında Kullanın**').then(Message => Message.delete({timeout: 7500}))
const ClientID = args[0]
if (!ClientID || isNaN(ClientID) || ClientID == client.user.id) return message.channel.send('<:1f194:821324404507672617> **Lütfen Bir Bot  __ID__ Belirtin `?bot-ekle <id> prefix> <dbl-durum>`**').then(Message => Message.delete({timeout: 7500}))
const Prefix = args[1]
if (!Prefix) return message.channel.send('<:1f17f:821325361219502111> **Lütfen Bir __PREFIX__ Belirtin `?bot-ekle <id> prefix> <dbl-durum>`**').then(Message => Message.delete({timeout: 7500}))
const DBL = args[2]
if (!DBL) return message.channel.send('<:regionalindicatorsymbolletterd_1:821326528012484628> **Lütfen Bir __Dbl-Durum__ Belirtin `?bot-ekle <id> prefix> <dbl-durum>`**').then(Message => Message.delete({timeout: 7500}))
if (ClientID.length < 18) return message.channel.send('<:798583262774820904:819210290302418944> **Girdğiniz** \`ID\` **Herhangi Bir Hesapla Eşleşmedi**').then(Message => Message.delete({timeout: 7500}))
if (db.fetch(`Durum_${ClientID}`) == true) return message.channel.send('<:678748626960384043:818477550744371272> **Bu Bot Zaten Ekli Veya Onay Bekliyor** 🧹').then(Message => Message.delete({timeout: 7500}))
if (message.guild.members.cache.filter(Users => Users.user.bot).find(Botlar => Botlar.id === ClientID) && db.has(`Sahip_${ClientID}`) && db.has(`Eklenme_${ClientID}`)) return message.channel.send('**This BOT is Already Attached!** (Tarafından: `'+client.users.cache.get(db.fetch(`Sahip_${ClientID}`)).tag+' | '+db.fetch(`Eklenme_${ClientID}`)+'`)').then(Message => Message.delete({timeout: 7500}))
const BOTModeratör = ayarlar.BOTModRol
db.set(`Durum_${ClientID}`,true)
client.users.fetch(ClientID).then((User) => {
if (!User.bot) return message.channel.send('<:784469227871928330:819210224845717575> **The ID you entered does not belong to a bot.**').then(Message => Message.delete({timeout: 7500}))
const Revenge = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`
**${message.author.username}** Adlı Kullanıcı Botunu Sisteme Ekletti

Client ID: **\`${ClientID}\`**
Client İsim: **\`${User.tag}\`**
Botun Geliştiricisi : **\`${message.author.tag}\`** (${message.author})
Top.gg Durum : **[${DBL}](https://top.gg/bot/${ClientID})**

[Botu Eklemek İçin Buraya Tıklayın!](https://discord.com/oauth2/authorize?client_id=${ClientID}&scope=bot&permissions=0)`)
.setTimestamp()
.setFooter(User.tag,User.avatarURL())
client.channels.cache.get(ayarlar.BOTLog).send(`<:752883367770587318:818477599764381736> **${message.author} İsimli Kullanıcının \`${User.tag}\` İsimli Botu Sıraya Eklendi** \n Top.gg Adresi : (https://top.gg/bot/${ClientID})`)
client.channels.cache.get(ayarlar.BOTModKanal).send('<@&'+BOTModeratör+'>',Revenge).then(Mesaj => {
db.set(`Mesaj_${ClientID}`,Mesaj.id)
db.set(`Bilgi_${Mesaj.id}`,{Client: ClientID , Gönderen: message.author.id})
})
message.author.send(`<:752881065324052521:818477593564807228> \`${User.tag}\` Adlı Botunuz Sisteme Eklendi, **Onaylanmasını / Reddedilmesini**`)
db.set(`BOT_${message.author.id}`,ClientID)
db.set(`Ekledi_${ClientID}`,message.author.id)
db.set(`Sahip_${ClientID}`,message.author.id)
db.set(`Eklenme_${ClientID}`,moment().add(3,'hours').format('LLL'))
})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['bot-ekle','botekle','addbot','bot-add'],
	permLevel: 0
}

exports.help = {
	name: 'BOT Ekle',
	description: 'BOT Ekler',
	usage: 'botekle'
}