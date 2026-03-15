/**
 * Données des questions du questionnaire.
 *
 * Chaque question a un type qui détermine son rendu dans Question.jsx :
 *   - "slider"  : curseur numérique (distance, poids, taille, budget)
 *   - "choice"  : boutons image (multiple: true = plusieurs choix, false = un seul)
 *
 * answerKey : clé utilisée dans l'objet answers de Questionnaire.jsx
 */

import img01 from '../assets/images/img01.jpg';
import img02 from '../assets/images/img02.jpg';
import img03 from '../assets/images/img03.jpg';
import img04 from '../assets/images/img04.jpg';
import img05 from '../assets/images/img05.jpg';
import img06 from '../assets/images/img06.jpg';
import img07 from '../assets/images/img07.jpg';
import img08 from '../assets/images/img08.jpg';
import img09 from '../assets/images/img09.jpg';
import img11 from '../assets/images/img11.jpg';
import img12 from '../assets/images/img12.jpg';
import img13 from '../assets/images/img13.jpg';
import img14 from '../assets/images/img14.jpg';
import img15 from '../assets/images/img15.jpg';
import img16 from '../assets/images/img16.jpg';

export const questions = [
  {
    id: 1,
    type: "slider",
    question: "Quelle distance parcourez-vous au quotidien ?",
    image: img01,
    imageAlt: "Distance quotidienne",
    answerKey: "distance",
    min: 0,
    max: 150,
    defaultValue: 50,
    unit: "km",
    minLabel: "0 km",
    maxLabel: "+ de 150 km",
    // Messages contextuels affichés selon la valeur du curseur
    messages: [
      { when: 0, text: "Attention : 0 km signifie une distance très faible." },
      { when: 150, text: 'Attention : "+ de 150 km" correspond à des trajets très longs.' },
    ],
  },
  {
    id: 2,
    type: "slider",
    question: "Quel est votre poids ?",
    image: img02,
    imageAlt: "Poids utilisateur",
    answerKey: "weight",
    min: 40,
    max: 150,
    defaultValue: 70,
    unit: "kg",
    minLabel: "40 kg",
    maxLabel: "150 kg",
  },
  {
    id: 3,
    type: "slider",
    question: "Votre taille ?",
    image: img03,
    imageAlt: "Taille utilisateur",
    answerKey: "height",
    min: 140,
    max: 220,
    defaultValue: 170,
    unit: "cm",
    minLabel: "140 cm",
    maxLabel: "220 cm",
  },
  {
    id: 4,
    type: "choice",
    question: "Type de trajets ?",
    answerKey: "type_trajet",
    multiple: true, // Plusieurs choix possibles
    columns: 2,
    options: [
      { label: "Route", value: "route", image: img04, alt: "Trajets sur route" },
      { label: "Chemin", value: "chemin", image: img05, alt: "Trajets sur chemin" },
    ],
  },
  {
    id: 5,
    type: "choice",
    question: "Type de relief ?",
    answerKey: "relief",
    multiple: true, // Plusieurs choix possibles
    columns: 3,
    options: [
      { label: "Plat", value: "plat", image: img06, alt: "Relief plat" },
      { label: "Modéré", value: "modere", image: img07, alt: "Relief modéré" },
      { label: "Pentes", value: "pente", image: img08, alt: "Pentes" },
    ],
  },
  {
    id: 6,
    type: "slider",
    question: "Quel est votre budget ?",
    image: img09,
    imageAlt: "Budget",
    answerKey: "budget",
    min: 0,
    max: 9990,
    defaultValue: 5000,
    unit: "€",
    minLabel: "0 €",
    maxLabel: "9990 €",
  },
  {
    id: 7,
    type: "choice",
    question: "Roulez-vous sous la pluie ?",
    answerKey: "meteo",
    multiple: false, // Un seul choix
    columns: 2,
    options: [
      { label: "Non", value: "Non", image: img11, alt: "Option Non" },
      { label: "Oui", value: "Oui", image: img12, alt: "Option Oui" },
    ],
  },
  {
    id: 8,
    type: "choice",
    question: "Prenez-vous les transports en commun avec votre trottinette ? Avez-vous besoin de pouvoir l'emmener dans votre voiture ?",
    answerKey: "mobility",
    multiple: false, // Un seul choix
    columns: 2,
    options: [
      { label: "Non", value: "Non", image: img13, alt: "Option Non" },
      { label: "Oui", value: "Oui", image: img14, alt: "Option Oui" },
    ],
  },
  {
    id: 9,
    type: "choice",
    question: "Pour quel usage ?",
    answerKey: "usage",
    multiple: false, // Un seul choix
    columns: 2,
    options: [
      { label: "Loisir", value: "loisir", image: img15, alt: "Option Loisir" },
      { label: "Professionnel", value: "pro", image: img16, alt: "Option Professionnel" },
    ],
  },
];
