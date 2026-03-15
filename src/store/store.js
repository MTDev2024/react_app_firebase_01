import { create } from "zustand";
import authSlice from "./slices/authSlice.js";

/**
 * Store global de l'application.
 *
 * C'est ici qu'on assemble tous les slices. Chaque slice apporte
 * sa propre portion d'état et ses actions via le spread operator (...).
 *
 * Pour ajouter un nouveau domaine (ex: favoris) :
 *   1. Créer src/store/slices/favoritesSlice.js
 *   2. L'importer ici et l'ajouter avec ...favoritesSlice(...args)
 *
 * Utilisation dans un composant :
 *   import useStore from "../store"
 *   const { user, isAdmin } = useStore()
 */
const useStore = create((...args) => ({
  ...authSlice(...args),

  // Futurs slices à ajouter ici :
  // ...favoritesSlice(...args),
  // ...profileSlice(...args),
}));

export default useStore;
