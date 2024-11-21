import React, { useEffect } from "react"; // Ajout de useEffect si nécessaire
import { Routes, Route } from "react-router-dom"; 
import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer";

// Import des pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// Import de Firebase
import { auth } from "./firebase"; // Chemin vers le fichier firebase.js
import { onAuthStateChanged } from "firebase/auth"; // Gestion de l'état d'authentification

function App() {
  useEffect(() => {
    // Écoute les changements de connexion utilisateur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user);
      } else {
        console.log("Aucun utilisateur connecté.");
      }
    });

    // Nettoie l'écouteur lors du démontage
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Contenu principal */}
      <main className="flex-grow">
        <Routes>
          {/* Définition des routes */}
          <Route path="/Home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
