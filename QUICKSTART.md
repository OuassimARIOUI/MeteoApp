# 🚀 Guide de Démarrage Rapide - MeteoApp Premium

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

## ⚡ Installation & Lancement

### 1️⃣ Backend (Terminal 1)

```powershell
# Naviguer vers le dossier Backend
cd Backend

# Installer les dépendances
npm install

# Lancer le serveur
npm start
```

Le backend démarrera sur `http://localhost:3001`

### 2️⃣ Frontend (Terminal 2)

```powershell
# Naviguer vers le dossier Frontend
cd Frontend

# Installer les dépendances (si ce n'est pas déjà fait)
npm install

# Lancer l'application en mode développement
npm run dev
```

Le frontend démarrera sur `http://localhost:5173` (ou le port indiqué)

## 🌟 Utilisation

### Page d'Accueil
1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Découvrez la page d'accueil avec toutes les fonctionnalités
3. Cliquez sur "Découvrir l'Application" pour accéder à l'app météo

### Recherche Météo
1. Entrez un code pays (ex: FR, DZ, US)
2. Tapez le nom d'une ville (minimum 2 caractères)
3. Sélectionnez la ville dans la liste déroulante
4. Cliquez sur "🌤️ Afficher la météo"

### Fonctionnalités Premium

#### ⭐ Favoris
- Cliquez sur "☆ Ajouter aux favoris" pour sauvegarder une ville
- Accédez à vos favoris via l'icône ⭐ en haut
- Cliquez sur un favori pour charger instantanément la météo

#### 🕒 Historique
- L'historique se remplit automatiquement
- Accédez-y via l'icône 🕒 en haut
- Effacez l'historique avec le bouton "Tout effacer"

#### 🌓 Mode Sombre
- Basculez entre mode clair et sombre via l'icône 🌙/☀️
- La préférence est sauvegardée automatiquement

#### 📍 Géolocalisation
- Cliquez sur l'icône 📍 pour détecter votre position
- Autorisez l'accès à la localisation dans votre navigateur

## 🎯 Fonctionnalités Disponibles

### Informations Météo Complètes
- ✅ Température actuelle
- ✅ Température ressentie
- ✅ Humidité
- ✅ Vitesse du vent
- ✅ Condition météo
- ✅ Indice UV
- ✅ Qualité de l'air

### Prévisions
- ✅ Prévisions sur 7 jours
- ✅ Détails par jour (température, humidité, vent)
- ✅ Icônes météo adaptées

### Interface
- ✅ Design glassmorphism moderne
- ✅ Animations fluides
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Notifications contextuelles
- ✅ États de chargement

## 🔧 Commandes Utiles

```powershell
# Frontend
npm run dev      # Lancer en mode développement
npm run build    # Compiler pour la production
npm run preview  # Prévisualiser la version de production

# Backend
npm start        # Lancer le serveur
```

## 🐛 Résolution de Problèmes

### Le backend ne démarre pas
- Vérifiez que le port 3001 est disponible
- Assurez-vous que les dépendances sont installées
- Vérifiez le fichier `.env` s'il existe

### Le frontend ne se connecte pas au backend
- Vérifiez que le backend tourne sur le port 3001
- Vérifiez les URLs dans les composants Vue
- Désactivez temporairement le pare-feu/antivirus

### Les villes ne s'affichent pas
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que le backend est lancé
- Vérifiez votre connexion internet

### Problème de géolocalisation
- Vérifiez les permissions du navigateur
- Utilisez HTTPS en production
- Certains navigateurs bloquent la géolocalisation sur localhost

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Appareils
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablettes (iPad, Android)
- ✅ Smartphones (iOS, Android)

## 🎨 Personnalisation

### Modifier les Couleurs
Éditez le fichier `Frontend/src/components/WeatherAppStyles.css`

```css
/* Gradient principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Mode sombre */
.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
```

### Modifier les Animations
Les animations sont définies dans le même fichier CSS

## 📞 Support

Pour toute question ou problème :
1. Consultez la documentation complète dans `IMPROVEMENTS.md`
2. Vérifiez les erreurs dans la console du navigateur (F12)
3. Vérifiez les logs du terminal backend

## 🎉 Bon Usage !

Profitez de votre nouvelle application météo ultra-moderne ! ☀️🌧️❄️

---

**Astuce**: Utilisez les raccourcis clavier de votre navigateur pour une navigation plus rapide :
- `Ctrl + R` : Recharger la page
- `F12` : Ouvrir les outils de développement
- `Ctrl + Shift + I` : Inspecter un élément
