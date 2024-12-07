import React from "react";
import ReactDOM from "react-dom/client"; // Import de react-dom/client pour React 18
import { BrowserRouter } from "react-router-dom"; // Import de BrowserRouter
import "./index.css"; // Styles globaux
import App from './App.jsx'; // Composant principal

// Sélectionnez l'élément racine
const rootElement = document.getElementById("root");

// Créez un root React
const root = ReactDOM.createRoot(rootElement);

// Rendre l'application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
