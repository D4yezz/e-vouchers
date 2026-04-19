import Card from "@/components/layout/Card/card";
import { getPaket } from "@/services/paketDataService";
import { useEffect, useMemo, useState } from "react";

export default function PaketData() {
  const [paketData, setPaketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState("");
  const [price, setPrice] = useState("");
  const [kuota, setKuota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    getPaket()
      .then((data) => {
        setPaketData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const providers = useMemo(() => {
    return [...new Set(paketData.map((p) => p.provider))];
  }, [paketData]);

  const filteredData = useMemo(() => {
    return paketData.filter((item) => {
      const matchProvider = provider ? item.provider === provider : true;

      const matchPrice = price
        ? price === "low"
          ? item.price < 50000
          : price === "medium"
            ? item.price >= 50000 && item.price <= 100000
            : item.price > 100000
        : true;

      const matchKuota = kuota
        ? kuota === "small"
          ? item.kuota < 10
          : kuota === "medium"
            ? item.kuota >= 10 && item.kuota <= 30
            : item.kuota > 30
        : true;

      return matchProvider && matchPrice && matchKuota;
    });
  }, [paketData, provider, price, kuota]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  return (
    <>
      <section
        id="paket-data"
        className="flex flex-col w-full gap-4 px-8 mt-6 mb-20"
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">List Paket Data</h2>

          <div className="flex items-center justify-end gap-4">
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-red-600 rounded shadow-md"
            >
              <option value="">Semua Provider</option>
              {providers.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <select
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-red-600 rounded shadow-md"
            >
              <option value="">Semua Harga</option>
              <option value="low">{"< 50K"}</option>
              <option value="medium">50K - 100K</option>
              <option value="high">{"> 100K"}</option>
            </select>

            <select
              value={kuota}
              onChange={(e) => {
                setKuota(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-red-600 rounded shadow-md"
            >
              <option value="">Semua Kuota</option>
              <option value="small">{"< 10GB"}</option>
              <option value="medium">10GB - 30GB</option>
              <option value="large">{"> 30GB"}</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {paginatedData.length > 0 || loading ? (
            paginatedData.map((paket) => <Card key={paket.id} item={paket} />)
          ) : (
            <p className="text-gray-500">Data tidak ditemukan</p>
          )}
        </div>
        {loading ? (
          <div className="flex items-center justify-center w-full mx-auto mt-6 rounded-lg h-125 bg-gray-400/20 animate-pulse">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-6 py-2 text-white border rounded-lg cursor-pointer bg-linear-to-br from-red-600 to-red-800 disabled:opacity-50"
            >
              Sebelumnya
            </button>

            <span className="flex items-center">
              {currentPage} dari {totalPages || 1}
            </span>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-6 py-2 text-white border rounded-lg cursor-pointer disabled:opacity-50 bg-linear-to-br from-red-600 to-red-800"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </section>
    </>
  );
}
