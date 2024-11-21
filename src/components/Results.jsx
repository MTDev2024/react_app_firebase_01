import React from "react";

const trottinettes = [
  {
    "modele": "Victor Luxury Plus 60V 28Ah (2024)",
    "distance_max": 85,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"], 
    "poids_max": 120,
    "taille_guidon": "ajustable",
    "puissance_moteur": 4300,
    "poids_trottinette": 37,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.image/612/image_1024/TROTTINETTE%20ELECTRIQUE%20DUALTRON%20VICTOR%2060V%2035AH%20LUXURY%20PLUS%202024?unique=8a8be0f"
},
{
    "modele": "Teverun Fighter Mini Eco 52V 15.6Ah",
    "distance_max": 45,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "fixe",
    "puissance_moteur": 600,
    "poids_trottinette": 22,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/4723/image_1024/%5BTEVERUNMINI%5D%20TROTTINETTE%20ELECTRIQUE%20TEVERUN%20FIGHTER%20MINI%2052V%2020%2C8AH?unique=bf20555"
},
{
    "modele": "Dualtron Aminia Special 52V 13Ah",
    "distance_max": 40,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 100,
    "taille_guidon": "fixe",
    "puissance_moteur": 1000,
    "poids_trottinette": 24,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7"

},
{
    "modele": "Dualtron Aminia Double Moteur 52V 21Ah",
    "distance_max": 65,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "ajustable",
    "puissance_moteur": 1450,
    "poids_trottinette": 26,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7"
},
{
    "modele": "Dualtron Aminia Special 52V 17.5Ah",
    "distance_max": 50,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "fixe",
    "puissance_moteur": 1200,
    "poids_trottinette": 24,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7"
},
{
    "modele": "Dualtron Aminia Double Moteur 52V 15.6Ah",
    "distance_max": 55,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "ajustable",
    "puissance_moteur": 2000,
    "poids_trottinette": 27,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/10348/image_1024/%5BMMDUALTRONAMINIA5221%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20AMINIA%20DOUBLE%20MOTEUR%2052V%2021Ah%20IPX5?unique=d8446c7"
},
{
    "modele": "Dualtron Victor Luxury 60V 30Ah (2024)",
    "distance_max": 100,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "fixe",
    "puissance_moteur": 4000,
    "poids_trottinette": 35,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.image/612/image_1024/TROTTINETTE%20ELECTRIQUE%20DUALTRON%20VICTOR%2060V%2035AH%20LUXURY%20PLUS%202024?unique=8a8be0f"
},
{
    "modele": "Dualtron Victor Luxury Plus 60V 35Ah (2024)",
    "distance_max": 120,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "fixe",
    "puissance_moteur": 4300,
    "poids_trottinette": 37,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.image/612/image_1024/TROTTINETTE%20ELECTRIQUE%20DUALTRON%20VICTOR%2060V%2035AH%20LUXURY%20PLUS%202024?unique=8a8be0f"
},
{
    "modele": "Dualtron Togo Plus 48V 15Ah",
    "distance_max": 45,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "fixe",
    "puissance_moteur": 500,
    "poids_trottinette": 19,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f"
},
{
    "modele": "Dualtron Togo Plus 48V 12Ah",
    "distance_max": 40,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "fixe",
    "puissance_moteur": 500,
    "poids_trottinette": 18,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f"
},
{
    "modele": "Dualtron Togo 36V 12Ah",
    "distance_max": 35,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 100,
    "taille_guidon": "fixe",
    "puissance_moteur": 450,
    "poids_trottinette": 17,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f"
},
{
    "modele": "Dualtron City 60V 25Ah",
    "distance_max": 80,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "ajustable",
    "puissance_moteur": 6000,
    "poids_trottinette": 45,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/3938/image_1024/%5BMMDUALTRONCITY20%5D%20TROTTINETTE%20%C3%89LECTRIQUE%20DUALTRON%20CITY%2060V20AH?unique=1e81a6f"
},
{
    "modele": "Dualtron City 60V 20Ah",
    "distance_max": 70,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 120,
    "taille_guidon": "ajustable",
    "puissance_moteur": 5500,
    "poids_trottinette": 44,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/3938/image_1024/%5BMMDUALTRONCITY20%5D%20TROTTINETTE%20%C3%89LECTRIQUE%20DUALTRON%20CITY%2060V20AH?unique=1e81a6f"
},
{
    "modele": "Dualtron Thunder 2 72V 40Ah (2024)",
    "distance_max": 150,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 150,
    "taille_guidon": "ajustable",
    "puissance_moteur": 10000,
    "poids_trottinette": 47,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/9174/image_1024/%5BMMDUALTRONTHUNDER22024%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20THUNDER%202%20%7C%2072V%2040Ah%202024?unique=dda07fa"
},
{
    "modele": "Dualtron Eagle 60V 18Ah",
    "distance_max": 60,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 100,
    "taille_guidon": "fixe",
    "puissance_moteur": 2200,
    "poids_trottinette": 28,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/3942/image_1024/%5BMMDUALTRONEAGLE60V18%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20EAGLE%2060V%2018Ah?unique=4f70f7a"
},
{
    "modele": "Dualtron Dolphin 36V 15Ah",
    "distance_max": 50,
    "type_trajet": ["route", "tout-terrain"],
    "relief": ["plat", "modere"],
    "poids_max": 100,
    "taille_guidon": "fixe",
    "puissance_moteur": 500,
    "poids_trottinette": 23,
    "prix": 2500,
    "image": "https://www.minimotors.fr/web/image/product.product/9176/image_1024/%5BMMDUALTRONDOLPHIN36V12A%5D%20TROTTINETTE%20ELECTRIQUE%20DUALTRON%20DOLPHIN%2036V%2012A?unique=8add94f"
}
];

const Results = ({ answers, onRestart }) => {
  const filteredResults = trottinettes.filter((trottinette) => {
    return (
      trottinette.distance_max >= answers.distance &&
      trottinette.poids_max >= answers.weight &&
      trottinette.prix <= answers.price
    );
  });

  return (
    <section className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResults.map((trottinette, index) => (
          <div key={index} className="border p-4 bg-white shadow-lg">
            <h3 className="font-bold text-blue-800 text-lg">
              {trottinette.modele}
            </h3>
            <img
              src={trottinette.image}
              alt={trottinette.modele}
              className="w-full h-auto mb-4"
            />
            <p>Autonomie : {trottinette.distance_max} km</p>
            <p>Prix : {trottinette.prix} €</p>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-blue-800 text-white px-6 py-2"
        onClick={onRestart}
      >
        Recommencer
      </button>
    </section>
  );
};

export default Results;
