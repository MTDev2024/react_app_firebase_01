import React, { useState } from "react";
import { auth, db } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function ModaleAuth({ show, onClose }) {
  const [isSignup, setIsSignup] = useState(false); // Basculer entre inscription et connexion
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Basculer vers réinitialisation du mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message d'information (succès/erreur)
  const [messageType, setMessageType] = useState(""); // Type de message (success/error)

  const googleProvider = new GoogleAuthProvider();

  // Fonction pour afficher un message stylisé
  const displayMessage = (text, type) => {
    setMessage(text);
    setMessageType(type); // "success" ou "error"
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000); // Effacer le message après 5 secondes
  };

  // Gestion de l'inscription
  const handleSignup = async () => {
    try {
      if (!email || !password) {
        displayMessage("Veuillez remplir tous les champs.", "error");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ajouter l'utilisateur à Firestore avec les champs nécessaires
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        favoritesArticles: [],
        favoritesTrottinettes: [],
        createdAt: new Date(),
      });

      displayMessage("Compte créé avec succès !", "success");
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      displayMessage(`Erreur : ${error.message}`, "error");
    }
  };

  // Gestion de la connexion
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        displayMessage("Veuillez remplir tous les champs.", "error");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      displayMessage("Connexion réussie !", "success");
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      displayMessage(`Erreur : ${error.message}`, "error");
    }
  };

  // Gestion de la connexion via Google
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      // Initialiser l'utilisateur dans Firestore si non existant
      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          favoritesArticles: [],
          favoritesTrottinettes: [],
          createdAt: new Date(),
        });
      }

      displayMessage("Connexion via Google réussie !", "success");
      onClose();
    } catch (error) {
      displayMessage(`Erreur : ${error.message}`, "error");
    }
  };

  // Gestion de la réinitialisation de mot de passe
  const handlePasswordReset = async () => {
    if (!email) {
      displayMessage("Veuillez entrer votre adresse email.", "error");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      displayMessage("Email de réinitialisation envoyé. Vérifiez votre boîte mail !", "success");
    } catch (error) {
      displayMessage(`Erreur : ${error.message}`, "error");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg transform transition-transform duration-500">
        <h2 className="text-2xl font-bold mb-4">
          {isPasswordReset
            ? "Réinitialisation du mot de passe"
            : isSignup
            ? "Inscription"
            : "Connexion"}
        </h2>

        {/* Message stylisé */}
        {message && (
          <p
            className={`text-center p-2 mb-4 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {isPasswordReset ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={handlePasswordReset}
              className="w-full bg-blue-600 text-white py-2 mb-4 rounded hover:bg-blue-700"
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
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-blue-600 text-white py-2 mb-4 rounded hover:bg-blue-700"
            >
              {isSignup ? "S'inscrire" : "Se connecter"}
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white py-2 mb-4 rounded hover:bg-red-700 flex justify-center items-center"
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
