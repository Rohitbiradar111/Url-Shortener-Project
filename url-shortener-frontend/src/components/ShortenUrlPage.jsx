import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
    }
  }, [url]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-700 font-medium text-xl sm:text-2xl select-none">
        <span>Redirecting you...</span>
        <FiLoader className="animate-spin text-amber-500 text-2xl sm:text-3xl" />
      </div>
    </div>
  );
};

export default ShortenUrlPage;
