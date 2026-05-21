# 🤖 G-Bot

Un bot Telegram intelligent et généraliste qui extrait le texte de n'importe quel lien web (actualités, blogs, guides...) et génère un résumé clair et structuré en 3 points clés grâce à l'IA **Gemini 2.5 Flash**.

🚀 **Disponible en production ici :** [@g_jvl_bot](https://t.me/g_jvl_bot)

## ✨ Fonctionnalités
- 🌐 **Scraping propre :** Extrait uniquement le contenu utile (vire les pubs, scripts et menus) via Mozilla Readability.
- ⚡ **Résumé Instantané :** Génère une synthèse ultra-rapide en 3 points.
- ⏳ **Indicateur visuel :** Affiche le statut "en train d'écrire..." pendant que l'IA réfléchit.
- 🏗️ **Architecture propre :** Code modularisé, propre et évolutif.

## 🛠️ Configuration & Lancement

### 1. Installation
```bash
git clone [https://github.com/Jovialngandu/G-Bot1.git](https://github.com/Jovialngandu/G-Bot1.git)
cd G-Bot1
npm install
```
### 2. Variables d'environnement
Créez un fichier .env à la racine et ajoutez vos clés :

```bash
#Extrait de code
BOT_TOKEN=votre_token_telegram_ici
GEMINI_API_KEY=votre_cle_gemini_ici
```
### 3. Démarrage
```bash
npm start
```
## 📦 Technologies utilisées
Telegraf (Framework Telegram)

@google/generative-ai (SDK Gemini)

Axios & JSDOM (Scraping)

@mozilla/readability (Nettoyage de l'article)