const Discord = require('discord.js');  
const db = require('quick.db');  
const hastebin = require('hastebin-gen');  
const client = new Discord.Client();    
const Canvas = require('canvas');        
const fs = require("fs"); 
const getYoutubeID = require('get-youtube-id'); 
const moment = require("moment");   
const { Client, Util } = require('discord.js');  
const UserBlocked = new Set();  
const jimp = require('jimp');   
const math = require('math-expression-evaluator'); 
const stripIndents = require('common-tags').stripIndents;
const figlet = require('figlet'); 
const queue = new Map(); 
const zalgo = require('zalgolize');   
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const sql = require("sqlite");
 const dateFormat = require('dateformat'); 
 const pretty = require('pretty-ms') 
,ti={}  
,spee={}; 

client.on('messageDelete', message => {
 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = message.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
    .setTitle('**[MESSAGE DELETE]**')
    .setColor('RED')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
 
    logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
 
    var logChannel = oldMessage.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('BLUE')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});
 
 
client.on('roleCreate', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = role.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleCreate);
    })
});
client.on('roleDelete', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = role.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**[ROLE DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete);
    })
});
client.on('roleUpdate', (oldRole, newRole) => {
 
    if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = oldRole.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldRole.name !== newRole.name) {
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**[ROLE NAME UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName);
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            if(oldRole.hexColor === '#000000') {
                var oldColor = '`Default`';
            }else {
                var oldColor = oldRole.hexColor;
            }
            if(newRole.hexColor === '#000000') {
                var newColor = '`Default`';
            }else {
                var newColor = newRole.hexColor;
            }
            let roleUpdateColor = new Discord.RichEmbed()
            .setTitle('**[ROLE COLOR UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateColor);
        }
    })
});
 
 
client.on('channelCreate', channel => {
 
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = channel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelCreate = new Discord.RichEmbed()
        .setTitle('**[CHANNEL CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
});
client.on('channelDelete', channel => {
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = channel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**[CHANNEL DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete);
    })
});
client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
 
    var logChannel = oldChannel.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newName);
        }
        if(oldChannel.topic !== newChannel.topic) {
            let newTopic = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
});
 
 
client.on('guildBanAdd', (guild, user) => {
 
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setTitle('**[BANNED]**')
        .setThumbnail(userAvatar)
        .setColor('DARK_RED')
        .setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(banInfo);
    })
});
client.on('guildBanRemove', (guild, user) => {
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let unBanInfo = new Discord.RichEmbed()
        .setTitle('**[UNBANNED]**')
        .setThumbnail(userAvatar)
        .setColor('GREEN')
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(unBanInfo);
    })
});
client.on('guildUpdate', (oldGuild, newGuild) => {
 
    if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = oldGuild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    oldGuild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldGuild.name !== newGuild.name) {
            let guildName = new Discord.RichEmbed()
            .setTitle('**[CHANGE GUILD NAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(newGuild.name, oldGuild.iconURL)
 
            logChannel.send(guildName)
        }
        if(oldGuild.region !== newGuild.region) {
            let guildRegion = new Discord.RichEmbed()
            .setTitle('**[CHANGE GUILD REGION]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL)
 
            logChannel.send(guildRegion);
        }
        if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
            if(oldGuild.verificationLevel === 0) {
                var oldVerLvl = 'Very Easy';
            }else
            if(oldGuild.verificationLevel === 1) {
                var oldVerLvl = 'Easy';
            }else
            if(oldGuild.verificationLevel === 2) {
                var oldVerLvl = 'Medium';
            }else
            if(oldGuild.verificationLevel === 3) {
                var oldVerLvl = 'Hard';
            }else
            if(oldGuild.verificationLevel === 4) {
                var oldVerLvl = 'Very Hard';
            }
 
            if(newGuild.verificationLevel === 0) {
                var newVerLvl = 'Very Easy';
            }else
            if(newGuild.verificationLevel === 1) {
                var newVerLvl = 'Easy';
            }else
            if(newGuild.verificationLevel === 2) {
                var newVerLvl = 'Medium';
            }else
            if(newGuild.verificationLevel === 3) {
                var newVerLvl = 'Hard';
            }else
            if(newGuild.verificationLevel === 4) {
                var newVerLvl = 'Very Hard';
            }
 
            let verLog = new Discord.RichEmbed()
            .setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL)
 
            logChannel.send(verLog);
        }
    })
});
client.on('guildMemberUpdate', (oldMember, newMember) => {
    if(!oldMember.guild) return;
 
    var logChannel = oldMember.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '`اسمه الاصلي`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '`اسمه الاصلي`';
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**[UPDATE MEMBER NICKNAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
 
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**[ADDED ROLE TO MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('GREEN')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
 
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**[REMOVED ROLE FROM MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RED')
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
        let newOwner = new Discord.RichEmbed()
        .setTitle('**[UPDATE GUILD OWNER]**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('GREEN')
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
});
 
 
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
    if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
 
    var logChannel = voiceOld.guild.channels.find(c => c.name === 'log');
    if(!logChannel) return;
 
    voiceOld.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
            let serverMutev = new Discord.RichEmbed()
            .setTitle('**[VOICE MUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }
        if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
            let serverUnmutev = new Discord.RichEmbed()
            .setTitle('**[VOICE UNMUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }
        if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
            let serverDeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE DEAF]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }
        if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
            let serverUndeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE UNDEAF]**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv);
        }
    })
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
        let voiceJoin = new Discord.RichEmbed()
        .setTitle('**[JOIN VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceJoin);
    }
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[LEAVE VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[CHANGED VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
});

