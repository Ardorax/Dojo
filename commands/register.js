const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('To register in the Dojo !')
		.addStringOption(option => option
			.setName("ssh_key")
			.setDescription("Your ssh key to the repo.")
			.setRequired(true)
		),
	async execute(interaction) {
		const ssh_key = interaction.options.getString("ssh_key");

		// Check if is not already in the dojo
		if (interaction.client.students[interaction.member.id]) return interaction.reply({
			content: "Vous êtes déjà dans le dojo",
			ephemeral: true
		});

		// Search a channel to find out if there is a dojo.
		const channel = interaction.guild.channels.cache.find(chan => {
			if (chan.name === "ressources" && chan.parentId == "941736035891699712") return true;
			return false;
		});
		if (!channel) return interaction.reply({
			content: `Il n'y a pas de dojo pour l'instant`,
			ephemeral: true}
		);
		// Create the personal channel
		interaction.guild.channels.create(`${interaction.member.displayName}`, {
			permissionOverwrites : [
				{
					id: interaction.guild.roles.everyone,
					deny: ["VIEW_CHANNEL"]
				},
				{
					id: interaction.member.id,
					allow: ["VIEW_CHANNEL"]
				},
				// Responsables
				{
					id: "939876544137015306",
					allow: ["VIEW_CHANNEL"]
				},
				// Headquarters
				{
					id: "940320600428277760",
					allow: ["VIEW_CHANNEL"]
				},
				// Dojo
				{
					id: "940247759133495346",
					allow: ["VIEW_CHANNEL"]
				}
			],
			parent : channel.parent,
			topic: `${interaction.member.id}|${ssh_key}`
		}).then(channel => {
			channel.send(`Bienvenue dans votre channel ${interaction.member} ! C'est ici que vous recevrez vos résultats !\nNous regardons votre travail dans le repo : \`${ssh_key}\``);
			channel.createWebhook(`Result : ${interaction.member.displayName}`)
			.then(webhooks => {
				interaction.client.students[interaction.member.id] = {
					// disable if name destroy json str
					//name: interaction.member.displayName
					url: webhooks.url,
					repo: ssh_key
				}
			});
		});
		return interaction.reply({content: `You are now register in the dojo!`, ephemeral: true});
	},
};