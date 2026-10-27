import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-6">
      <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-2xl sm:text-3xl text-center font-bold mb-2 text-gray-800">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        {message ? message : "An unexpected error has occurred"}
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="bg-amber-300 hover:bg-amber-400 font-semibold px-6 py-2 rounded-md shadow-md shadow-slate-500 text-slate-900 cursor-pointer transition-colors"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
