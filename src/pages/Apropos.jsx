import React, { useState } from "react";
import NewsletterSignup from "../components/NewsletterSignup.jsx";
import Questionnaire from "../components/Questionnaire";

export default function About() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleStart = () => {
    setShowQuestionnaire(true);
  };

  return (
    <main className="flex-grow mt-4">
      {showQuestionnaire ? (
        <Questionnaire />
      ) : (
        <>
          {/* Hero Section */}
          <section
            className="flex flex-col justify-center lg:flex-row max-w-7xl mx-auto py-12 px-4 lg:space-x-16 space-y-8 lg:space-y-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('/assets/backgrounds/Slide-ZT3-Pro-Launch-banner-FINAL-2.jpg')",
            }}
          >
            <div className="w-full bg-black/20 text-white space-y-4 lg:w-1/2 text-center lg:text-left p-8 mx-auto">
              <h1 className="text-4xl font-bold mb-4">À propos de Compv3</h1>
              <h2 className="text-2xl font-semibold mb-2">Notre mission, votre mobilité</h2>
              <p className="text-base md:text-xl leading-relaxed text-justify mb-4">
                Bienvenue sur <span className="font-semibold">Comp</span>, la plateforme ultime pour comparer les trottinettes électriques et choisir le modèle parfait pour vos besoins. Que ce soit pour vos trajets quotidiens, vos loisirs ou un usage professionnel, nous sommes là pour vous guider.
              </p>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-6">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">L'idée derrière Compv3</h2>
                  <p className="text-gray-600 mb-4">
                  Compv3 est né d'une expérience personnelle, d'un besoin réel. Lors de l'achat de nos premières trottinettes électriques, nous avons été confrontés à une multitude de modèles, de caractéristiques techniques et d'avis contradictoires. Comment choisir parmi tant d'options ? C'est à ce moment-là que nous avons réalisé qu'il manquait un outil simple, efficace et personnalisé pour guider les utilisateurs dans leur choix.
                  </p>
                  <p className="text-gray-600 mb-4">
                    C'est ainsi qu'est née l'idée du <span className="font-semibold">questionnaire d'aide au choix</span>. En prenant en compte vos critères personnels tels que le poids, le type de trajet, l'autonomie souhaitée ou encore votre budget, notre questionnaire vous guide vers les modèles qui correspondent vraiment à vos besoins. Plus qu'un simple comparateur, Trotticomp est votre allié pour simplifier votre expérience d'achat.
                  </p>
                  <button
                    onClick={handleStart}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
                  >
                    Lancer le questionnaire
                  </button>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Nos valeurs</h2>
                  <p className="text-gray-600 mb-4">
                    Chez Compv3, nous croyons fermement à l'importance des mobilités douces dans un monde où la circulation devient de plus en plus complexe. Les trottinettes électriques représentent une alternative pratique, économique et respectueuse de l'environnement. Elles permettent de réduire les émissions polluantes, de désencombrer nos routes et de simplifier vos déplacements quotidiens.
                  </p>
                  <p className="text-gray-600 mb-4">
                    En utilisant des véhicules légers, moins polluants et moins stressants, nous pouvons agir concrètement pour notre bien-être, celui de notre planète et pour un avenir plus durable. Compv3 s'engage à promouvoir cette vision en facilitant l'accès à des solutions de mobilité adaptées à vos besoins.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Signup Section */}
          <section className="mt-16">
            <NewsletterSignup />
          </section>
        </>
      )}
    </main>
  );
}
