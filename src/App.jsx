import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import des composants
import NavBar from "./components/NavBar.jsx"; // Barre de navigation
import Footer from "./components/Footer.jsx"; // Pied de page
import Results from "./components/Results.jsx"; // Composant pour les résultats

// Import des pages
import Home from "./pages/Home.jsx"; // Page d'accueil
import Blog from "./pages/Blog.jsx"; // Page du blog
import Contact from "./pages/Contact.jsx"; // Page de contact
import Profil from "./pages/Profil.jsx"; // Page du profil utilisateur
import ComparisonPage from "./pages/ComparisonPage.jsx"; // Page de comparaison
import Favorites from "./pages/Favorites.jsx"; // Page des favoris

// Import des fonctionnalités Firebase
import { auth } from "./firebase"; // Import de Firebase Auth
import { onAuthStateChanged } from "firebase/auth"; // Écouteur d'état d'authentification

function App() {
  useEffect(() => {
    // Écouter les changements d'état de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user.email); // Afficher l'utilisateur connecté dans la console
      } else {
        console.log("Aucun utilisateur connecté."); // Afficher un message si aucun utilisateur n'est connecté
      }
    });

    // Nettoyer l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barre de navigation */}
      <NavBar />

      {/* Contenu principal */}
      <main className="flex-grow flex">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
          <Route path="/blog" element={<Blog />} /> {/* Route pour la page du blog */}
          <Route path="/contact" element={<Contact />} /> {/* Route pour la page de contact */}
          <Route path="/profil" element={<Profil />} /> {/* Route protégée pour la page du profil */}
          <Route path="/results" element={<Results />} /> {/* Route pour les résultats */}
          <Route path="/compare" element={<ComparisonPage />} /> {/* Route pour la page de comparaison */}
          <Route path="/favorites" element={<Favorites />} /> {/* Route protégée pour les favoris */}
        </Routes>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default App;
