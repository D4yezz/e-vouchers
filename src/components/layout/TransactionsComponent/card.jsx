import { formatPrice } from "@/utils/format";

export default function TransactionCard({ item }) {
  const formatDate = (date) => new Date(date).toLocaleString("id-ID");

  return (
    <div className="p-5 transition bg-white border border-red-100 shadow-sm rounded-2xl hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-red-600">{item.name}</h2>
        <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded">
          Berhasil
        </span>
      </div>

      <p className="mb-2 text-sm text-gray-500">{item.provider}</p>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <p>
          <span className="text-gray-500">Kuota:</span> {item.kuota} GB
        </p>
        <p>
          <span className="text-gray-500">Harga:</span>{" "}
          {formatPrice(item.price)}
        </p>
        <p>
          <span className="text-gray-500">No HP:</span> {item.phone}
        </p>
        <p>
          <span className="text-gray-500">Tanggal:</span>{" "}
          {formatDate(item.date)}
        </p>
      </div>
    </div>
  );
}