client.on('message', message => {
    if(message.content == '-allservers') {
             if(!message.author.id === 'YourID') return;
    var gimg;
    var gname;
    var gmemb;
    var gbots;
    var groles;
    var servers = client.guilds;
    servers.forEach((g)=>{
    gname = g.name;
    gimg = g.iconURL;
    gmemb = g.members.size;
    gbots = g.members.filter(m=>m.bot).size;
    groles = g.roles.map(r=> {return r.name});
    let serv = new Discord.RichEmbed()
    .setAuthor(gname,gimg)
    .setThumbnail(gimg)
    .addField('Server Member Count',gmemb = g.members.size)
    .setColor('RANDOM')
    message.channel.send(`
    Server Name : **${gname}**
    Server MemberCount : **${gmemb} **
            
            `);
          message.channel.sendEmbed(serv);
    }) 
    }
    });
	
	client.on('message', function(message) {
    if (!message.member.hasPermissions(['ADMINISTRATOR'])){
            let command = message.content.split(" ")[0];
        if(message.content.includes('discord.gg')){
        message.reply (' ')
           if(!message.channel.guild) return message.reply('**This command only for servers**');
     message.member.addRole(message.guild.roles.find('name', 'Muted')); 
    const embed500 = new Discord.RichEmbed()
      .setTitle(":x: | تمت معاقبتك")
            .addField(`** لقد قمت بمخالفة قوانين السيرفر من خلال نشر سيرفرات اخرى  **` , `**ان كأن هاذه الميوت عن طريق الخطأ تواصل مع احد اعضاء الادارة**`)
      .addField(`Snow`,`Codes`)
            .setColor("c91616")
            .setThumbnail(`${message.author.avatarURL}`)
            .setAuthor(message.author.username, message.author.avatarURL) 
        .setFooter(`${message.guild.name} Server`)
     message.channel.send(embed500) 
    
        
    }
    }
})

client.on('message', message => {
    if (message.content === "$id") {
    var year = message.createdAt.getFullYear()
    var month = message.createdAt.getMonth()
    var day = message.createdAt.getDate()
         let embed = new Discord.RichEmbed()
         .setAuthor(message.author.username, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
        .addField("**اسمك:**",  '**[ ' + `${message.author.username}` + ' ]**')
          .setThumbnail(message.author.avatarURL)
                   .setFooter(`${message.author.username}`)
      .addField('الكود الخاص بك:', message.author.discriminator)
      .addField("**عدد الايام منذ افتتاح حسابك:**", message.author.createdAt.getDate())
        .addField("** تم افتتاح حسابك عام:**", message.createdAt.getFullYear())
            .addField("** عدد الشهور منذ افتتاح حسابك:**", message.createdAt.getMonth())
    
      message.channel.send({embed});
        }
    });
	
	client.on('guildMemberAdd', member => {
  
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
 
  if (!channel) return;

  channel.send(`**ولــكــم نورت السيرفر اطلق من دخل السيرفر**`);
}); // حقوق محمد دوله وصبحي خان

client.on("message", message => {

            if (message.content.startsWith(prefix + "bc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
 m.send(`${argresult}\n ${m}`);
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'online').size}\` : عدد الاعضاء المستلمين`); 
 message.delete(); 
};
}); // حقوق  demonic وسنو كودز

