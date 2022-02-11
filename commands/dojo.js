const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

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
			let dojo_channels = [];
			let size = 0;
			interaction.guild.channels.cache.each(chan => {
				console.log(chan.name);
				if (chan.parentId == "941736035891699712") {
					dojo_channels.push(chan);
				}
			});
			size = dojo_channels.length;
			dojo_channels.forEach(chan => {
				chan.delete(`Destruction par ${interaction.member.id}`);
			})
			return interaction.reply(`Vous avez supprimé le dojo et ses ${size} channels !`);
		}
		if (interaction.options.getSubcommand() === "create") {
			const name = interaction.options.getString("name");
			const lien = interaction.options.getString("lien");
			if (!(name && lien)) return interaction.reply(`Vous devez préciser un nom et un lien.`);
			const main_category = interaction.guild.channels.cache.get("941736035891699712")
			interaction.guild.channels.create("ressources", {
				permissionOverwrites : [
					{
						id: interaction.guild.roles.everyone,
						deny: ["SEND_MESSAGES"]
					}
				],
				parent : main_category
			});
			return interaction.reply({content: `Vous avez créé le dojo "${name}" au lien : ${lien}`, ephemeral : true});
		}
	},
};