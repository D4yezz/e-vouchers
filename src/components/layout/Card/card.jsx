import { formatPrice } from "@/utils/format";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export default function Card({ item }) {
  return (
    <div className="flex flex-col h-fit justify-between gap-2 p-4 duration-300 ease-in-out border border-red-600 rounded-lg shadow-md lg:w-[30%] w-full hover:shadow-lg hover:shadow-red-500/40 font-inter">
      <h2 className="text-3xl font-bold text-red-600">{item.name}</h2>
      <p className="text-gray-500 text-md ">{item.provider}</p>
      <div className="flex items-center justify-center w-full py-4 my-2 rounded-lg bg-linear-to-br from-red-50 to-red-200">
        <h3 className="text-[5rem] leading-20 bg-linear-to-br select-none from-red-600 to-red-800 bg-clip-text text-transparent font-bold font-inter">
          {item.kuota} GB
        </h3>
      </div>
      <div className="h-1.5 w-full border-t border-red-600" />
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-red-700">
          {formatPrice(item.price)}
        </p>
        <Link
          to={`/detail-paket/${item.id}`}
          className={
            "bg-red-600 text-white w-1/3 flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium hover:bg-red-700"
          }
        >
          <ShoppingCart size={18} /> Beli
        </Link>
      </div>
    </div>
  );
}
