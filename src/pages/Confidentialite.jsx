import React from 'react';

const Confidentialite = () => {
  return (
    <main className="flex-grow px-4 py-8 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Politique de Confidentialité</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Chez PerfectRide, la protection de vos données personnelles est une priorité. Cette politique de
            confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque
            vous utilisez notre site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Données collectées</h2>
          <p>Nous collectons les types de données suivants :</p>
          <ul className="list-disc pl-6">
            <li>Informations fournies par l'utilisateur (nom, email, etc.) lors de l'inscription ou du contact.</li>
            <li>Données de navigation collectées via des cookies (adresse IP, pages visitées, temps passé).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Utilisation des données</h2>
          <p>Les données collectées sont utilisées pour :</p>
          <ul className="list-disc pl-6">
            <li>Fournir et améliorer nos services.</li>
            <li>Personnaliser votre expérience sur le site.</li>
            <li>Communiquer avec vous, notamment via des newsletters si vous avez donné votre consentement.</li>
            <li>Analyser les performances du site et réaliser des statistiques.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Partage des données</h2>
          <p>Vos données personnelles ne seront jamais vendues à des tiers. Cependant, elles peuvent être partagées avec :</p>
          <ul className="list-disc pl-6">
            <li>Des partenaires de confiance pour la fourniture de services (hébergement, outils d'analyse).</li>
            <li>Des autorités légales si la loi l'exige.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6">
            <li>Droit d'accès : Vous pouvez demander une copie de vos données personnelles.</li>
            <li>Droit de rectification : Vous pouvez demander la correction de données inexactes.</li>
            <li>Droit de suppression : Vous pouvez demander la suppression de vos données personnelles.</li>
            <li>Droit d'opposition : Vous pouvez vous opposer au traitement de vos données à des fins de marketing.</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à l'adresse suivante :{' '}
            <a href="mailto:votreemail@example.com" className="text-blue-600 underline">
              votreemail@example.com
            </a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience utilisateur. Vous pouvez configurer votre
            navigateur pour désactiver les cookies ou être averti lorsqu'ils sont utilisés.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données
            contre tout accès non autorisé, modification ou suppression.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Modification de la politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout moment. Nous vous encourageons à consulter
            cette page régulièrement pour rester informé des éventuelles mises à jour.
          </p>
          <p>Date de la dernière mise à jour : [Insérez la date].</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter via notre{' '}
            <a href="/contact" className="text-blue-600 underline">
              page Contact
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Confidentialite;
