import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu, IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setNavbarOpen(false);
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-amber-500 z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-6 w-full flex justify-between items-center">
          <h1 className="font-bold text-3xl text-white italic select-none">
            ClipIt
          </h1>
        <ul
          className={`sm:flex ${
            navbarOpen
              ? "flex flex-col pt-4 pb-6 px-6 shadow-lg"
              : "hidden"
          } sm:gap-10 gap-5 sm:items-center items-center text-center sm:static absolute left-0 top-16 bg-amber-500 sm:bg-transparent w-full sm:w-auto transition-all duration-200`}
        >
          {path !== "/dashboard" && (
            <li className="hover:underline font-medium transition-all duration-150">
              <Link
                onClick={() => setNavbarOpen(false)}
                className={`flex items-center justify-center gap-1.5 ${
                  path === "/"
                    ? "text-white underline font-bold"
                    : "text-white font-semibold"
                }`}
                to="/"
              >
                {path === "/" && <IoIosArrowForward className="text-sm" />}
                Home
              </Link>
            </li>
          )}
          {token && (
            <li className="hover:underline font-medium transition-all duration-150">
              <Link
                onClick={() => setNavbarOpen(false)}
                className={`flex items-center justify-center gap-1.5 ${
                  path === "/dashboard"
                    ? "text-white underline font-bold"
                    : "text-white font-semibold"
                }`}
                to="/dashboard"
              >
                {path === "/dashboard" && <IoIosArrowForward className="text-sm" />}
                Dashboard
              </Link>
            </li>
          )}
          {!token && (
            <li className="hover:underline font-medium transition-all duration-150">
              <Link
                onClick={() => setNavbarOpen(false)}
                className={`flex items-center justify-center gap-1.5 ${
                  path === "/register"
                    ? "text-white underline font-bold"
                    : "text-white font-semibold"
                }`}
                to="/register"
              >
                {path === "/register" && <IoIosArrowForward className="text-sm" />}
                Signup
              </Link>
            </li>
          )}

          {token && (
            <li className="hover:underline hover:decoration-white text-white font-medium transition-all duration-150">
              <button
                onClick={onLogOutHandler}
                className="flex items-center justify-center gap-1.5 text-white font-semibold cursor-pointer"
              >
                LogOut
              </button>
            </li>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
