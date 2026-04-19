/* eslint-disable */

import { getPaket, getPaketById } from "@/services/paketDataService";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Information from "@/components/layout/DetailComponent/information";
import PriceCard from "@/components/layout/DetailComponent/price-card";
import Card from "@/components/layout/Card/card";

export default function DetailPaketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paketById, setPaketById] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paket, setPaket] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPaketById(id)
      .then((data) => {
        setPaketById(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data paket");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getPaket()
      .then((data) => {
        setPaket(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  const filteredPaket = paket
    ? paket.filter(
        (p) => p.provider === paketById.provider && p.id !== paketById.id,
      )
    : [];

  if (loading) {
    return (
      <main className="flex items-center justify-center w-full min-h-screen bg-linear-to-br from-red-50 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-200 rounded-full border-t-red-600 animate-spin"></div>
          <p className="text-gray-600">Memuat data paket...</p>
        </div>
      </main>
    );
  }

  if (error || !paketById) {
    return (
      <main className="flex items-center justify-center w-full min-h-screen bg-linear-to-br from-red-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md p-8 text-center bg-white shadow-lg rounded-2xl"
        >
          <h2 className="mb-4 text-2xl font-bold text-red-600">Oops!</h2>
          <p className="mb-6 text-gray-600">
            {error || "Paket tidak ditemukan"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen py-8 bg-linear-to-br font-instrument from-red-50 to-white">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-8 ml-6 font-semibold text-red-600 transition cursor-pointer md:ml-12 hover:text-red-700"
      >
        <ArrowLeft className="w-5 h-5" />
        Kembali
      </motion.button>
      <section className="flex w-full gap-10 px-6 lg:px-28">
        <Information paket={paketById} />
        <PriceCard paket={paketById} />
      </section>
      <section className="w-full px-6 my-16 space-y-6 lg:px-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Lainnya dari{" "}
            <span className="text-red-600">{paketById.provider}</span>
          </h1>
          <Link
            to={`/#paket-data`}
            className="flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
          >
            Lihat Semua <ArrowRight size={20} />
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
          {filteredPaket.slice(0, 3).map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
