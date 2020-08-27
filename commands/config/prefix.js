const db = require("quick.db")
const { default_prefix } = require("../../config.json")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "prefix",
  category: "configurações",
  usage: "prefix <Novo Prefixp>",
  description: "Mude o Prefixo do servidor!",
  aliases: ["prefixo"],
  run: async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Você não tem perm para mudar meu prefix!")
    }

    let prefixo_atual = db.get(`prefix_${message.guild.id}`);
    if(prefixo_atual === null) prefixo_atual = default_prefix;
    
    if(!args[0]) {
      let info_embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`
Meu prefixo atual:
\`\`\`${prefixo_atual}\`\`\`
Como mudar:
\`\`\`${prefixo_atual}prefix <Novo Prefixo>\`\`\`
`)
      return message.channel.send(info_embed)
    } 
    
    if(args[1]) {
      let embed2 = new MessageEmbed()
        .setColor('#FF0000')
        .setDescription("❌ Não posso ter um prefixo com argumento duplo!")
      return message.channel.send(embed2)
    }
    
    if(args[0].length > 3) {
      let embed3 = new MessageEmbed()
        .setColor('#FF0000')
        .setDescription("❌ O prefixo dever ter 3 ou menos caracteres")
      return message.channel.send(embed3)
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
      let embed4 = new MessageEmbed()
        .setColor('GREEN')
        .setDescription("✅ Prefixo resetado!")
      return message.channel.send(embed4)
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
    let embed5 = new MessageEmbed()
    .setColor('GREEN')
    .setDescription(`✅ Meu novo prefix: \`${args[0]}\``)
  await message.channel.send(embed5)
    
  }
}