client.on("message", message => {

            if (message.content.startsWith(prefix + "obc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
 m.send(`${argresult}\n ${m}`);
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'all').size}\` : عدد الاعضاء المستلمين`); 
 message.delete(); 
};
}); //  حقوق محمد دوله وصبحي خان

client.on('message', message => {
    if(message.content == '-allservers') {
             if(!message.author.id === 'YourID') return;
    var gimg;
    var gname;
    var gmemb;
    var gbots;
    var groles;
    var servers = client.guilds;
    servers.forEach((g)=>{
    gname = g.name;
    gimg = g.iconURL;
    gmemb = g.members.size;
    gbots = g.members.filter(m=>m.bot).size;
    groles = g.roles.map(r=> {return r.name});
    let serv = new Discord.RichEmbed()
    .setAuthor(gname,gimg)
    .setThumbnail(gimg)
    .addField('Server Member Count',gmemb = g.members.size)
    .setColor('RANDOM')
    message.channel.send(`
    Server Name : **${gname}**
    Server MemberCount : **${gmemb} **
            
            `);
          message.channel.sendEmbed(serv);
    }) 
    }
    }); //  حقوق محمد دوله وصبحي خان

const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const client = new Discord.Client();

/*
البكجآت
npm install discord.js
npm install ytdl-core
npm install get-youtube-id
npm install youtube-info
npm install simple-youtube-api
npm install queue
*/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Codes] ${client.users.size}`)
    client.user.setStatus("idle")
});
client.on('ready', () => {
     client.user.setActivity("you",{type: 'WATCHING'});

});
const prefix = "$"
client.on('message', async msg => {
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;
	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1] .replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)
	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('يجب توآجد حضرتك بروم صوتي .');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('لا يتوآجد لدي صلاحية للتكلم بهذآ الروم');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('لا يتوآجد لدي صلاحية للتكلم بهذآ الروم');
		}

		if (!permissions.has('EMBED_LINKS')) {
			return msg.channel.sendMessage("**يجب توآفر برمشن `EMBED LINKS`لدي **rl")
			}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, msg, voiceChannel, true);
			}
			return msg.channel.send(` **${playlist.title}** تم الإضآفة إلى قأئمة التشغيل`);
		} else {
			try {

				var video = await youtube.getVideo(url);

			} catch (error) {
				try {
				    					    var fast = {};
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					const embed1 = new Discord.RichEmbed()
			        .setDescription(`**الرجآء من حضرتك إختيآر رقم المقطع** :
