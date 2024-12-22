import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewsletterSignup from "../components/NewsletterSignup.jsx";
import ArticleCard from "../components/ArticleCard.jsx"; // Import du composant ArticleCard
import Questionnaire from "../components/Questionnaire.jsx"; // Import du composant Questionnaire

export default function Blog() {
  // État pour gérer le contenu de la barre de recherche
  const [searchQuery, setSearchQuery] = useState("");

  // État pour gérer l'affichage du questionnaire
  // `false` par défaut, car le questionnaire n'est pas affiché initialement
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  // Fonction pour filtrer les articles
  // Utilise la barre de recherche pour comparer le titre de chaque article avec la recherche utilisateur
  const filteredArticles = articleData.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction appelée lorsqu'on clique sur le bouton "Lancer le questionnaire"
  // Change l'état `showQuestionnaire` à `true`, ce qui masque les articles et affiche le questionnaire
  const handleStart = () => {
    setShowQuestionnaire(true);
  };

  return (
    <>
      {/* Si le questionnaire est actif, on affiche uniquement ce composant */}
      {showQuestionnaire ? (
        <Questionnaire />
      ) : (
        <main className="flex-grow mt-4">
          {/* Hero Section */}
          <section
            className="flex flex-col justify-center lg:flex-row max-w-7xl mx-auto py-12 px-4 lg:space-x-16 space-y-8 lg:space-y-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/assets/backgrounds/Slide-ZT3-Pro-Launch-banner-FINAL-2.jpg')",
            }}
          >
            <div className="w-full bg-black/20 text-white space-y-4 lg:w-1/2 text-center lg:text-left p-8 mx-auto">
              <h1 className="text-4xl font-bold mb-4">
                Nos conseils de professionnels
              </h1>
              <h2 className="text-2xl font-semibold mb-2">
                Retrouvez ici tous nos guides
              </h2>
              <p className="text-base md:text-xl leading-relaxed text-justify mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolore fugit sit ipsa dicta quam...
              </p>
              {/* Bouton de lancement du questionnaire dans la section Hero */}
              <button
                onClick={handleStart}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Lancer le questionnaire
              </button>
            </div>
          </section>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto p-8 mb-8">
            <input
              type="text"
              id="search-bar"
              placeholder="Rechercher un article..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Articles Section */}
          <section id="articles" className="py-6">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Si des articles correspondent à la recherche, on les affiche */}
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                  ))
                ) : (
                  // Sinon, on affiche un message indiquant qu'il n'y a pas d'articles
                  <p className="col-span-full text-center text-gray-600">
                    Aucun article ne correspond à votre recherche.
                  </p>
                )}
              </div>
              {/* Bouton de lancement du questionnaire dans la section Articles */}
              <div className="text-center mt-8">
                <button
                  onClick={handleStart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Lancer le questionnaire
                </button>
              </div>
            </div>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-4 mt-12">
              <nav className="flex justify-center space-x-2">
                <Link
                  to="/page-1"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  1
                </Link>
                <Link
                  to="/page-2"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  2
                </Link>
                <Link
                  to="/page-3"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  3
                </Link>
              </nav>
            </div>
          </section>

          {/* Newsletter Signup Section */}
          <section className="mt-16">
            <NewsletterSignup />
            {/* Bouton de lancement du questionnaire dans la section Newsletter */}
            <div className="text-center mt-8">
              <button
                onClick={handleStart}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Lancer le questionnaire
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

// Exemple des données des articles
const articleData = [
  {
    title: "Choisir une trottinette en fonction de son usage",
    description: "Guide détaillé pour aider les consommateurs à choisir.",
    image: "/assets/images/Trottinette_Electrique_Wolf_Warrior_King_GTR_Kaabo_or_et_noir.webp",
    link: "/article01",
  },
  // Ajoutez d'autres articles ici
];
