const trottinettes = [
  {
    itemID: "DVLP60V28Ah-001", // Dualtron Victor Luxury Plus, 60V, 28Ah, modèle 001
    marque: "Dualtron",
    modele: "Victor Luxury Plus 60V 28Ah (2024)",
    distance_max: 85,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "ajustable",
    puissance_moteur: 4300,
    poids_trottinette: 37,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.image/612/image_1024/TROTTINETTE%20ELECTRIQUE%20DUALTRON%20VICTOR%2060V%2035AH%20LUXURY%20PLUS%202024?unique=8a8be0f",
  },
  {
    itemID: "TFME52V15.6Ah-002", // Teverun Fighter Mini Eco, 52V, 15.6Ah, modèle 002
    marque: "Teverun",
    modele: "Fighter Mini Eco 52V 15.6Ah",
    distance_max: 45,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "fixe",
    puissance_moteur: 600,
    poids_trottinette: 22,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/4723/image_1024/%5BTEVERUNMINI%5D%20TROTTINETTE%20ELECTRIQUE%20TEVERUN%20FIGHTER%20MINI%2052V%2020%2C8AH?unique=bf20555",
  },
  {
    itemID: "DTAS52V13Ah-003", // Dualtron Aminia Special, 52V, 13Ah, modèle 003
    marque: "Dualtron",
    modele: "Aminia Special 52V 13Ah",
    distance_max: 40,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 100,
    taille_guidon: "fixe",
    puissance_moteur: 1000,
    poids_trottinette: 24,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7",
  },
  {
    itemID: "DTAD52V21Ah-004", // Dualtron Aminia Double, 52V, 21Ah, modèle 004
    marque: "Dualtron",
    modele: "Aminia Double Moteur 52V 21Ah",
    distance_max: 65,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "ajustable",
    puissance_moteur: 1450,
    poids_trottinette: 26,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7",
  },
  {
    itemID: "DTAS52V17.5Ah-005", // Dualtron Aminia Special, 52V, 17.5Ah, modèle 005
    marque: "Dualtron",
    modele: "Aminia Special 52V 17.5Ah",
    distance_max: 50,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "fixe",
    puissance_moteur: 1200,
    poids_trottinette: 24,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7",
  },
  {
    itemID: "DTAD52V15.6Ah-006", // Dualtron Aminia Double, 52V, 15.6Ah, modèle 006
    marque: "Dualtron",
    modele: "Aminia Double Moteur 52V 15.6Ah",
    distance_max: 55,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "ajustable",
    puissance_moteur: 2000,
    poids_trottinette: 27,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7",
  },
  {
    itemID: "DV60V30Ah-007", // Dualtron Victor, 60V, 30Ah, modèle 007
    marque: "Dualtron",
    modele: "Victor Luxury 60V 30Ah (2024)",
    distance_max: 100,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "fixe",
    puissance_moteur: 4000,
    poids_trottinette: 35,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.image/612/image_1024/TROTTINETTE%20ELECTRIQUE%20DUALTRON%20VICTOR%2060V%2035AH%20LUXURY%20PLUS%202024?unique=8a8be0f",
  },
  {
    itemID: "DVLP60V35Ah-008", // Dualtron Victor Luxury Plus, 60V, 35Ah, modèle 008
    marque: "Dualtron",
    modele: "Victor Luxury Plus 60V 35Ah (2024)",
    distance_max: 120,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "fixe",
    puissance_moteur: 4300,
    poids_trottinette: 37,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.image/612/image_1024/TROTTINETTE%20ELECTRIQUE%20DUALTRON%20VICTOR%2060V%2035AH%20LUXURY%20PLUS%202024?unique=8a8be0f",
  },
  {
    itemID: "DTP48V15Ah-009", // Dualtron Togo Plus, 48V, 15Ah, modèle 009
    marque: "Dualtron",
    modele: "Togo Plus 48V 15Ah",
    distance_max: 45,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "fixe",
    puissance_moteur: 500,
    poids_trottinette: 19,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f",
  },
  {
    itemID: "DTP48V12Ah-010", // Dualtron Togo Plus, 48V, 12Ah, modèle 010
    marque: "Dualtron",
    modele: "Togo Plus 48V 12Ah",
    distance_max: 40,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "fixe",
    puissance_moteur: 500,
    poids_trottinette: 18,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f",
  },
  {
    itemID: "DT36V12Ah-011", // Dualtron Togo, 36V, 12Ah, modèle 011
    marque: "Dualtron",
    modele: "Togo 36V 12Ah",
    distance_max: 35,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 100,
    taille_guidon: "fixe",
    puissance_moteur: 450,
    poids_trottinette: 17,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f",
  },
  {
    itemID: "DTC60V25Ah-012", // Dualtron City, 60V, 25Ah, modèle 012
    marque: "Dualtron",
    modele: "City 60V 25Ah",
    distance_max: 80,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "ajustable",
    puissance_moteur: 6000,
    poids_trottinette: 45,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/3938/image_1024/%5BMMDUALTRONCITY20%5D%20TROTTINETTE%20%C3%89LECTRIQUE%20DUALTRON%20CITY%2060V20AH?unique=1e81a6f",
  },
  {
    itemID: "DTC60V20Ah-013", // Dualtron City, 60V, 20Ah, modèle 013
    marque: "Dualtron",
    modele: "City 60V 20Ah",
    distance_max: 70,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 120,
    taille_guidon: "ajustable",
    puissance_moteur: 5500,
    poids_trottinette: 44,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/3938/image_1024/%5BMMDUALTRONCITY20%5D%20TROTTINETTE%20%C3%89LECTRIQUE%20DUALTRON%20CITY%2060V20AH?unique=1e81a6f",
  },
  {
    itemID: "DTT72V40Ah-014", // Dualtron Thunder, 72V, 40Ah, modèle 014
    marque: "Dualtron",
    modele: "Thunder 2 72V 40Ah (2024)",
    distance_max: 150,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 150,
    taille_guidon: "ajustable",
    puissance_moteur: 10000,
    poids_trottinette: 47,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/9174/image_1024/%5BMMDUALTRONTHUNDER22024%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20THUNDER%202%20%7C%2072V%2040Ah%202024?unique=dda07fa",
  },
  {
    itemID: "DTE60V18Ah-015", // Dualtron Eagle, 60V, 18Ah, modèle 015
    marque: "Dualtron",
    modele: "Eagle 60V 18Ah",
    distance_max: 60,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 100,
    taille_guidon: "fixe",
    puissance_moteur: 2200,
    poids_trottinette: 28,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/3942/image_1024/%5BMMDUALTRONEAGLE60V18%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20EAGLE%2060V%2018Ah?unique=4f70f7a",
  },
  {
    itemID: "DTD36V15Ah-016", // Dualtron Dolphin, 36V, 15Ah, modèle 016
    marque: "Dualtron",
    modele: "Dolphin 36V 15Ah",
    distance_max: 50,
    type_trajet: ["route", "tout-terrain"],
    relief: ["plat", "modere"],
    poids_max: 100,
    taille_guidon: "fixe",
    puissance_moteur: 500,
    poids_trottinette: 23,
    prix: 2500,
    image:
      "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f",
  },
];

export default trottinettes;
