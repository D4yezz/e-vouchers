import TransactionCard from "@/components/layout/TransactionsComponent/card";
import { getPaket } from "@/services/paketDataService";
import { getTransactions } from "@/services/transactionService";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [paketList, setPaketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToastStore((state) => state.showToast);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      getTransactions()
        .then(setTransactions)
        .catch((err) => toast(err.message, "error"));

      getPaket()
        .then(setPaketList)
        .catch((err) => toast(err.message, "error"));
      setLoading(false);
    };

    getData();
  }, [toast]);

  const userTransactions = transactions.filter((t) => t.userId === user?.id);

  const mergedTransactions = userTransactions.map((t) => {
    const paket = paketList.find((p) => p.id === t.paketId);

    return {
      ...t,
      name: paket?.name,
      kuota: paket?.kuota,
      provider: paket?.provider,
    };
  });

  return (
    <div className="w-full px-10">
      <h1 className="mt-4 text-3xl font-bold text-red-600 mb-7">
        Riwayat Transaksi
      </h1>

      {mergedTransactions.length > 0 || loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mergedTransactions.map((item) => (
            <TransactionCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          Belum ada transaksi
        </div>
      )}
      {loading && (
        <div className="flex items-center justify-center w-1/3 p-5 text-center bg-gray-100 shadow-sm h-50 rounded-2xl animate-pulse">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
}