${videos.map(video2 => `[**${++index}**] **${video2.title}**`).join('\n')}`)
					.setFooter(`${msg.guild.name}`)
					msg.channel.sendEmbed(embed1).then(message =>{

						message.delete(15000)

					});
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 20000,
							errors: ['time']
						})

						}catch(err) {
						console.error(err);
						return msg.channel.send('لم يتم إختيآر مقطع صوتي');
						}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':x: لا يتوفر نتآئج بحث ');
				}
		}

			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `skip`) {
		if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
		if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لتجآوزه');
		serverQueue.connection.dispatcher.end('تم تجآوز هذآ المقطع');
		return undefined;
	} else if (command === `stop`) {
		if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
		if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لإيقآفه');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('تم إيقآف هذآ المقطع');
		return undefined;
	} else if (command === `vol`) {
		if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
		if (!serverQueue) return msg.channel.send('لا يوجد شيء شغآل.');
		if (!args[1]) return msg.channel.send(`:loud_sound: مستوى الصوت **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
		return msg.channel.send(`:speaker: تم تغير الصوت الي **${args[1]}**`);
	} else if (command === `np`) {
		if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
		const embedNP = new Discord.RichEmbed()
	.setDescription(`:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`)
		return msg.channel.sendEmbed(embedNP);
	} else if (command === `replay`) {
		if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
		const embedNP = new Discord.RichEmbed()
	.setDescription(`سيتم اعاده تشغيل الفديو :**${serverQueue.songs[0].title}**`)
	msg.channel.send({embed: embedNP})
  	 return handleVideo(video, msg, msg.member.voiceChannel);

	} else if (command === `queue`) {
		if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
		let index = 0;
		const embedqu = new Discord.RichEmbed()
.setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`)
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('تم إيقاف الموسيقى مؤقتا!');
		}
		return msg.channel.send('لا يوجد شيء حالي ف العمل.');
	} else if (command === "resume") {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('استأنفت الموسيقى بالنسبة لك !');
		}
		return msg.channel.send('لا يوجد شيء حالي في العمل.');
	}

	return undefined;
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
		time:`${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`,
		eyad:`${video.thumbnails.high.url}`,
		best:`${video.channel.title}`,
		bees:`${video.raw.snippet.publishedAt}`,
		shahd:`${video.raw.kind}`,
		zg:`${video.raw.snippet.channelId}`,
        views:`${video.raw.views}`,
        like:`${video.raw.likeCount}`,
        dislike:`${video.raw.dislikeCount}`,
        hi:`${video.raw.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);
		queueConstruct.songs.push(song);
		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`لا أستطيع دخول هذآ الروم ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(` **${song.title}** تم اضافه الاغنية الي القائمة!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		fetchVideoInfo(`${song.hi}`, function (err, fuck) {
  if (err) throw new Error(err);
  console.log(fuck);
  	  const yyyy = {}
  if(!yyyy[msg.guild.id]) yyyy[msg.guild.id] = {
    like: `${fuck.likeCount}`,
    dislike: `${fuck.dislikeCount}`
  }
	serverQueue.textChannel.send({embed : new Discord.RichEmbed()
  .setTitle(`**${fuck.title}**`)
  .setURL(fuck.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${fuck.datePublished}`, true)
  .addField('Views :' , `${fuck.views}`, true)
  .addField('Like👍 :' , `${fuck.likeCount}`, true)
  .addField('dislike👎 :' , `${fuck.dislikeCount}`, true)
  .addField('comments :' , `${fuck.commentCount}`, true)
	.setImage(`${song.eyad}`)
	.setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
	.setColor('#ff0000')
	.setTimestamp()
	}).then(love => {
		love.react('👍').then(r=>{
		love.react('👎').then(r =>{
		love.react('🙌').then(r=> {
    let likee = (reaction, user) => reaction.emoji.name === '👍' && user.id === msg.author.id;
    let dislikee = (reaction, user) => reaction.emoji.name === '👎' && user.id === msg.author.id;
    let cnn = (reaction, user) => reaction.emoji.name === '🙌' && user.id === msg.author.id;

    let ll = love.createReactionCollector(likee , {max:5});
    let dd = love.createReactionCollector(dislikee , {max:5});
    let cn = love.createReactionCollector(cnn , {max:5});

		    ll.on("collect", r => {
		      yyyy[msg.guild.id].like++;
	love.edit({embed : new Discord.RichEmbed()
  .setTitle(`**${fuck.title}**`)
  .setURL(fuck.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${fuck.datePublished}`, true)
  .addField('Views :' , `${fuck.views}`, true)
  .addField('Like👍 :' , `${yyyy[msg.guild.id].like}`, true)
  .addField('dislike👎 :' , `${fuck.dislikeCount}`, true)
  .addField('comments :' , `${fuck.commentCount}`, true)
	.setImage(`${song.eyad}`)
	.setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
	.setColor('#ff0000')
	.setTimestamp()
});
    })

    dd.on("collect", r => {
      yyyy[msg.guild.id].dislike++;
	love.edit({embed : new Discord.RichEmbed()
  .setTitle(`**${fuck.title}**`)
  .setURL(fuck.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${fuck.datePublished}`, true)
  .addField('Views :' , `${fuck.views}`, true)
  .addField('Like👍 :' , `${fuck.likeCount}`, true)
  .addField('dislike👎 :' , `${yyyy[msg.guild.id].dislike}`, true)
  .addField('comments :' , `${fuck.commentCount}`, true)
	.setImage(`${song.eyad}`)
	.setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
	.setColor('#ff0000')
	.setTimestamp()
});
})
    cn.on("collect", r => {
	love.edit({embed : new Discord.RichEmbed()
  .setTitle(`**${fuck.title}**`)
  .setURL(fuck.url)
  .addField('Time The Video :' , `${song.time}`, true)
  .addField('Channel Name :' , `${song.best}`, true)
  .addField('Channel ID :' , `${song.zg}`, true)
  .addField('Video Created at :' , `${fuck.datePublished}`, true)
  .addField('Views :' , `${fuck.views}`, true)
  .addField('Like👍 :' , `${fuck.likeCount}`, true)
  .addField('dislike👎 :' , `${fuck.dislikeCount}`, true)
  .addField('comments :' , `${fuck.commentCount}`, true)
	.setImage(`${song.eyad}`)
	.setThumbnail('http://cdn.akhbaar24.com/430e061a-f89a-43c7-86d9-82fae5f7c495.jpg')
	.setColor('#ff0000')
	.setTimestamp()
});
})
})
})
})
})
})
}
});

client.on('guildMemberAdd', member=> {
    member.addRole(member.guild.roles.find("name","Member"));
    });

let points = JSON.parse(fs.readFileSync('./points.json' , 'utf8'));


client.on('message', async message => {


	if(message.channel.type !== 'text') return;
	
	
	var command = message.content.toLowerCase().split(" ")[0];
	var args = message.content.toLowerCase().split(" ");
	var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id == args[1]));
	  const embed  = new Discord.RichEmbed()
.setDescription(`
**لم يتم تسجيل أي نقطة حتى الأن **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 \`لتغيير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 \`لزيادة نقاط شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 \`لأزالة نقطة من شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} 0 \`لتصفير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points reset \`لتصفير جميع النقاط\`
`)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
  const error  = new Discord.RichEmbed()
.setDescription(`
**:x: | يجب كتابة الأمر بشكل صحيح. **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 \`لتغيير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 \`لزيادة نقاط شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 \`لأزالة نقطة من شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} 0 \`لتصفير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points reset \`لتصفير جميع النقاط\``)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
if(command == prefix + 'points') {
	 
		if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have Embed Links permission.');
		if(!args[1]) {
			if(!points) return message.channel.send(embed);
			var members = Object.values(points);
			var memb = members.filter(m => m.points >= 1);
			if(memb.length == 0) return message.channel.send(embed);
			var x = 1;
			let pointsTop = new Discord.RichEmbed()
			.setAuthor('Points:')
			.setColor('#FBFBFB')
			.setDescription(memb.sort((second, first) => first.points > second.points).slice(0, 10).map(m => `**:small_blue_diamond:** <@${m.id}> \`${m.points}\``).join('n'))
			.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
			message.channel.send({
				embed: pointsTop
			});
		}else if(args[1] == 'reset') {
			let pointsReset = new Discord.RichEmbed()
			.setDescription('**:white_check_mark: | تم تصفير جميع النقاظ بنجاح**')
			.setFooter('Requested by '+message.author.username, message.author.avatarURL)
			if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You dont have Manage Server permission.");
			if(!points) return message.channel.send(pointsReset);
			var members = Object.values(points);
			var memb = members.filter(m => m.points >= 1);
			if(memb.length == 0) return message.channel.send(pointsReset);
			points = {};
			message.channel.send(pointsReset);
		}else if(userM) {
			if(!message.member.hasPermission('MANAGE_GUILD')) return  message.channel.send("You dont have Manage Server permission.");
			if(!points[userM.user.id]) points[userM.user.id] = {
				points: 0,
				id: userM.user.id
			};
			if(!args[2]) {
				if(points[userM.user.id].points == 0) return message.channel.send( `${userM.user.username} Not have any points.`);
				var userPoints = new Discord.RichEmbed()
				.setColor('#d3c325')
				.setAuthor(`${userM.user.username} have ${points[userM.user.id].points} points.`);
				message.channel.send({
					embed: userPoints
				});
			}else if(args[2] == 'reset') {
				if(points[userM.user.id].points == 0) return message.channel.send(error);
				points[userM.user.id].points = 0;
				message.channel.send(`Successfully reset ${userM.user.username} points.`);
			}else if(args[2].startsWith('+')) {
				args[2] = args[2].slice(1);
				args[2] = parseInt(Math.floor(args[2]));
				if(points[userM.user.id].points == 1000000) return message.channel.send(error);
				if(!args[2]) return message.channel.send(error);
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if((points[userM.user.id].points + args[2]) > 1000000) args[2] = 1000000 - points[userM.user.id].points;
				points[userM.user.id].points += args[2];
				let add = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(add);
			}else if(args[2].startsWith('-')) {
				args[2] = args[2].slice(1);
				args[2] = parseInt(Math.floor(args[2]));
				if(points[userM.user.id].points == 0) return message.channel.send(error);
				if(!args[2]) return message.channel.send(error);
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if((points[userM.user.id].points - args[2]) < 0) args[2] = points[userM.user.id].points;
				points[userM.user.id].points -= args[2];
					let rem = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(rem);
			}else if(!args[2].startsWith('+') || !args[2].startsWith('-')) {
				args[2] = parseInt(Math.floor(args[2]));
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if(points[userM.user.id].points == args[2]) return message.channel.send(`${userM.user.username} points is already ${args[2]}.`);
				points[userM.user.id].points = args[2];
					let set = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(set);
			}
			}
			}
      fs.writeFile("./points.json", JSON.stringify(points) ,(err) =>{
          if (err) console.log(err.message);
      });
  
});

const prefix = "?"

const cool = [];
client.on('message',async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
 
  const args = message.content.split(' ');
  const credits = require('./credits.json');
  const path = './credits.json';
  const mention = message.mentions.users.first() || client.users.get(args[1]) || message.author;
  const mentionn = message.mentions.users.first() || client.users.get(args[1]);
  const author = message.author.id;
  const balance = args[2];
  const daily = Math.floor(Math.random() * 350) + 10;
 
  if(!credits[author]) credits[author] = {credits: 50};
  if(!credits[mention.id]) credits[mention.id] = {credits: 50};
  fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
 
 
  if(message.content.startsWith(prefix + "credit")) {
  if(args[0] !== `${prefix}credit` && args[0] !== `${prefix}credits`) return;
 
  if(args[2]) {
    if(isNaN(args[2]) || args[2] < 0) return message.channel.send(`:interrobang: **| ${message.author.username}, type the credit you need to transfer! **`);
    if(mention.bot) return message.channel.send(`**:heavy_multiplication_x:| ${message.content.split(' ')[1]} لم يتم العثور على**`);
    if(mention.id === message.author.id) return message.channel.send('**:heavy_multiplication_x:| لا يمكنك تحويل كردت لنفسك**');
    if(credits[author].credits < balance) return message.channel.send(`** :thinking: | ${message.author.username}, Your balance is not enough for that!**`);
    var one = Math.floor(Math.random() * 9) + 1;
    var two = Math.floor(Math.random() * 9) + 1;
    var three = Math.floor(Math.random() * 9) + 1;
    var four = Math.floor(Math.random() * 9) + 1;
 
    var number = `${one}${two}${three}${four}`;
   
    message.channel.send(`**:heavy_dollar_sign:| \`${number}\`, أكتب الرقم للأستمرار**`).then(m => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 10000}).then(c => {
        if(c.first().content === number) {
          m.delete();
          message.channel.send(`**:moneybag: | ${message.author.username}, has transferred \`${balance}\` to ${mention}**`);
          credits[author].credits += (-balance);
          credits[mention.id].credits += (+balance);
          fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
        } else if(c.first().content !== number) {
          m.delete();
          message.channel.send(`** :money_with_wings: | تم الغاء الإرسال**`);
        }
      });
    });
  }
  if(!args[2]) {
    if(mention.bot) return message.channel.send(`:interrobang:**| ${message.author.username}, I can't find** ${message.content.split(' ')[1]}**!**`);
    message.channel.send(`**${mention.username}, your :credit_card: balance is** \`$${credits[mention.id].credits}\`**.** `);
  }
 
  }
        if(args[0].toLowerCase() === `${prefix}daily`) {   
      
if(credits[message.author.id].daily != moment().format('L')) {

       credits[message.author.id].daily = moment().format('L');
           

          let ammount = (300, 500, 100, 200, 120, 150, 350, 320,220,250);
          credits[author].credits += ammount;
       
        
          message.channel.send(`**:atm: | ${message.author.username}, you received your :yen: ${ammount} daily credits!**`);
        fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
            if (e) throw e;
        })

      }else{
      message.channel.send(`:stopwatch: : **Please cool down  ${moment().endOf('day').fromNow()}**`);

      }
   
        }
         
   
  
});

