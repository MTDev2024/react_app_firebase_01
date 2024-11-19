import React from 'react';
import NavBar from './components/NavBar'; // Chemin vers votre composant
import Footer from './components/Footer';


function App() {
  return (
<div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {/* Contenu principal */}
        <h1 className="text-center mt-10 text-blue-800 text-3xl font-bold">
          Trotticomp
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
