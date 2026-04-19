/* eslint-disable */
import Checkout from "@/features/checkout/Checkout";
import { formatPrice } from "@/utils/format";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function PriceCard({ paket }) {
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col justify-center w-1/2"
      >
        <motion.div
          whileHover={{ translateY: -8 }}
          className="sticky p-8 bg-white shadow-2xl rounded-3xl md:p-12 top-8"
        >
          <div className="pb-8 mb-8 border-b-2 border-red-100">
            <p className="mb-4 text-sm tracking-wider text-gray-600 uppercase">
              Harga
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-red-600 md:text-6xl">
                {formatPrice(paket.price)}
              </span>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 mb-8 border border-red-200 bg-linear-to-br from-red-50 to-red-100 rounded-2xl"
          >
            <p className="mb-2 text-sm text-gray-600">Total Data</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-red-600">
                {paket.kuota} GB
              </span>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setShowDialog(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-full gap-2 py-4 mb-4 font-bold text-white transition duration-300 shadow-lg cursor-pointer bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl hover:shadow-xl"
          >
            <ShoppingCart size={22} />
            Beli Sekarang
          </motion.button>
        </motion.div>
      </motion.div>
      {showDialog && (
        <Checkout paket={paket} onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
