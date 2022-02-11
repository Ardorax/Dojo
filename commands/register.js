const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('To register in the Dojo !'),
	async execute(interaction) {
		return interaction.reply({content: `This`, ephemeral: true});
	},
};