import React from 'react';
import { Link } from 'react-router-dom';

const CGU = () => {
  return (
    <main className="flex-grow px-4 py-8 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Conditions Générales d'Utilisation (CGU)</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Objet du site</h2>
          <p>
            Trotticomp est un site fournissant des outils de comparaison et des informations liées aux
            économies de mobilité durable, comme les calculs liés à l'utilisation de trottinettes électriques
            et de véhicules personnels.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Accès au site</h2>
          <ul className="list-disc pl-6">
            <li>
              L'accès au site est gratuit, mais peut nécessiter une connexion à Internet dont les frais restent à votre charge.
            </li>
            <li>
              Nous nous réservons le droit de suspendre ou de limiter l'accès au site sans préavis en cas de maintenance ou pour toute autre raison.
            </li>
          </ul>
        </section>

        {/* Autres sections */}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Modification des CGU</h2>
          <ul className="list-disc pl-6">
            <li>
              Trotticomp se réserve le droit de modifier ces CGU à tout moment. Les utilisateurs sont invités à
              consulter cette page régulièrement.
            </li>
            <li>
              En continuant à utiliser le site après une modification, vous acceptez les nouvelles conditions.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Droit applicable et litiges</h2>
          <ul className="list-disc pl-6">
            <li>Les présentes CGU sont régies par le droit français.</li>
            <li>
              En cas de litige, les parties s'engagent à rechercher une solution amiable avant de recourir à une
              action judiciaire.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <p>
            Pour toute question concernant ces CGU, vous pouvez nous contacter via notre{' '}
            <Link to="/contact" className="text-blue-600 underline">
              page Contact
            </Link>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default CGU;
