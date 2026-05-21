import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

/**
 * Extrait le texte brut et épuré d'un article à partir de son URL
 * @param {string} url 
 * @returns {Promise<string|null>}
 */
export async function extraireTexteArticle(url) {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
            timeout: 10000 // Évite de rester bloqué si le site ne répond pas
        });        
        
        const dom = new JSDOM(response.data, { url });        
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        
        return article ? article.textContent : null;
    } catch (error) {
        console.error(`[Scraper Error] Impossible de lire l'URL ${url}:`, error.message);
        return null;
    }
}