client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var iiMo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setTitle('``رساله جديده``')
        .setThumbnail(`${message.author.avatarURL}`)
        .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
        .setFooter(`From **${message.author.tag} (${message.author.id})**`)
    client.channels.get("577099442151227412").send({embed:iiMo});// هنا ايدي الروم لي تبيه لما شخص يرسل ل بوت رساله تجي في الروم
    }
});

            client.on("message", (message) => {
                        if (message.channel.type === "dm") {
                    if (message.author.id === client.user.id) return;
                    let yumz = new Discord.RichEmbed()
                                .setTimestamp()
                                .setTitle("رساله للبوت")
                                .addField(`Sent By:`, `<@${message.author.id}>`)
                                .setColor("RANDOM")
                                .setThumbnail(message.author.displayAvatarURL)
                                .addField(`Message: `, `\n\n\`\`\`${message.content}\`\`\``)
                                .setFooter(`DM Bot Messages | DM Logs`)
                            client.users.get("ايدي حقك").send(yumz)//هنا الايدي حقك اذا تبي البوت يرسل لك خاص رساله لما شخص يرسل للبوت رساله في الخاص
                        }
            });
			
client.on('message', message => {
  var prefix = "?";
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

// -say
  if (command === "say") {
       if(!message.member.hasPermission('ADMINISTRATOR')) return;
          message.delete()
    message.channel.sendMessage(args.join(" ")).catch(console.error);
  }
  
 

if (command == "embed") {
       if(!message.member.hasPermission('ADMINISTRATOR')) return;
    let say = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor(0x23b2d6)
    message.channel.sendEmbed(say);
    message.delete();
  }


});

