import React from "react";

export default function NavBar() {
  return (
    <header className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="index.html" className="text-2xl font-bold text-blue-800">
          Trotticompv3
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex space-x-8">
          <a href="index.html" className="text-gray-700 hover:text-blue-800">
            Accueil
          </a>
          <a href="blog.html" className="text-gray-700 hover:text-blue-800">
            Blog
          </a>
          <a href="#about" className="text-gray-700 hover:text-blue-800">
            À propos
          </a>
          <a href="contact.html" className="text-gray-700 hover:text-blue-800">
            Contact
          </a>
        </nav>

        {/* Auth button */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="font-mono bg-blue-800 text-white py-2 px-4 hover:bg-gray-700 hover:font-bold transition duration-300">
            Inscription / Connexion
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12H4m0 6h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
