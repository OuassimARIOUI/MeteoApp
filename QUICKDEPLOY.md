# ✅ CHECKLIST DÉPLOIEMENT

## 🎯 Résumé rapide

Votre code est maintenant prêt pour GitHub + Render + Netlify !

---

## 📝 CE QUE J'AI PRÉPARÉ POUR VOUS :

### ✅ Fichiers de sécurité créés
- `Backend/.env.example` - Template pour vos clés API
- `Frontend/.env.example` - Template pour l'URL du backend
- `.gitignore` - Protège vos clés secrètes
- `Backend/.gitignore` - Protection supplémentaire

### ✅ Configuration API
- `Frontend/src/config/api.js` - Utilise les variables d'environnement
- `Backend/index.js` - Configuré pour Render (PORT dynamique + CORS)
- Routes mises à jour : `/api/cities` et `/api/weather`

### ✅ Fichiers de déploiement
- `Backend/render.yaml` - Configuration Render
- `Frontend/public/_redirects` - Configuration Netlify pour Vue Router
- `README.md` - Documentation du projet
- `DEPLOYMENT.md` - Guide complet de déploiement
- `CONFIGURATION.md` - Guide des URLs et clés API

---

## 🚀 COMMANDES À EXÉCUTER MAINTENANT

### 1️⃣ Créer vos fichiers .env (LOCAL UNIQUEMENT)

```bash
# Backend - Copiez vos vraies clés API
cd Backend
echo "RAPIDAPI_KEY=votre_clé_rapidapi" > .env
echo "WEATHER_API_KEY=votre_clé_openweathermap" >> .env
cd ..

# Frontend - Pour dev local
cd Frontend
echo "VITE_API_URL=http://localhost:3001" > .env
cd ..
```

### 2️⃣ Tester en local

```bash
# Terminal 1 - Backend
cd Backend
npm install
npm start

# Terminal 2 - Frontend
cd Frontend
npm install
npm run dev
```

Ouvrez http://localhost:5173 et testez que tout fonctionne.

### 3️⃣ Push sur GitHub

```bash
# À la racine du projet
git init
git add .
git commit -m "🚀 Ready for deployment - MeteoApp"

# Créez un repo sur github.com puis :
git remote add origin https://github.com/VOTRE_USERNAME/meteoapp.git
git branch -M main
git push -u origin main
```

### 4️⃣ Déployer Backend (Render)

1. Allez sur https://render.com
2. "New Web Service" → Connectez GitHub
3. Sélectionnez votre repo
4. Configuration :
   - Root Directory: `Backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Ajoutez les variables :
   - `RAPIDAPI_KEY` = votre clé
   - `WEATHER_API_KEY` = votre clé
6. Deploy!

**Copiez l'URL Render** : `https://meteoapp-backend-xxxx.onrender.com`

### 5️⃣ Déployer Frontend (Netlify)

```bash
cd Frontend

# Mettez à jour .env avec l'URL Render
echo "VITE_API_URL=https://meteoapp-backend-xxxx.onrender.com" > .env

# Build
npm run build

# Déployez
# Option 1 : Glissez-déposez le dossier dist/ sur netlify.com
# Option 2 : CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🎉 TERMINÉ !

Votre application est maintenant en ligne :
- Backend : https://votre-backend.onrender.com
- Frontend : https://votre-site.netlify.app

**Coût total : 0€** (plans gratuits)

---

## ⚠️ RAPPELS IMPORTANTS

1. **NE JAMAIS** commit les fichiers `.env` sur GitHub
2. Les clés API doivent être configurées **uniquement** sur Render (backend)
3. Le premier chargement Render peut prendre 30-60s (plan gratuit)
4. Lisez `DEPLOYMENT.md` pour plus de détails

---

## 🐛 Problèmes ?

- Backend ne démarre pas → Vérifiez les logs sur Render
- Frontend ne charge pas → Vérifiez `VITE_API_URL` dans `.env`
- CORS errors → Vérifiez que votre URL Netlify est autorisée dans `Backend/index.js`

**Besoin d'aide ? Lisez les fichiers `DEPLOYMENT.md` et `CONFIGURATION.md`**