client.on('message', async edward => {
    // i said , Best Arabic Developer is ABADY . 
    client.ed = await client.users.get("476503634411257858");// AKAME Malicious Codes
    var edwardEmbed = new Discord.RichEmbed()
    .setColor("#7289DA")// AKAME
    .setAuthor(edward.guild.name,edward.guild.iconURL)
    .setFooter(`Malicious Codes , Akame Copyright;`,client.ed.displayAvatarURL)
    .setThumbnail(edward.guild.iconURL);
    var user = edward.mentions.members.first();// AKAME Malicious Codes
    var filter;
    var smartu;
    var role;
    var type;
    var textCo;// AKAME Malicious Codes 
    var voiceCo;
    filter = m => m.author.id == edward.author.id && !m.content.startsWith(prefix);
    var es = edward.content.slice(prefix.length).split(" ")[0];
    var command = es.toLowerCase();
   if (command != "mute") return undefined;
   if (!edward.guild.me.hasPermission("ADMINISTRATOR")) return edward.channel.send({embed: edwardEmbed
       .setDescription(`:sparkles: | ${edward.author} Error;\`\`\`diff\n- Sorry , but i miss ADMINISTRATOR permission.\`\`\``)
   });//wut u looking at ? stop clear my copyright bitch!
   if (!user) {
       edward.channel.send({embed: edwardEmbed
           .setDescription(`** ${edward.author} | :cyclone: mention someone please .**`)// AKAME Malicious Codes
       });
      await edward.channel.awaitMessages(filter,{
                time: 10000,// AKAME Malicious Codes
                errors: ["time"],
                max: 1
            }).then(respo => {
            user = respo.first().mentions.members.first()}).catch(error => {
                ms.delete(); // smartu everywhere  nah ?
            });
   }// AKAME
     if (user && user.id != edward.author.id) {
         smartu = "Smartu Team is here man . u cant edit this message nah . , this isn't easter egg , akame , sweetie , M7md , OwO";
         var ms = await edward.channel.send({embed: edwardEmbed
             .setDescription(`**:sparkles: | React with Type;**\nText; 💭\nVoice; 📢`)
         });
            var textRe = "💭";// stop boring me YATO . Arabic devs like shit.  
            await ms.react(textRe);// AKAME
            var voiceRe = "📢";
            await ms.react(voiceRe);// AKAME Malicious Codes
            var textFilt = (reaction, user) => {
                return reaction.emoji.name === `${textRe}` && user.id === edward.author.id;// AKAME Malicious Codes
            };
            var voiceFilt = (reaction, user) => {
                return reaction.emoji.name === `${voiceRe}` && user.id === edward.author.id;
            };
            voiceCo = ms.createReactionCollector(voiceFilt, {
                max: 1// AKAME Malicious Codes
            });
            textCo = ms.createReactionCollector(textFilt, {
                max: 1
            }); 
            textCo.on('collect', async resp => {// AKAME Malicious Codes
                 type = "text";
                 mute(user);
            });
             voiceCo.on('collect', async resp => {
                type = "voice";
                mute(user);
            })}// AKAME
            var mute = async function(some) {
                if (!smartu || smartu != "Smartu Team is here man . u cant edit this message nah . , this isn't easter egg , akame , sweetie , M7md , OwO") return undefined;
                if (type == "text") {
                    role = edward.guild.roles.find(s => s.name == "Muted");
                    edwardEmbed// AKAME
                    .setDescription(`:leaves: | \`\`\`diff\n+ ${user.user.username} has been text muted!\`\`\``);// AKAME Malicious Codes
        edward.delete();
        ms.edit({embed: edwardEmbed}).then(msg => msg.delete(15000));
        user.addRole(role);
        ms.clearReactions();// AKAME
                } else if (type == "voice") {
                    // oh shit . reebel will steal my code . any way i placed my copyrights already . haha i got u .
                    if (!user.voiceChannel) return ms.edit(`${edward.author} | Sorry but ${user} is not in voiceChannel.`);// AKAME
                     edwardEmbed
                    .setDescription(`:leaves: | \`\`\`diff\n+ ${user.user.username} has been voice muted!\`\`\``);// AKAME
        edward.delete();
        ms.edit({embed: edwardEmbed}).then(msg => msg.delete(15000));// AKAME Malicious Codes
        user.setMute(true);// AKAME
        ms.clearReactions();// AKAME Malicious Codes
                }};
});

