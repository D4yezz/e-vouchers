import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const toast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      toast("Mohon isi semua data", "error");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });

      toast("Login Berhasil", "success");
      navigate("/");
    } catch (error) {
      toast(error.message || "Login gagal", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col p-6 text-red-700 bg-white rounded-lg shadow-lg w-fit h-fit">
      <h1 className="mb-6 text-4xl font-bold text-red-700">Login</h1>
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
        <Button disabled={loading} type="submit" className={"text-white mt-6"}>
          Login
        </Button>
      </form>
      <p className="flex gap-2 mt-4 text-sm font-medium">
        Tidak punya akun?
        <Link to="/auth/register" className="text-red-700 hover:underline">
          Register disini
        </Link>
      </p>
    </div>
  );
}
