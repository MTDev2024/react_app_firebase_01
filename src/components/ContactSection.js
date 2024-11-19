import React from "react";

export default function ContactSection() {
  return (
    <main className="flex-grow">
      <section id="contact-section" className="py-10 px-4 max-w-5xl mx-auto">
        {/* Titre principal */}
        <h1 className="text-4xl font-bold text-blue-600 mt-6 text-center">
          Contactez-nous
        </h1>
        <p className="text-gray-600 m-4 text-center">
          Vous avez des questions, des suggestions ou besoin d'aide ? Remplissez
          le formulaire ci-dessous <br /> et nous vous répondrons dans les plus
          brefs délais.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-8">
          {/* Formulaire de Contact */}
          <form className="bg-white p-8 shadow-lg mt-4">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-blue-600 font-semibold mb-2"
              >
                Nom :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-blue-600 font-semibold mb-2"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-blue-600 font-semibold mb-2"
              >
                Objet :
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-blue-600 font-semibold mb-2"
              >
                Message :
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 hover:bg-blue-700 transition duration-300"
            >
              Envoyer
            </button>
          </form>

          {/* Informations de Contact */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Nos coordonnées
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Adresse :</strong> 123 Rue de la Mobilité, Paris, France
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Téléphone :</strong>
              <a href="tel:+33123456789" className="text-blue-600 hover:underline">
                +33 1 23 45 67 89
              </a>
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email :</strong>
              <a
                href="mailto:contact@trotticompv3.com"
                className="text-blue-600 hover:underline"
              >
                contact@trotticompv3.com
              </a>
            </p>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9990937428826!2d2.292292315674804!3d48.85884407928785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdf00000001%3A0x2b2b4c9e4b4c84a6!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1605554103583!5m2!1sen!2sfr"
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Carte Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
