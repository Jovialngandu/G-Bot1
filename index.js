import { Telegraf } from 'telegraf';
import { config } from './src/config/env.js';
import { handleTextMessage } from './src/handlers/textHandler.js';

const bot = new Telegraf(config.botToken);

bot.on('text', handleTextMessage);

bot.launch()
    .then(() => console.log("🚀 Bot Telegram Gemini prêt et correctement structuré !"))
    .catch((err) => console.error("Erreur au démarrage du bot:", err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));