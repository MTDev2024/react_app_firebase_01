export const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .normalize("NFD") // Supprime les accents
      .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
      .replace(/\s+/g, "-") // Remplace les espaces par des tirets
      .replace(/[^\w-]+/g, "") // Supprime les caractères non alphanumériques
      .replace(/--+/g, "-") // Remplace plusieurs tirets consécutifs par un seul
      .replace(/^-+/, "") // Supprime les tirets en début de texte
      .replace(/-+$/, ""); // Supprime les tirets en fin de texte
  };
  