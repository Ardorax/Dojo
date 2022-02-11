const { SlashCommandBuilder } = require('@discordjs/builders');


//the event categorie
// chan register
// chan ressources :
//
// dojo create name lien
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dojo')
		.setDescription('This is an admin command !')
		.addSubcommand(subcommand => subcommand
			.setName("create")
			.setDescription("Create a dojo !")
			.addStringOption(option => option
				.setName("name")
				.setDescription("The name of the dojo")
				.setRequired(true)
			)
			.addStringOption(option => option
				.setName("lien")
				.setDescription("le lien du dojo")
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName("delete")
			.setDescription("Supprimer le dojo")
		),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === "delete") {
			return interaction.reply('Vous avez supprimer le dojo !');
		}
		if (interaction.options.getSubcommand() === "create") {
			const name = interaction.options.getString("name");
			const lien = interaction.options.getString("lien");
			return interaction.reply(`Vous avez créé le dojo "${name}" au lien : ${lien}`);
		}
	},
};