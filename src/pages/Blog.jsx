import React, { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import EconomyCard from "../components/EconomyCard";
import { useSearchParams } from "react-router-dom";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTags = searchParams.get("tags")
    ? searchParams.get("tags").split(",")
    : [];

  const [availableTags] = useState([
    "entretien",
    "comparatif",
    "avantages",
    "mobilité douce",
    "trottinette électrique",
    "environnement",
    "économies",
  ]);

  const loadArticles = async (page, tags) => {
    setLoading(true);
    const pageSize = 9;
    try {
      const { articles: newArticles } = await fetchArticles(
        page,
        pageSize,
        tags,
      );
      setArticles(newArticles || []);
    } catch (error) {
      console.error("Erreur lors du chargement des articles :", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const tags = searchParams.get("tags")
      ? searchParams.get("tags").split(",")
      : [];
    loadArticles(page, tags);
  }, [searchParams]);

  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSearchParams({ tags: newTags.join(",") });
  };

  return (
    <main className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section
        className="flex flex-col justify-center lg:flex-row max-w-7xl mx-auto py-12 px-4 lg:space-x-16 space-y-8 lg:space-y-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/backgrounds/couple-with-electric-scooters-outdoors.jpg')", // Chemin mis à jour
        }}
      >
        <div className="w-full bg-black/20 text-white space-y-4 lg:w-1/2 text-center lg:text-left p-8 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre Blog</h1>
          <h2 className="text-2xl font-semibold mb-2">
            Des conseils pour mieux choisir
          </h2>
          <p className="text-base md:text-xl leading-relaxed text-justify mb-4">
            Découvrez nos derniers articles, guides et astuces pour tout savoir
            sur les trottinettes électriques et les solutions de mobilité. Que
            vous soyez novice ou expert, notre blog a été conçu pour répondre à
            toutes vos questions.
          </p>
        </div>
      </section>

      {/* Card du calculateur */}
      <EconomyCard />

      {/* Filtre par tags */}
      <div className="flex justify-center space-x-4 my-4">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded ${
              selectedTags.includes(tag)
                ? "bg-blue-800 text-white"
                : "bg-gray-200 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grille d'articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            Aucun article n'est disponible pour le moment.
          </p>
        )}
      </div>

      {loading && <p className="text-center">Chargement...</p>}
    </main>
  );
};

export default Blog;
