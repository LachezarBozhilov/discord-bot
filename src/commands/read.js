const { SlashCommandBuilder } = require("@discordjs/builders");
const { createWorker } = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const https = require("https");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("read")
    .setDescription("Reading images send in previous messages sent before this command was initiated ")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to read")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    const messages = await interaction.channel.messages.fetch({
      limit: amount + 1,
    });

    const imageAttachments = messages.filter(
      (message) =>
        message.attachments.size > 0 &&
        message.attachments.first().contentType.startsWith("image/")
    );

    try {
      const worker = await createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      let text = "";

      for (const message of imageAttachments.values()) {
        // image
        const messageImage = await message.attachments.first();
        // download image
        const imageData = await new Promise((resolve, reject) => {
          https.get(messageImage.url, (response) => {
            const chunks = [];
            response.on("data", (chunk) => chunks.push(chunk));
            response.on("end", () => resolve(Buffer.concat(chunks)));
            response.on("error", reject);
          });
        });
        const filename = `${message.id}-${messageImage.name}`;
        const directory = "./images"; // replace this with your desired directory path
        const filepath = path.join(directory, filename); // join the directory path and the filename
        fs.writeFileSync(filepath, imageData);

        try {
          const messageData = await worker.recognize(filepath);

          const {
            data: { text: messageText },
          } = messageData;
          if (messageText) {
            text += messageText + "\n";
          }
        } catch (err) {
          if (err) {
            console.error(err);
          }
        }
      }
      await worker.terminate();
      await interaction.reply(
        "Read text: " + amount + " messages:\n" + text
      );
    } catch (error) {
      if (error) {
        console.error(error);
        await interaction.reply({
          content: "Error executing read",
          ephemeral: true,
        });
      }
    }
  },
};
