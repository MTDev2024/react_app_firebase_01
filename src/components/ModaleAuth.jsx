import React, { useState } from "react";

// Import centralisé des services Firebase
import { auth, db } from "../firebase.js";

// Import des fonctions nécessaires pour l'authentification et Firestore
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function ModaleAuth({ show, onClose }) {
  const [isSignup, setIsSignup] = useState(false); // Basculer entre inscription/connexion
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Basculer vers "Mot de passe oublié"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Messages d'information (succès/erreur)

  const googleProvider = new GoogleAuthProvider();

  const handleSignup = async () => {
    try {
      if (!password) {
        setMessage("Veuillez définir un mot de passe pour vous inscrire.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ajouter l'utilisateur à Firestore avec un champ favorites vide
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        favoritesArticles: [],
        favoritesTrottinettes: [],
        createdAt: new Date(),
      });

      alert("Compte créé avec succès !");
      onClose(); // Fermer la modale
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie !");
      onClose(); // Fermer la modale
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
  
      // Référence à l'utilisateur dans Firestore
      const userRef = doc(db, "users", user.uid);
  
      // Vérifier si l'utilisateur existe déjà dans Firestore
      const userSnapshot = await userRef.get();
  
      if (!userSnapshot.exists()) {
        // Si l'utilisateur n'existe pas, créer un nouveau document
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          favoritesArticles: [],
          favoritesTrottinettes: [],
          createdAt: new Date(),
        });
      }
  
      alert("Connexion via Google réussie !");
      onClose(); // Fermer la modale
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };
  

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage("Veuillez entrer votre adresse email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email de réinitialisation envoyé. Vérifiez votre boîte mail !");
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-96 transform transition-transform duration-500">
        <h2 className="text-2xl font-bold mb-4">
          {isPasswordReset
            ? "Réinitialisation du mot de passe"
            : isSignup
            ? "Inscription"
            : "Connexion"}
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {isPasswordReset ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border"
            />
            <button
              onClick={handlePasswordReset}
              className="w-full bg-blue-600 text-white py-2 mb-4"
            >
              Envoyer un email de réinitialisation
            </button>
            <p className="text-center">
              <span
                onClick={() => setIsPasswordReset(false)}
                className="text-blue-600 font-bold cursor-pointer"
              >
                Retour à la connexion
              </span>
            </p>
          </>
        ) : (
          <>
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
            {!isSignup && (
              <p className="text-center">
                <span
                  onClick={() => setIsPasswordReset(true)}
                  className="text-blue-600 font-bold cursor-pointer"
                >
                  J'ai oublié mon mot de passe
                </span>
              </p>
            )}
            <p className="text-center">
              {isSignup ? "Déjà inscrit ?" : "Pas encore inscrit ?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 font-bold cursor-pointer"
              >
                {isSignup ? "Se connecter" : "Créer un compte"}
              </span>
            </p>
          </>
        )}

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
