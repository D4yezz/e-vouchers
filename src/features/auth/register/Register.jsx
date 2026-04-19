import Button from "@/components/ui/Button";
import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showing, setShowing] = useState(false);
  const toast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      toast("Mohon isi semua data", "error");
      return;
    }

    registerUser({ email, password });
    toast("Registrasi Berhasil", "success");
    navigate("/");
  };
  return (
    <div className="flex flex-col p-6 text-red-700 bg-white rounded-lg shadow-lg w-fit h-fit">
      <h1 className="mb-6 text-4xl font-bold text-red-700">Register</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          className="px-4 py-2 border border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <div className="relative">
          <input
            type={showing ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            className="px-4 py-2 border border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="button"
            onClick={() => setShowing(!showing)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showing ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        </div>
        <Button type="submit" className={"text-white mt-6"}>
          Register
        </Button>
      </form>
      <p className="flex gap-2 mt-4 text-sm font-medium">
        Sudah punya akun?
        <Link to="/auth/login" className="text-red-700 hover:underline">
          Login disini
        </Link>
      </p>
    </div>
  );
}
