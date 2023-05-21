const { Telegraf } = require("telegraf");
const TOKEN = "6192270764:AAG1g3p5aOhdrcZyku5an3Qx_q_1l2l00GA";
const bot = new Telegraf(TOKEN);

const web_link = "https://funny-kelpie-bffd00.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
