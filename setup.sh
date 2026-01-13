#!/bin/bash

echo "🚀 Déploiement MeteoApp"
echo "======================="
echo ""

# Vérifier si .env existe
if [ ! -f "Backend/.env" ]; then
    echo "❌ Fichier Backend/.env manquant!"
    echo "Copiez Backend/.env.example vers Backend/.env et ajoutez vos clés API"
    exit 1
fi

if [ ! -f "Frontend/.env" ]; then
    echo "⚠️  Fichier Frontend/.env manquant!"
    echo "Créez Frontend/.env avec: VITE_API_URL=http://localhost:3000"
fi

echo "✅ Vérification des fichiers OK"
echo ""
echo "📦 Installation Backend..."
cd Backend
npm install
cd ..

echo ""
echo "📦 Installation Frontend..."
cd Frontend
npm install
cd ..

echo ""
echo "✅ Installation terminée!"
echo ""
echo "Pour démarrer en local:"
echo "  Backend:  cd Backend && npm start"
echo "  Frontend: cd Frontend && npm run dev"
echo ""
echo "Pour déployer sur GitHub:"
echo "  1. Lisez DEPLOYMENT.md"
echo "  2. git add . && git commit -m 'Ready for deployment'"
echo "  3. git push origin main"
