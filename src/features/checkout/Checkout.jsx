/*eslint-disable*/
import { useState } from "react";
import { ShoppingBasket, X } from "lucide-react";
import { motion } from "motion/react";
import { formatPrice } from "@/utils/format";
import { createTransaction } from "@/services/transactionService";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { useNavigate } from "react-router";
import Button from "@/components/ui/Button";
import { s } from "motion/react-client";

export default function Checkout({ paket, onClose }) {
  const toast = useToastStore((state) => state.showToast);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!phone) {
      toast("Nomor HP wajib diisi", "error");
      return;
    }

    if (!/^08\d{8,11}$/.test(phone)) {
      toast("Format nomor tidak valid", "error");
      return;
    }
    try {
      createTransaction({
        userId: user.id,
        paketId: paket.id,
        phone: phone,
        price: paket.price,
        date: new Date(),
      });
      toast("Transaksi berhasil dibuat", "success");
    } catch (e) {
      console.error("Error creating transaction:", e);
      toast("Gagal membuat transaksi. Silakan coba lagi.", "error");
      return;
    } finally {
      setLoading(false);
    }

    navigate("/transactions/success");
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 z-40 w-screen h-screen bg-black"
      />

      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col p-8 bg-white shadow-2xl rounded-3xl w-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-red-600">
              <ShoppingBasket size={26} /> Checkout
            </h2>
            <button onClick={() => onClose()} className="cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <p className="mb-4 text-gray-600">
            Beli{" "}
            <span className="font-semibold text-red-600">{paket.name}</span> (
            {formatPrice(paket.price)})
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nomor Handphone
              </label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => onClose()}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
              >
                Batal
              </button>

              <Button disabled={loading} type="submit" className={"text-white"}>
                Konfirmasi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
