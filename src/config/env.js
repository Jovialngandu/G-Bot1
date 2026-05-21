import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BOT_TOKEN || !process.env.GEMINI_API_KEY) {
    throw new Error("❌ Erreur : Il manque BOT_TOKEN ou GEMINI_API_KEY dans le fichier .env");
}

export const config = {
    botToken: process.env.BOT_TOKEN,
    geminiApiKey: process.env.GEMINI_API_KEY,
};