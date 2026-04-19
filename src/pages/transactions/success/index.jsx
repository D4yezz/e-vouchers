import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

export default function SuccessPage() {
  return (
    <main className="flex items-center justify-center w-full h-screen bg-linear-to-br font-geist from-red-500 to-red-700">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 p-8 text-center bg-white shadow-xl rounded-2xl">
        <CheckCircle size={80} className="text-red-600" />
        <h1 className="text-5xl font-bold text-transparent bg-linear-to-br from-red-600 to-red-800 bg-clip-text">
          Transaksi Berhasil
        </h1>
        <p className="text-lg font-medium text-gray-500">
          Terimakasih telah melakukan transaksi
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link
            to="/"
            className="px-6 py-2 text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Kembali ke Dashboard
          </Link>
          <Link
            to="/transactions"
            className="px-6 py-2 text-white transition duration-300 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Lihat Histori Transaksi
          </Link>
        </div>
      </div>
    </main>
  );
}
