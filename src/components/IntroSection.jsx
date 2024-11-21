import React from "react";

const IntroSection = ({ onLaunch }) => {
  return (
    <section
      id="main-section"
      className="relative flex-grow w-full overflow-hidden flex items-center justify-center"
    >
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="/assets/videos/1109581_1080p_Healthy-lifestyle_1920x1080.m4v"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>

      {/* Paragraphe et bouton */}
      <div className="absolute bottom-16 right-16 md:right-24 z-10 p-4 md:p-8 max-w-2xl flex flex-col">
        <div className="bg-black/10 text-white text-right p-6 space-y-4">
          <h1 className="text-3xl md:text-5xl text-center font-bold">
            Trouvez la trottinette adaptée à{" "}
            <span className="inline-block animate-bounce-only text-blue-600 font-bold">
              vos
            </span>{" "}
            besoins
          </h1>
          <p className="text-base md:text-xl leading-relaxed text-justify">
            Face à la multitude de modèles de trottinettes disponibles, choisir
            la trottinette idéale peut être difficile. Avec notre outil simple
            et interactif, il vous suffit de répondre à quelques questions, et
            nous vous proposerons les trottinettes qui correspondent le mieux à
            vos besoins et à votre style de vie, que ce soit pour vos trajets
            quotidiens, le travail ou vos escapades de week-end.
          </p>
        </div>

        {/* Bouton "Commencer" */}
        <div className="relative z-10 mt-8 text-gray-800 flex items-center justify-center">
          <button
            className="bg-black/10 text-white font-mono font-semibold mt-4 py-2 px-4 min-w-[150px] h-[50px] shadow-lg border-2 border-transparent hover:border-white transition-all duration-500 ease-in-out mx-auto flex items-center justify-center group"
            aria-label="Commencer le questionnaire"
            onClick={onLaunch}
          >
            <ion-icon
              name="caret-forward"
              className="text-2xl group-hover:hidden"
            ></ion-icon>
            <span className="hidden group-hover:inline-block text-sm font-semibold">
              Commencer
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
