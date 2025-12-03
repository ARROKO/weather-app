# ☁️ Météo App

Une application météo moderne et performante construite avec React, TypeScript et Tailwind CSS. Profitez d'une expérience utilisateur premium avec des animations fluides, des prévisions détaillées et une interface élégante.

![Weather App](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwindcss)

## ✨ Fonctionnalités

### 🌡️ Météo en Temps Réel
- Recherche de ville avec suggestions
- Données météo actuelles complètes
- Géolocalisation automatique
- Mise à jour en temps réel

### 📅 Prévisions Avancées
- **Prévisions 5 jours** avec timeline scrollable
- Températures min/max quotidiennes
- Probabilité de précipitation
- Icônes météo animées

### 🎯 Détails Météo Complets
- **Index UV** avec indicateur coloré
- **Qualité de l'air (AQI)** avec recommandations santé
- **Pression atmosphérique** avec tendance
- **Visibilité** en kilomètres
- Température ressentie
- Vitesse du vent
- Taux d'humidité
- Lever/coucher du soleil

### 🎨 Interface Premium
- **Fond dynamique** qui change selon la météo
- **Animations météo légères** (pluie, neige) en CSS pur
- **Skeleton loaders** avec effet shimmer sur toutes les images
- **Glassmorphism** et effets de glow
- **Micro-interactions** fluides au hover
- Design responsive (mobile, tablette, desktop)

### 🌍 Villes Populaires
- Accès rapide à 6 villes populaires
- Images haute qualité avec chargement progressif
- Paris, Londres, New York, Tokyo, Dubaï, Sydney

## 🚀 Technologies

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **React Query** - Gestion des données et cache
- **Axios** - Requêtes HTTP
- **date-fns** - Manipulation des dates
- **Lottie React** - Animations vectorielles performantes
- **React Icons** - Icônes météo
- **React Hot Toast** - Notifications élégantes

## 📦 Installation

### Prérequis
- Node.js 16+ et npm

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/ARROKO/weather-app.git
cd weather-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'API**
```bash
# Copiez le fichier .env.example en .env
cp .env.example .env
```

Ensuite, éditez le fichier `.env` et remplacez `your_api_key_here` par votre clé API OpenWeatherMap :
- Obtenez une clé API gratuite sur [OpenWeatherMap](https://openweathermap.org/api)
- Ajoutez-la dans `.env` : `VITE_OPENWEATHER_API_KEY=votre_clé_ici`

4. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Structure du Projet

```
weather-app/
├── src/
│   ├── components/
│   │   ├── ImageLoader.tsx          # Loader d'images avec skeleton
│   │   ├── SearchBar.tsx            # Barre de recherche
│   │   ├── WeatherCard.tsx          # Carte météo principale
│   │   ├── ForecastCard.tsx         # Prévisions 5 jours
│   │   ├── AdvancedDetails.tsx      # Détails avancés (UV, AQI, etc.)
│   │   ├── PopularCities.tsx        # Villes populaires
│   │   └── WeatherAnimation.tsx     # Animations météo CSS
│   ├── services/
│   │   └── WeatherApi.ts            # Service API OpenWeatherMap
│   ├── types/
│   │   ├── weather.ts               # Types météo
│   │   └── forecast.ts              # Types prévisions
│   ├── assets/
│   │   ├── icons/                   # Icônes météo
│   │   └── images/                  # Images des villes
│   ├── App.tsx                      # Composant principal
│   ├── index.css                    # Styles globaux + animations
│   └── main.tsx                     # Point d'entrée
├── public/
├── package.json
└── README.md
```

## 🎨 Fonctionnalités Visuelles

### Fond Dynamique
Le fond change automatiquement selon les conditions météo :
- ☀️ **Clair (jour)** : Dégradé bleu ciel vibrant
- 🌙 **Clair (nuit)** : Dégradé indigo/violet profond
- 🌧️ **Pluie** : Tons gris ardoise
- ☁️ **Nuages** : Gris nuancé
- ❄️ **Neige** : Gris clair
- ⚡ **Orage** : Noir profond

### Animations Météo
Effets CSS légers et performants :
- 🌧️ Effet de pluie avec gradient animé
- ❄️ Effet de neige avec particules flottantes
- GPU-accelerated pour fluidité maximale

### Skeleton Loaders
- Temps d'affichage minimum de 300ms
- Animation shimmer élégante
- Fade-in progressif des images

## 🔧 Scripts Disponibles

```bash
npm run dev          # Lancer en mode développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code
```

## 🌐 API Utilisée

**OpenWeatherMap API**
- Current Weather Data
- 5 Day / 3 Hour Forecast
- Air Pollution API

## 📱 Responsive Design

L'application est entièrement responsive :
- 📱 **Mobile** : Layout optimisé, grille 2 colonnes
- 📲 **Tablette** : Grille 3 colonnes, espacement amélioré
- 💻 **Desktop** : Expérience complète, animations avancées

## ⚡ Optimisations Performance

- ✅ Animations CSS pures (pas de JavaScript lourd)
- ✅ React Query pour cache et gestion d'état
- ✅ Lazy loading des images avec skeleton
- ✅ Transitions GPU-accelerated
- ✅ Code splitting automatique avec Vite
- ✅ Composants optimisés avec React.memo

## 🎯 Améliorations Futures

- [ ] Mode sombre/clair manuel
- [ ] Historique des recherches
- [ ] Graphiques de température interactifs
- [ ] Alertes météo
- [ ] Support multilingue
- [ ] PWA (Progressive Web App)
- [ ] Animations Lottie avancées

## 📄 Licence

MIT License - Libre d'utilisation

## 👨‍💻 Auteur

**ARROKO**
- GitHub: [@ARROKO](https://github.com/ARROKO)

## 🙏 Remerciements

- [OpenWeatherMap](https://openweathermap.org/) pour l'API météo
- [Unsplash](https://unsplash.com/) pour les images des villes
- [Flaticon](https://www.flaticon.com/) pour les icônes météo
- [LottieFiles](https://lottiefiles.com/) pour les animations

---

⭐ **N'hésitez pas à mettre une étoile si ce projet vous plaît !**