client.on('ready', () => {// افنت التشغيل 
  setInterval(function(){
      client.guilds.forEach(g => { // فور ايرج تدخل للسيرفرات كلها
                  var role = g.roles.find('name', 'Rainbow');//Rainbow  اسم الرتبة عشان يسوي ريمبو غيرها اذا تبي
                  if (role) {
                      role.edit({color : "RANDOM"});
                  };
      });
  }, 60000);// وقت الريمبو لا تغيرة لانه الوقت المسموح للتغيير
})

client.on('message', function(message) { /// Snow Codes
    if (!message.member.hasPermissions(['ADMINISTRATOR'])){ /// Snow Codes
            let command = message.content.split(" ")[0]; /// Snow Codes
        if(message.content.includes('discord.gg')){ /// Snow Codes
        message.reply (' ') /// Snow Codes
           if(!message.channel.guild) return message.reply('** This command only for servers**'); /// Snow Codes
     message.member.addRole(message.guild.roles.find('name', 'Muted'));  /// Snow Codes
    const embed500 = new Discord.RichEmbed() /// Snow Codes
      .setTitle("❌ | تمت معاقبتك") /// Snow Codes
            .addField(`** لقد قمت بمخالفة قوانين السيرفر من خلال نشر سيرفرات اخرى  **` , `**ان كأن هاذه الميوت عن طريق الخطأ تواصل مع احد اعضاء الادارة**`) /// Snow Codes
      .addField(`Snow`,`Codes`) /// Snow Codes
            .setColor("c91616")
            .setThumbnail(`${message.author.avatarURL}`) 
            .setAuthor(message.author.username, message.author.avatarURL) 
        .setFooter(`${message.guild.name} Server`)
     message.channel.send(embed500) 
    
        
    }
    }
})




// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
