# 🔑 Configuration des URLs et Clés API

## 📍 URLs à mettre à jour après déploiement

### Backend déployé sur Render
Après avoir déployé sur Render, vous obtiendrez une URL comme :
```
https://meteoapp-backend-xxxx.onrender.com
```

### Frontend - Mettre à jour cette URL

1. **Créez le fichier `Frontend/.env`** :
```env
VITE_API_URL=https://meteoapp-backend-xxxx.onrender.com
```

2. **Rebuild le frontend** :
```bash
cd Frontend
npm run build
```

3. **Redéployez sur Netlify** avec le nouveau build

---

## 🔐 Clés API requises

### RapidAPI (GeoDB Cities)
1. Allez sur https://rapidapi.com/wirefreethought/api/geodb-cities
2. Inscrivez-vous gratuitement
3. Copiez votre clé API
4. Ajoutez-la dans Render : `RAPIDAPI_KEY=votre_clé`

### OpenWeatherMap
1. Allez sur https://openweathermap.org/api
2. Créez un compte gratuit
3. Générez une clé API
4. Ajoutez-la dans Render : `WEATHER_API_KEY=votre_clé`

---

## ⚠️ IMPORTANT - Sécurité

### ❌ NE JAMAIS commiter sur GitHub :
- `Backend/.env`
- `Frontend/.env`
- Toute clé API en clair

### ✅ Commiter sur GitHub :
- `Backend/.env.example`
- `Frontend/.env.example`
- Tout le code source

---

## 🔄 Workflow de déploiement

```
1. Développement local
   └─ Backend/.env (avec vraies clés)
   └─ Frontend/.env (VITE_API_URL=http://localhost:3001)

2. GitHub
   └─ Code source uniquement
   └─ .env.example (sans vraies clés)

3. Render (Backend)
   └─ Variables d'environnement configurées dans le dashboard
   └─ RAPIDAPI_KEY
   └─ WEATHER_API_KEY

4. Netlify (Frontend)
   └─ Build avec VITE_API_URL pointant vers Render
```

---

## 📊 Checklist de déploiement

- [ ] Backend/.env contient RAPIDAPI_KEY et WEATHER_API_KEY
- [ ] Backend déployé sur Render
- [ ] Variables d'environnement configurées sur Render
- [ ] URL Render copiée
- [ ] Frontend/.env créé avec VITE_API_URL vers Render
- [ ] Frontend buildé (`npm run build`)
- [ ] Frontend déployé sur Netlify
- [ ] Site testé et fonctionnel
- [ ] .env ajouté à .gitignore
- [ ] Code pushé sur GitHub (sans les .env)

---

## 🆘 Support

Si vous avez des problèmes :
1. Vérifiez les logs Render (Dashboard → Logs)
2. Vérifiez la console navigateur (F12)
3. Vérifiez que les URLs sont correctes
4. Vérifiez que les clés API sont valides
