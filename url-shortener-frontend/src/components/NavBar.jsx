import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    setNavbarOpen(false);
  }, [path]);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-amber-500 z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/">
          <h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
            ClipIt
          </h1>
        </Link>
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 sm:static absolute left-0 top-16 bg-amber-500 ${
            navbarOpen ? "h-fit sm:pb-0" : "h-0 overflow-hidden"
          } sm:h-fit sm:bg-none sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="hover:underline font-medium transition-all duration-150">
            <Link
              className={`${
                path === "/"
                  ? "text-white underline"
                  : "text-white font-semibold"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          {token && (
            <li className="hover:underline font-medium transition-all duration-150">
              <Link
                className={`${
                  path === "/dashboard"
                    ? "text-white underline"
                    : "text-white font-semibold"
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {!token && (
            <Link to="/register">
              <li className=" sm:ml-0 -ml-1 bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md transition-all duration-150">
                Signup
              </li>
            </Link>
          )}

          {token && (
            <button
              onClick={onLogOutHandler}
              className="sm:ml-0 -ml-1 bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md transition-all duration-150"
            >
              LogOut
            </button>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
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
