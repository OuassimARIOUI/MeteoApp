# 🚀 Guide de Déploiement GitHub + Render + Netlify

## 📋 Pré-requis
- Compte GitHub
- Compte Render (gratuit)
- Compte Netlify (gratuit)
- Vos clés API :
  - RapidAPI (GeoDB Cities)
  - OpenWeatherMap

---

## 🔐 ÉTAPE 1 : Sécuriser vos clés

✅ **Vérifiez que `.gitignore` exclut les fichiers sensibles :**
```bash
# Ces fichiers NE DOIVENT PAS être sur GitHub :
Backend/.env
Frontend/.env
```

✅ **Les fichiers `.env.example` PEUVENT être sur GitHub** (ils ne contiennent pas les vraies clés)

---

## 📤 ÉTAPE 2 : Push sur GitHub

```bash
# Initialisez Git (si pas déjà fait)
git init
git add .
git commit -m "Initial commit - MeteoApp"

# Créez un repo sur GitHub puis :
git remote add origin https://github.com/VOTRE_USERNAME/meteoapp.git
git branch -M main
git push -u origin main
```

---

## 🖥️ ÉTAPE 3 : Déployer le Backend sur Render

### 3.1 Créer le service
1. Allez sur https://render.com
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repo GitHub
4. Sélectionnez votre repo `meteoapp`

### 3.2 Configuration
```
Name: meteoapp-backend
Region: Oregon (US West)
Branch: main
Root Directory: Backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 3.3 Ajouter les variables d'environnement
Dans **"Environment Variables"**, ajoutez :
```
RAPIDAPI_KEY = votre_vraie_clé_rapidapi
WEATHER_API_KEY = votre_vraie_clé_openweathermap
NODE_ENV = production
```

### 3.4 Déployer
- Cliquez sur **"Create Web Service"**
- Attendez le déploiement (~2-3 minutes)
- **Copiez l'URL** : `https://meteoapp-backend-xxxx.onrender.com`

⚠️ **Note** : Le plan gratuit Render dort après 15 min d'inactivité (premier chargement = 30-60 sec)

---

## 🌐 ÉTAPE 4 : Déployer le Frontend sur Netlify

### 4.1 Configurer l'URL du backend
Créez `Frontend/.env` :
```env
VITE_API_URL=https://meteoapp-backend-xxxx.onrender.com
```
*(Remplacez par votre vraie URL Render)*

### 4.2 Build le frontend
```bash
cd Frontend
npm run build
```

### 4.3 Déployer sur Netlify

**Option A : Interface web (Simple)**
1. Allez sur https://netlify.com
2. Cliquez **"Add new site"** → **"Deploy manually"**
3. Glissez-déposez le dossier `Frontend/dist/`
4. ✅ Votre site est en ligne !

**Option B : CLI (Automatique)**
```bash
npm install -g netlify-cli
netlify login
cd Frontend
netlify deploy --prod --dir=dist
```

### 4.4 Configuration Netlify (Important pour Vue Router)
Créez `Frontend/public/_redirects` :
```
/*    /index.html   200
```

---

## 🎉 ÉTAPE 5 : Tester

1. Ouvrez l'URL Netlify : `https://votre-site.netlify.app`
2. Testez la recherche de ville
3. Vérifiez que la météo se charge

---

## 🔄 Redéploiement

### Mettre à jour le Backend
```bash
git add .
git commit -m "Update backend"
git push
```
→ Render redéploie automatiquement

### Mettre à jour le Frontend
```bash
cd Frontend
npm run build
netlify deploy --prod --dir=dist
```

---

## 🐛 Dépannage

### Le backend ne répond pas
- Vérifiez que les clés API sont bien configurées sur Render
- Logs : Dashboard Render → votre service → "Logs"

### Le frontend ne charge pas la météo
- Vérifiez `VITE_API_URL` dans `Frontend/.env`
- Ouvrez la console navigateur (F12) pour voir les erreurs
- Vérifiez que le backend est bien accessible

### CORS errors
Vérifiez dans `Backend/index.js` :
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://votre-site.netlify.app']
}))
```

---

## 📊 Résumé

| Composant | Plateforme | URL |
|-----------|-----------|-----|
| Backend | Render | `https://meteoapp-backend-xxxx.onrender.com` |
| Frontend | Netlify | `https://votre-site.netlify.app` |
| Code source | GitHub | `https://github.com/VOTRE_USERNAME/meteoapp` |

**Coût total : 0€ avec les plans gratuits !** 🎊
