/*===================================================+
|| # DiscordJS-Example by unkn0wn.sys
|+===================================================+
|| # https://github.com/unkn0wn1sys
|| # $x#7831
|+===================================================*/

// Requirements
const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('./config.json');
const colors = require('colors'); // Not needed, just to color strings

// Creating the Client
const client = new Discord.Client();

// MySQL-Connection string
const connection = mysql.createConnection(config.database_settings);

// Establishing the MySQL-Connection
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: '.red + err.stack);
    return;
  }
  console.log('Successfully established connection to MySQL database. '.green);
});

// Event that get triggered when the client is ready.
client.on('ready', () => {
  // Tells the user that the bot is successfully logged in.
  console.log(`Successfully logged in as ${client.user.tag}!`.green);

  // Sets the status of the bot, which is taken from config.json.
  client.user.setStatus(config.bot_settings.status);

  // Sets the activity of the bot, which is also taken from config.json.
  client.user.setActivity(config.bot_settings.activity);
});

// Event that get triggered on every single message received.
client.on('message', async message => {
  // Ignore other bots and itself.
  if(message.author.bot) return;

  // Ignore direct messages.
  if(message.channel.type === "dm") return;

  // Ignore messages without a prefix
  if(message.content.indexOf(config.bot_settings.prefix) !== 0) return;

  // .slice removes the prefix from our message.
  // .trim removes spaces before/after our message.
  // .split splits the string by one or many spaces.
  const args = message.content
              .slice(config.bot_settings.prefix.length)
              .trim()
              .split(/ +/g);

  // .shift removes one element from the array and returns it.
  // .toLowerCase transforms our message to lowercase.
  const command = args.shift().toLowerCase();

  // Switch Statement for our Commands
  switch(command) {
    // Ping Command, seems to be a tradition so why not, lol. 
    case 'ping':
    message.channel.send('Pong!');
    break;

    // About Command
    case 'about':
    const AboutEmbed = new Discord.RichEmbed()
                       .setDescription('About this bot')
                       .setColor('f4d942')
                       .addField('Developer:', '$x#7831')
                       .addField('Stupid People:', 'Sentix and Wesley')
                       .addField('Current uptime:', client.uptime);
    message.channel.send(AboutEmbed);
    break;
  }
});

// Logs the client in, establishing a websocket connection to Discord.
client.login(config.authentication.token);

