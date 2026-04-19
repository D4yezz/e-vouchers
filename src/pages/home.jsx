import Navbar from "@/components/layout/Navbar/navbar";
import Carousel from "@/components/layout/Carousel/carousel";
import React, { useEffect } from "react";
import PaketData from "@/features/paketData/PaketData";
import { useLocation } from "react-router";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <main className="min-h-screen lg:px-6 px-4 font-instrument bg-gray-50">
      <Navbar />
      <Carousel />
      <PaketData />
    </main>
  );
}
