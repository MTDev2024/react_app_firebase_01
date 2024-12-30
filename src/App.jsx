import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // Retiré BrowserRouter ici

// Import Firebase Auth
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Import des composants principaux
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Results from "./components/Results.jsx";

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

      {/* Contenu principal */}
      <main className="flex-grow flex">
        <Suspense fallback={<div>Chargement...</div>}>
          <Routes>
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



            <Route path="/confidentialite" element={<Confidentialite  />} /> 


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
