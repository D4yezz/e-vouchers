import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import React from "react";
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
  const user = localStorage.getItem("auth-storage");
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-center p-3 font-instrument">
      <nav className="flex items-center justify-between w-full px-6 py-3 text-white bg-linear-to-br from-red-600 to-red-800 rounded-lg">
        <Link
          to="/"
          className="text-xl font-semibold text-white hover:text-gray-300"
        >
          E - Vouchers
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-white hover:text-gray-300">
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
      </nav>
    </header>
  );
}
