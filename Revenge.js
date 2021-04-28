const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
const Peppe = message => {
  console.log(`${message}`)
}

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./komutlar/', (Error, Files) => {
    if (Error) console.error(Error)
    Peppe(`${Files.length} Komut Yüklenecek!`)
    Files.forEach(Pepe => {
        let Props = require(`./komutlar/${Pepe}`)
        Peppe(`Yüklenen Komut: ${Props.help.name}.`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.reload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 client.commands.set(command, CMD)
 CMD.conf.aliases.forEach(Alias => {
 client.aliases.set(Alias, CMD.help.name)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.load = command => {
 return new Promise((Resolve, Reject) => {
 try {
 let CMD = require(`./komutlar/${command}`)
client.commands.set(command, CMD)
CMD.conf.aliases.forEach(Alias => {
client.aliases.set(Alias, CMD.help.name)
})
Resolve()
} catch (Hata) {
Reject(Hata)
}})}

client.unload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}
// RevengeNYKS \\
client.on('message',async message => {
  let client = message.client
  if (message.author.bot) return
  if (!message.content.startsWith(ayarlar.prefix)) return
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length)
  let params = message.content.split(' ').slice(1)
  let perms = client.elevation(message) 
  let cmd
  if (client.commands.has(command)) {
    cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command))
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return
    cmd.run(client, message, params, perms)
  }
if (message.content == `${ayarlar.prefix}hazır` && message.author.id == message.guild.ownerID) return client.channels.cache.get(ayarlar.BOTEkletmeKanalı).send(`
<:752883367770587318:818477599764381736>  **| Discord Bot Eklemek |** <:752883367770587318:818477599764381736>  

<:678748626960384043:818477550744371272> __Botunuzu Eklemek İçin https://botsfordiscord.com/bot/813407970750496828/vote Linkinden Oy Verin__

<:810431321947373578:818477688176115795> Bot Eklemek: \`\`\`?botekle <id> <prefix> <dbl-durum>\`\`\`
`)
})

client.on('message',async message => {
if (message.channel.id == ayarlar.BOTEkletmeKanalı && message.author.id !== client.user.id) message.delete()
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('guildMemberAdd',async member => {
if (member.user.bot && db.has(`Ekledi_${member.id}`)) {
const BOTEkleyen = await db.fetch(`Ekledi_${member.id}`)
client.channels.cache.get(ayarlar.BOTModKanal).messages.fetch({around: db.fetch(`Mesaj_${member.id}`), limit:1}).then(async REmbed => {
const Embed = REmbed.first().delete()
})
const Log = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(Audit => Audit.entries.first())
client.guilds.cache.get(member.guild.id).members.cache.get(BOTEkleyen).roles.add(ayarlar.GeliştiriciRolü)
const Embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle('Atalantis / Botlist')
.setDescription(`🎉 Tebrikler! \`${member.guild.name}\` Sunucuya eklendi  \`${client.users.cache.get(member.id).tag}\` İsimli Botunuz \`${client.users.cache.get(Log.executor.id).tag}\` Onaylandı **(Suncudan Çıkmayın)**`)
.setThumbnail(member.user.avatarURL())
.setFooter(member.guild.name+'・'+member.guild.memberCount,member.guild.iconURL({dynamic:true}))
client.users.cache.get(BOTEkleyen).send(`<@${BOTEkleyen}>`,Embed)
client.channels.cache.get(ayarlar.BOTLog).send(`:white_check_mark:  **<@${BOTEkleyen}> Adlı Kullanıcının \`${client.users.cache.get(member.id).tag}\` İsimli Botu \`${client.users.cache.get(Log.executor.id).tag} [${db.fetch(`Count_${Log.executor.id}`) || 1}]\` Adlı Yetkili Tarafından Onaylandı**`)
db.add(`Count_${Log.executor.id}`,1)
db.delete(`Durum_${member.id}`)
member.roles.add(ayarlar.BOTRol) // BOT Rol ID
} else {
member.roles.add('821128106298441789') // Üye Rol ID
}
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('ready',async () => {
client.user.setActivity('?bot-ekle <id> <prefix> <dbl-durum>',{ type: 'WATCHING'})
const Ses = client.channels.cache.get(ayarlar.SesKanalı)
if (Ses) Ses.join()
console.log(`${client.user.username} Aktif!`)
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('guildMemberRemove', async member => {
const BOTDurum = await db.fetch(`BOT_${member.id}`)
if (BOTDurum) {
client.users.fetch(BOTDurum).then(async(User) => {
client.guilds.cache.get(member.guild.id).members.cache.get(await db.fetch(`BOT_${member.id}`)).kick()
client.channels.cache.get(ayarlar.BOTLog).send(`:outbox_tray: \`${member.user.tag}\` **İsimli Geliştirici Sunucudan Ayrıldı**\`${User.tag}\` **İsimli Botu Sunucundan Atıldı**`)
db.delete(`BOT_${member.id}`)
})
}
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('voiceStateUpdate', async (Code, Pepe) => {
if (Pepe.member.user.bot && Pepe.channelID && Pepe.member.user.id == client.user.id && !Pepe.selfDeaf) {
Pepe.setSelfDeaf(true)
}
if (Pepe.member.user.bot && Pepe.channelID && Pepe.member.user.id == client.user.id && !Pepe.selfMute) {
Pepe.setSelfMute(true)
}
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('messageDelete',async message => {
    const Bilgi = db.fetch(`Bilgi_${message.id}`)
    if (!Bilgi) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(Audit => Audit.entries.first())
    if (fetchedLogs.executor.id === client.user.id || !client.guilds.cache.get(message.guild.id).members.cache.get(fetchedLogs.executor.id).roles.cache.find(Rol => Rol.id === ayarlar.BOTModRol)) return
    const Clientt = Bilgi.Client
    db.delete(`Durum_${Bilgi.Client}`)
    client.users.fetch(Clientt).then((Client) => {
        const Ceon = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor(client.user.tag,client.user.avatarURL())
        .setFooter(client.user.username,client.user.avatarURL())
        .setTimestamp()
        .setDescription(`❓ **Botu \`Reddetmek\` İstiyorsanız Bir Sebep Gir**`)
        client.channels.cache.get(message.channel.id).send(Ceon).then(Message => {
	     	Message.delete({timeout:15000})
            client.guilds.cache.get(message.guild.id).channels.cache.get(message.channel.id).awaitMessages(Message => Message.member.roles.cache.find(Rol => Rol.id === ayarlar.BOTModRol), {max: 1,time: 15000,errors: ['time']
            }).then(async Collected => {
            client.channels.cache.get(message.channel.id).bulkDelete(2)
            client.users.cache.get(Bilgi.Gönderen).send(`<:794637929351741481:818477631720783892> Merhaba <@${Bilgi.Gönderen}>,**\`${message.guild.name}\` Sırada Bekleyen
 \`${Client.tag}\` İsimli Botunuz \`${Collected.first().author.tag}\` Tarafından \`${Collected.first().content || 'Belirtilmedi'}\` Sebebiyle Reddedildi.**`)
            client.channels.cache.get(ayarlar.BOTLog).send(`:wastebasket: **<@${Bilgi.Gönderen}> Adlı Kullanıcının \`${Client.tag}\` İsimli Botu \`${Collected.first().author.tag}\` By \`${Collected.first().content || 'Unkown'}\` Sebebiyle Reddedildi**`)
            })
            })
    })
    })
// RevengeNYKS \\
client.elevation = message => {
    if (!message.guild) {
        return
    }
    let permlvl = 0
    if (message.member.hasPermission('BAN_MEMBERS')) permlvl = 2
    if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl
}

client.login("Nzg2MTcyNDI1ODM4NjU3NTM2.X9CiIA.jkmbJAcjc7-0RIbcw5UPcfYrOCY")

const guildInvites = new Map();

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
    .then(invites => guildInvites.set(guild.id, invites))
    .catch(err => console.log(err));
    });
});
client.on('inviteCreate', async invite => {
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
});
client.on('guildMemberAdd', async member => {
  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    console.log("Davet Eklendi")
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
    const currentInvites = await db.get(`inv.${usedInvite.inviter.id}.total`)
    if(currentInvites) {
      db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
      db.add(`${usedInvite.inviter.id}`, 1)
    } else {
      db.set(`inv.${usedInvite.inviter.id}.total`, 1)
      db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
    }
  }
  catch(err) {
    console.log(err);
  }
});

client.on('guildMemberRemove', async member => {
  const inviter = await db.get(`inv.${member.id}.inviter`)
  const userinviter = await member.guild.members.fetch(`${inviter}`);
  const currentInvites = await db.get(`inv.${inviter}.total`)
  try {
    console.log("Davet Silindi")
    db.add(`inv.${inviter}.total`, -1)
    db.delete(`inv.${member.id}.inviter`)
  } catch(err) {
    console.log(err);
  }
});