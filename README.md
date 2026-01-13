# MeteoApp 🌤️

Application météo moderne avec Vue.js 3 et Express.js

## 🚀 Déploiement

### Backend (Render)
1. Créez un Web Service sur [Render](https://render.com)
2. Connectez votre repo GitHub
3. Configuration :
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables** (à ajouter dans Render) :
     ```
     RAPIDAPI_KEY=votre_clé_rapidapi
     WEATHER_API_KEY=votre_clé_openweathermap
     ```

### Frontend (Netlify)
1. Mettez à jour `VITE_API_URL` dans `.env`
2. Build: `npm run build`
3. Déployez le dossier `dist/` sur [Netlify](https://netlify.com)

## 🔑 Configuration des clés API

### Backend
Copiez `.env.example` en `.env` et remplissez :
```bash
cd Backend
cp .env.example .env
# Éditez .env avec vos vraies clés
```

### Frontend
Créez `Frontend/.env` :
```env
VITE_API_URL=http://localhost:3000
```

En production, changez pour l'URL Render :
```env
VITE_API_URL=https://votre-backend.onrender.com
```

## 📦 Installation

### Backend
```bash
cd Backend
npm install
npm start
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

## 🌟 Fonctionnalités
- ☀️ Météo en temps réel
- 📊 Prévisions 7 jours
- 🗺️ Carte interactive Leaflet
- ⭐ Système de favoris
- 🌓 Mode sombre/clair
- 📱 Design responsive
- 🇫🇷 Interface en français
