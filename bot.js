const Discord = require("discord.js")
const db = require("quick.db")

const { default_prefix, token } = require("./config.json")

const bot = new Discord.Client()

bot.on("ready", () => {
    bot.user.setActivity({name:"P.D.M ™", type:"STREAMING", url: "https://twitch.tv/pdm_tm"})
    console.log('ok')
})

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

["command"].forEach(handler => { 
    require(`./handlers/${handler}`)(bot)
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
    if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return message.reply('marca n ;-; pfv')
  
    if(!message.content.startsWith(prefix)) return;
  
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);

    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) 
        command.run(bot, message, args);
})

bot.login(token);