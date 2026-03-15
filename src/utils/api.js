import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * Récupère les articles depuis Firestore avec pagination et filtrage par tags.
 *
 * @param {number} _page - Numéro de page (non utilisé — la pagination se fait via lastVisible)
 * @param {number} pageSize - Nombre d'articles par page
 * @param {Array} tags - Tags pour filtrer les articles (vide = pas de filtre)
 * @param {Object} lastVisible - Dernier document de la page précédente (curseur de pagination)
 * @returns {Object} { articles, totalDocuments, lastVisible }
 */
export const fetchArticles = async (_page, pageSize, tags = [], lastVisible = null) => {
  const articlesRef = collection(db, "articles");

  // Filtre par tags uniquement si des tags sont sélectionnés
  const tagFilter =
    tags.length > 0
      ? where("tags", "array-contains-any", tags)
      : null;

  try {
    // Construction de la requête avec filtre, tri et pagination
    const q = query(
      articlesRef,
      ...(tagFilter ? [tagFilter] : []),
      orderBy("date", "desc"),
      limit(pageSize),
      ...(lastVisible ? [startAfter(lastVisible)] : [])
    );

    // Récupération des articles de la page courante
    const snapshot = await getDocs(q);

    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return { articles, lastVisible: lastVisibleDoc };
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    return { articles: [], lastVisible: null };
  }
};
