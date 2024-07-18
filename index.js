

const { Telegraf } = require("telegraf");
const axios = require("axios");
const path = require("path");

const bot = new Telegraf("6809279648:AAH9CZQIpgeVKZWhg3o2zVv0awic9ArJW7Q");

const imagePath = (fileName) => path.join(__dirname, "images", fileName);

const registerUser = async (userId, username, inviterUsername = "") => {
  try {
    const response = await axios.post("https://walledb.onrender.com/api/Cluster0/register", {
      userId,
      inviterUsername,
      username,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response.data);
    throw error;
  }
};

bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || `user${userId}`;
  const inviterUsername = ctx.startPayload || "";

  try {
    await registerUser(userId, username, inviterUsername);
    ctx.replyWithPhoto(
      { source: imagePath("description.jpg") },
      {
        caption: `*Welcome, @${username}! to Ton Diamond 💎*\n\nYou are now a Builder on Ton Blockchain and can be entitled to revenues generated by *Ton Diamond💎💎!!*`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Play",
                web_app: { url: "https://walle-bot.vercel.app/" },
              },
              { text: "Join community", callback_data: "join_community" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    ctx.reply('Welcome Back!');
  }
});

bot.launch();
