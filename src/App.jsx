import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Import react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Firebase Auth et Firestore
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Import du store Zustand
import useStore from "./store/store";

// Import des composants principaux
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Results from "./components/Results.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Route protégée

import ArticleDetails from "./components/ArticleDetails"; // Importe le composant

// Lazy loading pour les pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Profil = lazy(() => import("./pages/Profil.jsx"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage.jsx"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));
const Apropos = lazy(() => import("./pages/Apropos.jsx"));
const EconomyCalculator = lazy(() => import("./pages/EconomyCalculator.jsx"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales.jsx"));
const CGU = lazy(() => import("./pages/CGU.jsx"));
const Confidentialite = lazy(() => import("./pages/Confidentialite.jsx"));
const AddArticle = lazy(() => import("./components/Management/AddArticle.jsx"));
const AddTrottinette = lazy(() => import("./components/Management/AddTrottinette.jsx"));
const ManageTrottinettes = lazy(() => import("./components/Management/ManageTrottinettes.jsx"));
const ManageNewsletter = lazy(() => import("./components/Management/ManageNewsletter.jsx"));
const ManageArticles = lazy(() => import("./components/Management/ManageArticles.jsx"));
const ManageUsers = lazy(() => import("./components/Management/ManageUsers.jsx"));
const ManageMessages = lazy(() => import("./components/Management/ManageMessages.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));

function App() {
  // On récupère les actions du store pour mettre à jour l'état
  const { setUser, clearUser } = useStore();

  useEffect(() => {
    // onAuthStateChanged est un listener Firebase :
    // il se déclenche une fois au démarrage, puis à chaque connexion/déconnexion
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // L'utilisateur est connecté — on vérifie son rôle dans Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const isAdmin =
          userDoc.exists() && userDoc.data().role === "Administrateur";

        // On met à jour le store avec l'utilisateur et son rôle
        setUser(firebaseUser, isAdmin);
      } else {
        // Aucun utilisateur connecté — on vide le store
        clearUser();
      }
    });

    // Nettoyage : on arrête le listener quand le composant est démonté
    return () => unsubscribe();
  }, [setUser, clearUser]);

  return (
    <ErrorBoundary>
    <div className="min-h-screen flex flex-col">
      {/* Barre de navigation */}
      <NavBar />

      {/* Conteneur global pour les notifications */}
      <ToastContainer
        position="bottom-center" // Position des notifs
        autoClose={3000}         // Fermeture après 3 secondes
        hideProgressBar={false}  // Afficher barre de progression
        newestOnTop={true}       // Notifications + récentes en haut
        closeOnClick             // Fermer en cliquant
        rtl={false}              // Texte alignés gauche - droite
        pauseOnFocusLoss         // Pause la fermeture en cas de perte de focus
        draggable                // Déplacement des notifications
        pauseOnHover             // Pause la fermeture au survol
      />

      {/* Contenu principal avec Fallback */}
      <main className="flex-grow flex">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              Chargement en cours...
            </div>
          }
        >
          <Routes>
            {/* Routes principales */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/results" element={<Results />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/apropos" element={<Apropos />} />
            <Route path="/calculator" element={<EconomyCalculator />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/articles/:slug" element={<ArticleDetails />} />

            {/* Routes protégées */}
            <Route
              path="/add-article"
              element={
                <ProtectedRoute>
                  <AddArticle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-trottinette"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddTrottinette />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-trottinettes"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageTrottinettes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-newsletter"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageNewsletter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-articles"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageArticles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-messages"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageMessages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            {/* Route fallback */}
            <Route path="*" element={<div>Page non trouvée</div>} />
          </Routes>
        </Suspense>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
    </ErrorBoundary>
  );
}

export default App;
