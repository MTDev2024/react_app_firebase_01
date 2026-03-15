/**
 * Auth Slice — état et actions liés à l'authentification.
 *
 * Un slice est une fonction qui reçoit `set` (et optionnellement `get`)
 * et retourne une portion de l'état global avec ses actions associées.
 *
 * Il sera assemblé avec d'autres slices dans src/store/index.js.
 */
const authSlice = (set) => ({
  // -------------------------
  // ÉTAT
  // -------------------------

  // L'objet utilisateur Firebase (contient uid, email, displayName, etc.)
  // null = personne n'est connecté
  user: null,

  // true si l'utilisateur a le rôle "Administrateur" dans Firestore
  isAdmin: false,

  // true tant que Firebase n'a pas encore répondu au démarrage
  // Empêche une redirection prématurée dans ProtectedRoute
  isLoading: true,

  // -------------------------
  // ACTIONS
  // -------------------------

  // Appelée par App.jsx quand Firebase détecte une connexion
  setUser: (user, isAdmin) =>
    set({
      user,
      isAdmin,
      isLoading: false,
    }),

  // Appelée par App.jsx quand Firebase détecte une déconnexion
  clearUser: () =>
    set({
      user: null,
      isAdmin: false,
      isLoading: false,
    }),
});

export default authSlice;
