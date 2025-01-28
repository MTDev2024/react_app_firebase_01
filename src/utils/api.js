import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.js"; // Import explicite de la base de données Firestore

/**
 * Fonction pour récupérer les articles depuis Firestore
 * @param {number} page - Numéro de la page actuelle
 * @param {number} pageSize - Nombre d'articles par page
 * @param {Array} tags - Tags sélectionnés pour filtrer les articles
 * @param {Object} lastVisible - Dernier document visible (pour la pagination)
 * @returns {Object} - Contient les articles récupérés et le nombre total de documents
 */
export const fetchArticles = async (page, pageSize, tags = [], lastVisible = null) => {
  console.log("Démarrage de la fonction fetchArticles");
  console.log("Paramètres reçus :", { page, pageSize, tags });

  const articlesRef = collection(db, "articles"); // Référence à la collection "articles"

  // Ajouter un filtre pour les tags si nécessaire
  const tagFilter =
    tags.length > 0
      ? where("tags", "array-contains-any", tags) // Vérifier si les articles contiennent au moins un des tags
      : null;

  try {
    // Construire la requête Firestore
    const q = query(
      articlesRef,
      ...(tagFilter ? [tagFilter] : []), // Appliquer le filtre des tags
      orderBy("date", "desc"), // Trier par date décroissante
      limit(pageSize), // Limiter les résultats à pageSize
      ...(lastVisible ? [startAfter(lastVisible)] : []) // Pagination avec le dernier document visible
    );

    console.log("Requête Firestore construite :", q);

    // Récupérer les articles correspondant à la requête
    const snapshot = await getDocs(q);
    console.log("Documents récupérés :", snapshot.docs.length);

    // Calculer le nombre total d'articles (non paginé)
    const totalDocuments = (await getDocs(articlesRef)).size;
    console.log("Nombre total de documents :", totalDocuments);

    // Transformer les documents Firestore en objets JavaScript
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id, // Inclure l'ID du document
      ...doc.data(), // Inclure les données du document
    }));

    console.log("Articles transformés :", articles);

    // Obtenir le dernier document visible pour la pagination
    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    // Retourner les résultats
    return { articles, totalDocuments, lastVisible: lastVisibleDoc };
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    return { articles: [], totalDocuments: 0, lastVisible: null }; // Retourner des valeurs par défaut en cas d'erreur
  }
};
