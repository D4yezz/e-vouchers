import Navbar from "@/components/layout/Navbar/navbar";
import Transactions from "@/features/transactions/Transactions";
import React from "react";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen px-6 font-instrument bg-gray-50">
      <Navbar />
      <Transactions />
    </main>
  );
}
