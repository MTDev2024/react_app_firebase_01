import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api"; // Fonction pour récupérer les articles depuis Firestore
import ArticleCard from "../components/ArticleCard"; // Composant pour afficher une "card" d'article
import { useSearchParams } from "react-router-dom"; // Utilisé pour gérer les paramètres d'URL

const Blog = () => {
  // État pour stocker les articles récupérés
  const [articles, setArticles] = useState([]);
  // État pour afficher un indicateur de chargement
  const [loading, setLoading] = useState(false);
  // État pour le nombre total de pages
  const [totalPages, setTotalPages] = useState(0);
  // État pour gérer la page actuelle
  const [currentPage, setCurrentPage] = useState(1);
  // État pour les tags sélectionnés
  const [selectedTags, setSelectedTags] = useState([]);
  // Liste des tags disponibles
  const [availableTags] = useState(["entretien", "comparatif", "avantages"]);
  // Gestion des paramètres d'URL pour la pagination et les tags
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Fonction pour charger les articles d'une page spécifique avec des tags sélectionnés
   */
  const loadArticles = async (page, tags) => {
    setLoading(true); // Activer l'indicateur de chargement
    const pageSize = 9; // Nombre d'articles par page
    try {
      console.log("Chargement des articles pour la page :", page, "avec les tags :", tags);
      const { articles: newArticles, totalDocuments } = await fetchArticles(page, pageSize, tags);
      setArticles(newArticles || []); // Assurez-vous que `articles` est toujours un tableau
      setTotalPages(Math.ceil((totalDocuments || 0) / pageSize)); // Assurez-vous que `totalDocuments` est défini
      console.log("Articles chargés :", newArticles);
    } catch (error) {
      console.error("Erreur lors du chargement des articles :", error);
      setArticles([]); // Réinitialiser à un tableau vide en cas d'erreur
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  /**
   * Charger les articles à chaque changement de page ou de tags
   */
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1; // Récupérer la page depuis l'URL (ou 1 par défaut)
    const tags = searchParams.get("tags") ? searchParams.get("tags").split(",") : [];
    setCurrentPage(page);
    setSelectedTags(tags);
    loadArticles(page, tags);
  }, [searchParams]);

  /**
   * Gérer les changements de page
   */
  const goToPage = (page) => {
    setSearchParams({ page, tags: selectedTags.join(",") }); // Met à jour l'URL avec la nouvelle page
  };

  /**
   * Gérer les changements de tags
   */
  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag) // Retirer le tag s'il est déjà sélectionné
      : [...selectedTags, tag]; // Ajouter le tag s'il n'est pas sélectionné
    setSearchParams({ page: 1, tags: newTags.join(",") }); // Réinitialiser à la page 1 avec les nouveaux tags
  };

  return (
    <main className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section
        className="flex flex-col justify-center lg:flex-row max-w-7xl mx-auto py-12 px-4 lg:space-x-16 space-y-8 lg:space-y-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/blog-hero-banner.jpg')", // Changez l'image selon vos besoins
        }}
      >
        <div className="w-full bg-black/20 text-white space-y-4 lg:w-1/2 text-center lg:text-left p-8 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre Blog</h1>
          <h2 className="text-2xl font-semibold mb-2">Des conseils pour mieux choisir</h2>
          <p className="text-base md:text-xl leading-relaxed text-justify mb-4">
            Découvrez nos derniers articles, guides et astuces pour tout savoir sur les trottinettes électriques et les solutions de mobilité. Que vous soyez novice ou expert, notre blog a été conçu pour répondre à toutes vos questions.
          </p>
        </div>
      </section>

      {/* Filtre par tags */}
      <div className="flex justify-center space-x-4 my-4">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded ${
              selectedTags.includes(tag) ? "bg-blue-800 text-white" : "bg-gray-200 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grille d'articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {articles.length > 0 ? (
          articles.map((article) => <ArticleCard key={article.id} article={article} />)
        ) : (
          <p className="text-center col-span-full text-gray-600">
            Aucun article n'est disponible pour le moment.
          </p>
        )}
      </div>

      {/* Message de chargement */}
      {loading && <p className="text-center">Chargement...</p>}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className={`px-4 py-2 rounded ${
            currentPage <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Précédent
        </button>
        {totalPages > 0 &&
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-blue-800 text-white" : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Suivant
        </button>
      </div>
    </main>
  );
};

export default Blog;
