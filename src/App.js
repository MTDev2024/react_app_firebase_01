import React from "react";
import { Routes, Route } from "react-router-dom"; 
import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer"; 


import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Contenu principal */}
      <main className="flex-grow">
        <Routes>
          {/* Définition des routes */}
          <Route path="/" element={<Home />} />
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
