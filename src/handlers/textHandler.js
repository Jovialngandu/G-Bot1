import { extraireTexteArticle } from '../services/scraper.js';
import { genererResume } from '../services/gemini.js';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const TELEGRAM_MAX_LENGTH = 4000; // Marge de sécurité 4096 autorisés

export async function handleTextMessage(ctx) {
    const messageText = ctx.message.text;
    const urlTrouvee = messageText.match(URL_REGEX);

    if (!urlTrouvee) {
        return ctx.reply("📥 Envoyez-moi un lien valide (http/https) pour que je puisse le résumer !");
    }

    const url = urlTrouvee[0];
    await ctx.reply("⏳ Analyse et lecture de l'article en cours...");

    ctx.sendChatAction('typing').catch(() => {});
    const typingInterval = setInterval(() => {
        ctx.sendChatAction('typing').catch(() => {});
    }, 4000);

    try {
        const texteArticle = await extraireTexteArticle(url);
        if (!texteArticle || texteArticle.trim().length < 100) {
            clearInterval(typingInterval);
            return ctx.reply("❌ Impossible d'extraire le contenu de ce lien (le site bloque peut-être les robots ou est vide).");
        }

        let aiText = await genererResume(texteArticle);

        if (aiText.length > TELEGRAM_MAX_LENGTH) {
            aiText = aiText.substring(0, TELEGRAM_MAX_LENGTH) + "\n\n...(Résumé tronqué car trop long)";
        }

        clearInterval(typingInterval);
        await ctx.reply(aiText);

    } catch (error) {
        clearInterval(typingInterval);
        console.error('[Handler Error]:', error);
        await ctx.reply("❌ Une erreur est survenue lors du traitement de votre demande.");
    }
}