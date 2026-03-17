import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
      <div
        className={`text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 404 animé */}
        <div className="relative inline-block mb-6">
          <span className="text-[10rem] font-black text-blue-100 leading-none select-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-blue-600 leading-none opacity-10 blur-sm select-none">
            404
          </span>
        </div>

        {/* Icône trottinette */}
        <div className="text-6xl mb-4 py-2">
          <span className="scooter-ride">🛴</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Vous vous êtes perdus ?
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour
          trouver la trottinette qu'il vous faut.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </button>
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
