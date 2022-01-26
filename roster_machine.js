// Require the necessary discord.js classes 
const { Client, Intents, Interaction } = require('discord.js');
// const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	let roster = {}

	const guild = client.guilds.cache.get("863863265594572820");
	guild.roles.fetch().then((roles) => {
		roles.forEach(Role => {
			guild.members.fetch().then((members) => {
				let Members = members.filter(member => member.roles.cache.find(role => role == Role)).map(member => { 
					return { 
						"name": member.nickname, 
						"image_cdn": member.user.avatarURL() ?? ""
					} 
				});
				Members = Members.filter(member => member !== null);
				roster[Role.name] = {
					"members": Members,
					"color": Role.hexColor
				};
				global.roster = roster;
				// console.log(global.roster.admin.members[0].image_cdn);
			});
		});
	});
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

// {
// 	"role" {
// 		"users" {
// 			"name": "penis",
// 			"image_cdn": "http://"
// 		}
// 		"color": "red"
// 	}
// }