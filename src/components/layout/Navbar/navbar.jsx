/* eslint-disable */
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "List Paket Data",
    path: "/#paket-data",
  },
  {
    name: "Riwayat Transaksi",
    path: "/transactions",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.getItem("auth-storage");
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [isDekstop, setIsDekstop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDekstop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <header className="flex items-center justify-center p-3 font-instrument">
      <nav className="flex items-center justify-between w-full px-6 py-3 text-white bg-linear-to-br from-red-600 to-red-800 rounded-lg">
        <Link
          to="/"
          className="text-xl font-semibold text-white hover:text-gray-300"
        >
          E - Vouchers
        </Link>
        {isDekstop ? (
          <div className="flex items-center gap-6">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white hover:text-gray-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {user ? (
              <Button
                onClick={handleLogout}
                className={
                  "bg-white text-red-600 hover:text-white duration-150 ease-in-out"
                }
              >
                Logout
              </Button>
            ) : (
              <Link
                className="bg-white text-red-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-200"
                to="/auth/login"
              >
                Login
              </Link>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="p-2 rounded-lg text-red-600 bg-white"
          >
            <Menu size={20} />
          </button>
        )}
        {isOpen && (
          <AnimatePresence>
            <button
              className="bg-black/30 w-full h-full fixed top-0 right-0 z-40"
              onClick={() => {
                setIsOpen(false);
              }}
            ></button>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-[50vw] h-full bg-white shadow-lg flex flex-col items-center z-40 gap-4"
            >
              <div className="flex w-full items-center bg-linear-to-br px-4 py-4 from-red-600 to-red-800 justify-between">
                <h1 className="text-xl font-semibold">E - Vouchers</h1>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-lg text-red-600 bg-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col px-4 py-4 items-end justify-center gap-6">
                <ul className="flex flex-col items-center space-y-6 mb-40">
                  {navItems.map((item) => (
                    <li
                      key={item.path}
                      className="text-white hover:text-gray-300 bg-red-600 w-full py-2 px-4 rounded-md text-center"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
                {user ? (
                  <Button
                    onClick={handleLogout}
                    className={
                      "bg-red-600 text-white hover:text-gray-300 duration-150 ease-in-out w-full"
                    }
                  >
                    Logout
                  </Button>
                ) : (
                  <Link
                    className="bg-white text-red-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-200"
                    to="/auth/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </nav>
    </header>
  );
}
