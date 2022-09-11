// Require the necessary discord.js classes
const { Client, Intents, Interaction } = require("discord.js");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

const trackedGamingRoles = require("./roster_roles.json")["gaming-roles"];
const trackedSupportRoles = require("./roster_roles.json")["support-roles"];
const gamingExcludes = require("./roster_roles.json")["gaming-excludes"];
const supportExcludes = require("./roster_roles.json")["support-excludes"];

// When the client is ready, run this code (only once)
client.once("ready", () => {
	let roster = {};
	let support = {};

	const guild = client.guilds.cache.get("215845807801237514");
	guild.roles.fetch().then((roles) => {
		guild.members.fetch().then((members) => {
			roles.forEach((Role) => {
				let Members = members
					.filter((member) => member.roles.cache.find((role) => role == Role))
					.map((member) => {
						return {
							name: member.nickname || member.user.username,
							image_cdn: member.user.avatarURL() ?? "",
						};
					});
				Members = Members.filter((member) => member !== null);
				if (
					trackedGamingRoles.some((roleName) => Role.name.includes(roleName)) &&
					Members.length >= 1
				) {
					console.log("[DISCORD] Fetched Roster for", Role.name);
					roster[Role.name] = {
						members: Members,
						color: Role.hexColor,
						icon: Role.iconURL() ?? "",
					};
					global.roster = roster;
					process.send([roster, support]);
				}

				if (
					trackedSupportRoles.some((roleName) => Role.name.includes(roleName)) &&
					Members.length >= 1 &&
					!Role.name.includes(supportExcludes)
				) {
					console.log("[DISCORD] Fetched Support for", Role.name);
					support[Role.name] = {
						members: Members,
						color: Role.hexColor,
						icon: Role.iconURL() ?? "",
					};
					global.support = support;
				}
			});
		});
	});
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);