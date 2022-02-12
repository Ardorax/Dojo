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
		)
		.addSubcommand(subcommand => subcommand
			.setName("list")
			.setDescription("Affiche la liste des inscrits")
		),
	async execute(interaction) {
		// Verify if user can use cmd
		if (interaction.guild.me.roles.highest.comparePositionTo(interaction.member.roles.highest) > 0) {
			return interaction.reply({content: `Vous n'avez pas le droit d'utiliser cette commande`, ephemeral : true});
		}

		if (interaction.options.getSubcommand() === "delete") {
			let dojo_channels = [];
			let size = 0;
			interaction.guild.channels.cache.each(chan => {
				if (chan.id == "941736035891699712") {
					chan.setName("No Events");
				}
				if (chan.parentId == "941736035891699712") {
					dojo_channels.push(chan);
				}
			});
			size = dojo_channels.length;
			dojo_channels.forEach(chan => {
				chan.delete(`Destruction par ${interaction.member.id}`);
			})
			interaction.client.students = new Object();
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
					},
					// Responsables
					{
						id: "939876544137015306",
						allow: ["SEND_MESSAGES"]
					},
					// Headquarters
					{
						id: "940320600428277760",
						allow: ["SEND_MESSAGES"]
					},
					// Dojo
					{
						id: "940247759133495346",
						allow: ["SEND_MESSAGES"]
					}
				],
				parent : main_category
			}).then(channel => {
				channel.send(`Bienvenue dans le Dojo ! Le theme est : \`${name}\`\nVoici le lien du github classroom : ${lien}`)
			});
			main_category.setName(name);
			return interaction.reply({content: `Vous avez créé le dojo "${name}" au lien : ${lien}`, ephemeral : false});
		}

		if (interaction.options.getSubcommand() === "list") {
			console.log(JSON.stringify(interaction.client.students))
			let result = `Voici les inscrits :`
			for (key in interaction.client.students) {
				result += `\n${key}`
			}
			interaction.reply({content : result, ephemeral: true});
		}
	},
};