import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

const ai = new GoogleGenerativeAI(config.geminiApiKey);
const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Génère un résumé structuré en 3 points à partir d'un texte brut
 * @param {string} texteArticle 
 * @returns {Promise<string>}
 */
export async function genererResume(texteArticle) {
    const prompt = `Agis comme un assistant de veille . Fais un résumé clair et structuré en 3 points clés de l'article suivant :\n\n${texteArticle}`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}