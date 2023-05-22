const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Events,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("button").setDescription("button"),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "button") {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("primary")
          .setLabel("Click me!")
          .setStyle(ButtonStyle.Primary)
          
      );

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Some title")
        .setURL("https://discord.js.org")
        .setDescription("Some description here");

      await interaction.reply({
        content: "I think you should,",
        ephemeral: true,
        embeds: [embed],
        components: [row],
      });
    }
  },
};
