# Documentation des améliorations — TrottiComp

Session de refactoring — Mars 2026
Projet : comparateur de trottinettes électriques (React 18 + Firebase)

---

## Table des matières

1. [Sécurité — Variables d'environnement](#1-sécurité--variables-denvironnement)
2. [State management — Zustand](#2-state-management--zustand)
3. [Migration des composants Management](#3-migration-des-composants-management)
4. [Vulnérabilités npm](#4-vulnérabilités-npm)
5. [Error Boundary](#5-error-boundary)
6. [Optimisation des requêtes Firestore](#6-optimisation-des-requêtes-firestore)
7. [Refactoring des composants Question](#7-refactoring-des-composants-question)

---

## 1. Sécurité — Variables d'environnement

### Problème
Les credentials Firebase (clé API, project ID, etc.) étaient écrits **en dur** dans `src/firebase.js` :
```js
const firebaseConfig = {
  apiKey: "AIzaSyBW2hEKhLTjLZrHhNujvvMh-ZY9Z_15rmE", // visible dans le dépôt
  ...
};
```
De plus, une clé privée Firebase Admin SDK était stockée dans `src/config/` — un fichier qui donne un **accès total et sans restriction** à tout le projet Firebase.

### Ce qu'on a fait
- Créé un fichier `.env` à la racine du projet avec les credentials
- Ajouté `.env` et `src/config/` au `.gitignore`
- Créé un `.env.example` (vide) comme template pour les futurs développeurs
- Mis à jour `firebase.js` pour lire les variables d'environnement :

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  ...
};
```

> **Note importante :** Le préfixe `REACT_APP_` est obligatoire avec Create React App.
> Le serveur doit être **redémarré** après toute modification du `.env`.

### Pourquoi c'est important
- Le `.env` est ignoré par git → les credentials ne sont jamais envoyés sur GitHub
- Si le dépôt devient public, aucune donnée sensible n'est exposée
- La clé Admin SDK a été supprimée du code client : elle ne doit exister que côté serveur (Cloud Functions, backend Node.js)

---

## 2. State management — Zustand

### Problème
La logique d'authentification était **dupliquée** dans 7+ composants. Chaque composant faisait ses propres appels Firebase au démarrage :

```js
// Répété dans NavBar, ProtectedRoute, AddArticle, ManageArticles...
const [user, setUser] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // appel Firestore
    setUser(currentUser);
    setIsAdmin(userDoc.data().role === "Administrateur");
  });
  return () => unsubscribe();
}, []);
```

**Problèmes concrets :**
- Firebase était interrogé plusieurs fois au démarrage
- Chaque interrogation = une **lecture Firestore facturée**
- Risque d'incohérence entre composants (états désynchronisés)
- `ProtectedRoute` utilisait `auth.currentUser` (synchrone et bugué au démarrage)

### Ce qu'on a fait

**Installation de Zustand** — librairie de state management légère (alternative moderne à Redux).

**Structure créée :**
```
src/store/
  store.js          → store principal qui assemble les slices
  slices/
    authSlice.js    → état et actions liés à l'auth
```

**Le store contient :**
```js
{
  user: null,       // objet utilisateur Firebase
  isAdmin: false,   // rôle administrateur
  isLoading: true,  // Firebase a-t-il fini de charger ?
}
```

**`App.jsx`** initialise l'écoute Firebase **une seule fois** :
```js
onAuthStateChanged(auth, async (firebaseUser) => {
  const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
  const isAdmin = userDoc.data().role === "Administrateur";
  setUser(firebaseUser, isAdmin); // → stocké dans le store
});
```

**Chaque composant** lit simplement le store :
```js
const { user, isAdmin, isLoading } = useStore();
```

### Pourquoi Zustand et pas Redux ?
| | Context API | Zustand | Redux |
|---|---|---|---|
| Complexité | Faible | Faible | Élevée |
| Boilerplate | Peu | Très peu | Beaucoup |
| Performance | Peut causer des re-renders | Optimisé | Optimisé |
| Usage idéal | État simple | État partagé moyen | Grande app complexe |

Pour ce projet, Zustand est le bon compromis : puissant, simple, sans Provider.

### Notion importante — Slices
Un **slice** est une portion de l'état global avec ses propres actions. Le store assemble les slices :
```js
// store.js
const useStore = create((...args) => ({
  ...authSlice(...args),
  // ...favoritesSlice(...args), // à ajouter plus tard
}));
```
C'est le même concept que Redux Toolkit mais avec beaucoup moins de code.

### Gains
- **Appels Firestore au démarrage :** de 7 à 1
- **Lignes de code supprimées :** ~150 lignes de logique dupliquée
- **Bug corrigé :** `ProtectedRoute` ne redirige plus prématurément au démarrage

---

## 3. Migration des composants Management

### Problème
Les 5 composants d'administration (`AddArticle`, `AddTrottinette`, `ManageArticles`, `ManageNewsletter`, `ManageTrottinettes`) répétaient chacun la même vérification d'admin via Firebase.

### Ce qu'on a fait
Suppression de toute la logique d'auth dans ces composants, remplacée par une seule ligne :
```js
const { isAdmin } = useStore();
```

### Gains
- Plus aucun appel Firestore redondant dans les composants d'administration
- Code plus lisible et maintenable
- Comportement cohérent garanti (même source de vérité)

---

## 4. Vulnérabilités npm

### Situation de départ
55 vulnérabilités détectées par `npm audit` (3 critiques, 26 hautes...).

### Ce qu'on a fait
1. `npm audit fix` → corrige les vulnérabilités sans breaking changes
2. `npm uninstall firebase-admin` → suppression du SDK Admin inutile côté frontend, qui tirait de nombreuses dépendances vulnérables

### Résultat
**55 → 26 vulnérabilités.** Les 26 restantes viennent de `react-scripts` (Create React App) et ne peuvent pas être corrigées sans migrer vers Vite.

> **Pourquoi firebase-admin était là ?**
> Le SDK Admin est fait pour les serveurs (Node.js, Cloud Functions). Il n'a aucune utilité dans un frontend React et exposait une clé privée dans le code client.

---

## 5. Error Boundary

### Problème
Sans protection, une erreur JavaScript non gérée dans n'importe quel composant plante **toute l'application** — l'utilisateur voit un écran blanc sans explication.

En développement, React affiche une overlay d'erreur. En **production**, cette overlay disparaît. Sans Error Boundary, le crash est silencieux.

### Ce qu'on a fait
Création de `src/components/ErrorBoundary.jsx` — un composant qui intercepte toutes les erreurs et affiche un message propre :

```
"Une erreur est survenue — Recharger la page"
```

Il enveloppe toute l'app dans `App.jsx`.

### Particularité technique
Les Error Boundaries **doivent être des class components** — c'est l'une des rares limitations de React. Les hooks ne peuvent pas intercepter les erreurs de rendu. C'est pourquoi on voit du code `class` au lieu de `function`.

### Pourquoi c'est important pour TrottiComp
De nombreux composants font des appels Firestore. Si Firebase est momentanément indisponible, sans Error Boundary toute l'app s'effondre silencieusement.

---

## 6. Optimisation des requêtes Firestore

### Notion fondamentale — Les appels Firestore sont facturés à la lecture

Un appel comme :
```js
getDoc(doc(db, "users", currentUser.uid))
```
est une **requête réseau** vers la base de données Firestore. Ce n'est pas un simple accès mémoire — c'est l'équivalent d'un appel API.

**Firebase facture chaque lecture de document.** Dans le plan gratuit (Spark), la limite est de 50 000 lectures/jour. Au-delà, chaque lecture est payante.

### Problème identifié dans `api.js`

À chaque chargement du blog, deux appels Firestore étaient effectués :

```js
// Appel 1 — récupère les articles paginés ✅ nécessaire
const snapshot = await getDocs(q);

// Appel 2 — télécharge TOUS les articles juste pour les compter ❌
const totalDocuments = (await getDocs(articlesRef)).size;
// Si 500 articles → 500 lectures facturées juste pour obtenir le chiffre "500"
```

### Ce qu'on a fait
Suppression du second appel. `totalDocuments` n'était utilisé par aucun composant appelant, donc il a été retiré du retour de la fonction.

> **Note :** Firebase propose `getCountFromServer()` pour compter sans télécharger les documents, mais cette fonction nécessite des permissions Firestore spécifiques. La solution la plus simple ici était de supprimer le comptage inutile.

### Gains
- **Lectures Firestore par chargement de page blog :** de 2 requêtes à 1
- Suppression des `console.log` de débogage (ne doivent jamais rester en production)

---

## 7. Refactoring des composants Question

### Problème
Le questionnaire utilisait **9 fichiers quasi-identiques** (`Question1.jsx` à `Question9.jsx`), chacun avec le même squelette mais des données différentes. Une modification du design ou du comportement nécessitait de modifier 9 fichiers.

### Analyse des types
Après lecture des 9 composants, 2 types ont été identifiés :

| Type | Questions | Mécanisme |
|---|---|---|
| `slider` | 1, 2, 3, 6 | Curseur numérique (distance, poids, taille, budget) |
| `choice` | 4, 5, 7, 8, 9 | Boutons image (simple ou multiple) |

### Ce qu'on a fait

**`src/data/questionsData.js`** — toutes les données centralisées dans un tableau d'objets :
```js
export const questions = [
  {
    id: 1,
    type: "slider",
    question: "Quelle distance parcourez-vous au quotidien ?",
    answerKey: "distance",
    min: 0, max: 150, defaultValue: 50, unit: "km",
    ...
  },
  {
    id: 4,
    type: "choice",
    question: "Type de trajets ?",
    answerKey: "type_trajet",
    multiple: true,
    options: [{ label: "Route", value: "route", image: img04 }, ...],
  },
  ...
]
```

**`src/components/Question.jsx`** — composant unique qui lit ses données et affiche le bon layout.

**`Questionnaire.jsx`** simplifié :
```jsx
// Avant : 9 conditions
{step === 1 && <Question1 ... />}
{step === 2 && <Question2 ... />}
...

// Après : 1 composant
<Question key={step} data={questions[step - 1]} ... />
```

> **Astuce `key={step}` :** En passant `key={step}`, React démonte et remonte le composant `Question` à chaque changement de step. Cela réinitialise automatiquement tous les états internes (valeur sélectionnée, erreur...) sans avoir à les gérer manuellement.

### Gains
- **Fichiers supprimés :** 9
- **Lignes de code :** 779 supprimées, 414 ajoutées
- **Correction :** typo "PrécédentB" dans la question 9
- **Maintenabilité :** modifier le design de toutes les questions = modifier 1 seul fichier
- **Extensibilité :** ajouter une question = ajouter un objet dans `questionsData.js`

---

## Bilan global

| Amélioration | Avant | Après |
|---|---|---|
| Credentials Firebase | Hardcodés dans le code | Variables d'environnement (.env) |
| Clé Admin SDK | Dans le code client | Supprimée |
| Appels Firebase au démarrage | 7+ | 1 |
| Vulnérabilités npm | 55 | 26 |
| Crash silencieux en production | Possible | Intercepté par ErrorBoundary |
| Lectures Firestore par page blog | 2 requêtes | 1 requête |
| Composants Question | 9 fichiers | 1 fichier + 1 fichier de données |
| Logique d'auth dupliquée | ~150 lignes × 7 composants | 0 |

---

## Structure du projet après refactoring

```
src/
  store/
    store.js              → store Zustand global
    slices/
      authSlice.js        → état auth (user, isAdmin, isLoading)
  components/
    ErrorBoundary.jsx     → intercepte les crashs React
    Question.jsx          → composant unique pour les 9 questions
    ProtectedRoute.jsx    → lit le store au lieu d'appeler Firebase
    NavBar.jsx            → lit le store au lieu d'appeler Firebase
    Management/           → tous migrés vers le store
  data/
    questionsData.js      → données des 9 questions du questionnaire
  utils/
    api.js                → requêtes Firestore optimisées
  firebase.js             → lit les credentials depuis .env
.env                      → credentials Firebase (ignoré par git)
.env.example              → template vide (commité)
.gitignore                → inclut .env et src/config/
```

---

## Prochaines améliorations possibles

- **Migration vers Vite** — remplacer Create React App pour éliminer les 26 vulnérabilités restantes et bénéficier d'un build beaucoup plus rapide
- **Slice Favoris** — migrer la logique des favoris vers le store Zustand
- **Tests** — aucun test n'existe actuellement (0% de couverture)
- **SEO** — ajouter React Helmet pour gérer les balises meta par page
- **Images** — ajouter du lazy loading et de la compression
