import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function ModaleAuth({ show, onClose }) {
  const [isSignup, setIsSignup] = useState(false); // Basculer entre inscription/connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Compte créé avec succès !");
      onClose(); // Fermer la modale
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie !");
      onClose(); // Fermer la modale
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Connexion via Google réussie !");
      onClose(); // Fermer la modale
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    }
  };

  if (!show) return null; // Si `show` est false, on n'affiche pas la modale

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-96 transform transition-transform duration-500">
        <h2 className="text-2xl font-bold mb-4">
          {isSignup ? "Inscription" : "Connexion"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button
          onClick={isSignup ? handleSignup : handleLogin}
          className="w-full bg-blue-600 text-white py-2 mb-4"
        >
          {isSignup ? "S'inscrire" : "Se connecter"}
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 mb-4 flex justify-center items-center"
        >
          <ion-icon name="logo-google" className="p-2"></ion-icon>
          {isSignup ? "S'inscrire avec Google" : "Se connecter avec Google"}
        </button>
        <p className="text-center">
          {isSignup ? "Déjà inscrit ?" : "Pas encore inscrit ?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 font-bold cursor-pointer"
          >
            {isSignup ? "Se connecter" : "Créer un compte"}
          </span>
        </p>
        <button
          onClick={onClose}
          className="mt-4 text-center text-red-600 font-bold cursor-pointer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
