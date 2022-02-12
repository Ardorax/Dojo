const { guildId } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const channels_cache = client.guilds.cache.get(guildId).channels.cache;
		const channel = channels_cache.find(chan => {
			if (chan.name === "ressources" && chan.parentId == "941736035891699712") return true;
			return false;
		});
		if (!channel) return;
		console.log("A dojo has been found ! I start searching.");
		/*await channels_cache.each(async chan => {
			if (chan.parentId != "941736035891699712") return;
			const topic = String(chan.topic).split("|");
			if (topic.length != 2) return;
			let webhooks;
			await chan.fetchWebhooks()
			.then(hooks => {
				webhooks = hooks
			});
			if (webhooks.size != 1) return;
			console.log(`${chan.name} was found !`);
			client.students[topic[0]] = {
				// disable if name destroy json str
				//name: interaction.member.displayName
				url: webhooks.first().url,
				repo: topic[1]
			}
		});*/
		for (let duo of channels_cache) {
			let chan = duo[1];
			if (chan.parentId != "941736035891699712") continue;
			const topic = String(chan.topic).split("|");
			if (topic.length != 2) continue;
			let webhooks;
			await chan.fetchWebhooks()
			.then(hooks => {
				webhooks = hooks
			});
			if (webhooks.size != 1) continue;
			console.log(`${chan.name} was found !`);
			client.students[topic[0]] = {
				// disable if name destroy json str
				//name: interaction.member.displayName
				url: webhooks.first().url,
				repo: topic[1]
			}
		}
		console.log("Fin des recherches.");
		console.log(client.students);
	},
};
