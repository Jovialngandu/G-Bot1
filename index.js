import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!BOT_TOKEN || !GEMINI_API_KEY) {
    throw new Error('Il manque BOT_TOKEN ou GEMINI_API_KEY dans le fichier .env');
}

// Initialisation avec vos clés secrètes
const bot = new Telegraf(BOT_TOKEN);
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

async function extraireTexteArticle(url) {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });        
        const dom = new JSDOM(response.data, { url });        
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        
        return article ? article.textContent : null;
    } catch (error) {
        console.error("Erreur de scraping:", error.message);
        return null;
    }
}

bot.on('text', async (ctx) => {
    const messageText = ctx.message.text;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlTrouvee = messageText.match(urlRegex);
	console.log(`Message reçu: ${urlTrouvee ? urlTrouvee[0] : "Aucun lien trouvé"}`);
    if (!urlTrouvee) {
        return ctx.reply("Envoyez-moi un lien valide pour que je puisse le résumer !");
    }

    const url = urlTrouvee[0];
    await ctx.reply("⏳ Analyse et lecture de l'article en cours...");

    // Extraire le texte du site web
    const texteArticle = await extraireTexteArticle(url);

    if (!texteArticle || texteArticle.trim().length < 100) {
        return ctx.reply("❌ Impossible d'extraire le contenu de ce lien (le site bloque peut-être les robots).");
    }

     try {
		ctx.sendChatAction('typing')
		const result = await model.generateContent(`Agis comme un assistant de veille.Pas de Bonjour ,ni de salutation . Fais un résumé clair et structuré en 3 points clés (la taille du résumé depends de la longueur de l'article) de l'article suivant :\n\n${texteArticle}`);		
		const aiText = result.response.text(); 
		await ctx.reply(aiText);
    
  } catch (aiError) {
    console.error('Erreur Gemini:', aiError);
    await ctx.reply('❌ Une erreur est survenue lors de la génération du résumé par l\'IA.');
  }
});

bot.launch().then(() => console.log("🚀 Bot Telegram Gemini prêt !"));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
