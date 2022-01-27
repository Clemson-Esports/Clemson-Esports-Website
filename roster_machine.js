// Require the necessary discord.js classes 
const { Client, Intents, Interaction } = require('discord.js');
// const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const trackedRoles = require('./roster_roles.json').roles;

// When the client is ready, run this code (only once)
client.once('ready', () => {
	let roster = {}

	const guild = client.guilds.cache.get("215845807801237514");
	guild.roles.fetch().then((roles) => {
		roles.forEach(Role => {
			if (Role.name != "Tech Team Leader") { // Leader is in tech team
				guild.members.fetch().then((members) => {
					let Members = members.filter(member => member.roles.cache.find(role => role == Role)).map(member => { 
						return { 
							"name": member.nickname || member.user.username, 
							"image_cdn": member.user.avatarURL() ?? ""
						} 
					});
					Members = Members.filter(member => member !== null);
					if (trackedRoles.some( roleName => Role.name.includes(roleName)) && Members.length != 0) {
						console.log(Role.name)
						roster[Role.name] = {
							"members": Members,
							"color": Role.hexColor,
							"icon": Role.iconURL() ?? ""
						};
						global.roster = roster;
					}
				});
			}
		});
	});
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);