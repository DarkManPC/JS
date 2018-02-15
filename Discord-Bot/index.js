const Discord = require('discord.js');

const bot = new Discord.Client();

const token = 'NDA5NjY4NjgwODAxMTg5ODk4.DVh9Uw.N2UHAcpPq9IWjyBvewxwxCzXm9k';

var Commands = require('./Commands.js');
var Ins = new Commands.Instruction();

bot.on('ready', function () {
  bot.user.setGame('Lopez Fighter').catch(console.error);
});

bot.on('message', function (message) {
  if(message.author != bot.user){
    Ins.play(message);
  };

});

bot.login(token);
