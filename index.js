import { config } from "dotenv";
import { Telegraf } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Charger les variables depuis le fichier .env
config();

// 🔐 API keys
const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialisation des services
const bot = new Telegraf(BOT_TOKEN);
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // Tu peux changer en gemini-pro si besoin

// Commande /start
bot.start((ctx) => {
  ctx.reply("👋 Salut ! Envoie-moi un message et je te répondrai avec Gemini.");
});

// Gestion des messages texte
bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;
  const userId = ctx.from.id;

  console.log(`[${userId}] > ${userMessage}`);

  try {
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    ctx.reply(text);
  } catch (error) {
    console.error("Erreur Gemini :", error.message);
    ctx.reply("❌ Erreur lors de l’appel à Gemini.");
  }
});

// Lancer le bot
bot.launch();
console.log("🤖 Bot lancé avec Gemini 1.5 Flash !");
