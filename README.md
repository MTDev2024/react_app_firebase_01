# PerfectRide

Application web d'aide au choix de trottinettes électriques. L'utilisateur répond à un questionnaire personnalisé et obtient des recommandations adaptées à ses besoins, avec la possibilité de comparer les modèles, de les mettre en favoris et de consulter un blog dédié.

Déployée sur Vercel : [perfectride.vercel.app](https://perfectride.vercel.app)

---

## Stack technique

- **React** (Create React App)
- **Tailwind CSS** — design responsive
- **Firebase** — Firestore, Auth (email + Google), Storage
- **Zustand** — gestion de l'état global (auth, store)
- **React Router v6** — navigation
- **Vercel** — déploiement

---

## Fonctionnalités

- Questionnaire dynamique multi-étapes avec navigation avant/arrière
- Page de résultats avec tri et filtres (prix, puissance, autonomie, marque)
- Page de détail par trottinette
- Comparateur de modèles (jusqu'à 3)
- Favoris synchronisés avec Firestore
- Authentification complète (email/password + Google)
- Blog avec filtres par tags
- Calculateur d'économies (voiture vs trottinette) avec impact CO₂
- Page À propos, CGU, Mentions légales, Politique de confidentialité
- Page 404 animée
- Navbar responsive avec menu hamburger et liens actifs animés
- Interface d'administration (gestion des trottinettes, articles, newsletter, utilisateurs)
- Error Boundary global

---

## Variables d'environnement

Copier `.env.example` en `.env` et renseigner les valeurs depuis la [Firebase Console](https://console.firebase.google.com) :

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

Ces mêmes variables doivent être ajoutées dans **Vercel → Settings → Environment Variables** pour le déploiement.

---

## Installation

```bash
git clone https://github.com/MTDev2024/react_app_firebase_01.git
cd react_app_firebase_01
npm install
cp .env.example .env   # puis renseigner les valeurs Firebase
npm start              # http://localhost:3000
```

---

## À venir

- Système de notation et avis utilisateurs
- Calculateur d'impact carbone avancé
