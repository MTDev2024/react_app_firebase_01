import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import des composants
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Results from './components/Results';

// Import des pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Profil from "./pages/Profil";
import ComparisonPage from "./pages/ComparisonPage";
import Favorites from "./pages/Favorites";

// Import de Firebase
import { auth } from "./firebase"; // Chemin vers firebase.js
import { onAuthStateChanged } from "firebase/auth"; // Gestion de l'état d'authentification

function App() {
  useEffect(() => {
    // Écouter les changements d'état de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user.email);
      } else {
        console.log("Aucun utilisateur connecté.");
      }
    });

    // Nettoyer l'écouteur lors du démontage
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barre de navigation */}
      <NavBar />

      {/* Contenu principal */}
      <main className="flex-grow flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/results" element={<Results />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/favorites" element={<Favorites />} /> {/* Nouvelle route */}
        </Routes>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default App;
