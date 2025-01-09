import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Import react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Firebase Auth
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Import des composants principaux
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Results from "./components/Results.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Route protégée

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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user.email);
      } else {
        console.log("Aucun utilisateur connecté.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barre de navigation */}
      <NavBar />

      {/* Conteneur global pour les notifications */}
      <ToastContainer
        position="bottom-center" // Position des notifications
        autoClose={3000}         // Fermeture automatique après 3 secondes
        hideProgressBar={false}  // Afficher la barre de progression
        newestOnTop={true}       // Les notifications récentes en haut
        closeOnClick             // Fermeture au clic
        rtl={false}              // Textes alignés de gauche à droite
        pauseOnFocusLoss         // Pause la fermeture en cas de perte de focus
        draggable                // Déplacement possible des notifications
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
  );
}

export default App;
