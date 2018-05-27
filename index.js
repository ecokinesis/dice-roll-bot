const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

//const commando = require('discord.js-commando');
//const bot = new commando.Client({disableEveryone: true});

// identify random

/*bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");*/

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  //bot.user.setGame("Event 004");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let mention = message.author.toString();
  let dice1 = message.content.split("d");
  let dice2 = dice1[1];
//  let diceRoll = message.content.split("d");
//  let sidesOfDice = diceRoll[1];

//message.author.sendMessage(`${mention} rolled a 20.`);

let members = message.channel.members;

// my id for dms
let guildMember = members.find('id', '384850546676203521');


  /*if(command === `${prefix}hello`){
    return message.channel.send(`Hello ${mention}!`);
  } else if(command === `${prefix}bye`){
    return message.channel.send("Bye!");
  } else */if(command === `${prefix}r` && message.member.roles.find("name", "admin") && message.content.includes(`${prefix}r d`)){
    let roll = Math.floor(Math.random() * dice2) + 1; // gm rolls
    return message.channel.send(`The GM rolled a **${roll}**.`);
  } else if(command === `${prefix}r` && message.content.includes(`${prefix}r d`)){
    let roll = Math.floor(Math.random() * dice2) + 1; // regular rolls
    return message.channel.send(`${mention} rolled a ${roll}`);
  } else if(command === `${prefix}br` && message.content.includes(`${prefix}r d`)){
    let roll = Math.floor(Math.random() * dice2) + 1; // blind rolls
    // send Direct Message to member
    return message.channel.send(`${mention} sent a blind roll to the GM.`);
    guildMember.send(`${mention} rolled a ${roll}`);
  } else if(command === `${prefix}r` && message.content.includes(`${prefix}r +d`)){
    let roll = Math.floor(Math.random() * dice2) + 1;
    return message.channel.send(`${mention} rolled a ${roll} with advantage.`);
    let roll = Math.floor(Math.random() * dice2) + 1;
    return message.channel.send(`${mention} rolled a ${roll} with advantage.`);
  }

});

bot.login(process.env.BOT_TOKEN);
