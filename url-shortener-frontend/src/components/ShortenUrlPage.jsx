import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
    }
  }, [url]);
  return (
    <p className="flex justify-center items-center text-2xl mt-5">
      Redirecting...
    </p>
  );
};

export default ShortenUrlPage;
