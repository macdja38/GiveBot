/*
 PvPCraft Friendly helper bot.
 */

var Discord = require("discord.js");
var client = new Discord.Client();

var AuthDetails = require("../auth.json");

var Config = require("./lib/config");
var config = new Config("config");

var entries = new Config("entries");

var colors = require('colors');

client.on("message", (m) => {
    var command = m.content.toLowerCase();
    if (m.channel.id !== config.get("channel")) return;
    if (config.get("masters", []).indexOf(m.author.id) > -1) {
        if(config.get("enable").indexOf(command) > -1) {
            config.set("enabled", true);
            m.reply("enabled!");
        }
        else if(config.get("disable").indexOf(command) > -1) {
            config.set("enabled", false);
            m.reply("disabled!");
        }
        else if (config.get("draw").indexOf(command) > -1) {
            var Entries = entries.get("entries", []);
            var count = Entries.length;
            if(count == 0) {
                m.reply("No entries.");
                return;
            }
            var num = Math.floor(Math.random() * count);
            console.log(num);
            var winner = client.servers.get("id", config.get("server")).members.get("id", Entries[num])
            m.reply("Congratulations to " + winner + " ID: " + Entries[num]);
            console.log(winner.id.rainbow);
            console.log(winner.username.rainbow);
        }
        else if (config.get("clear").indexOf(command) > -1) {
            entries.set("entries", []);
            m.reply("All entries reset!");
            console.log("cleared!".rainbow);
        }
        else if (config.get("count").indexOf(command) > -1) {
            var count = entries.get("entries", []).length;
            m.reply("Their are **" + count + "** entries so far!");
            console.log(("Their are " + count + " entries so far!").rainbow);
        }
    }
    if(config.get("enabled", false) == false) return;
    console.log("U: ".green + m.author.username.blue + " C: ".green + command);
    if (config.get("enter").indexOf(command) > -1) {
        if (entries.get("entries", []).indexOf(m.author.id) < 0) {
            entries.get("entries", [m.author.id]).push(m.author.id);
            entries.save();
            m.reply("You have been entered to **win**!");
        } else {
            m.reply("Sorry but you have aleady entered.");
        }
    }
});

client.on("ready", () => {
    console.log("Ready");
});

client.loginWithToken(AuthDetails.token);