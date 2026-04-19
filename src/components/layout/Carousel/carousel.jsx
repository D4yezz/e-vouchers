/* eslint-disable */
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [
    { id: 1, src: "/carousel/1.jpg" },
    { id: 2, src: "/carousel/2.jpg" },
    { id: 3, src: "/carousel/3.jpg" },
    { id: 4, src: "/carousel/4.jpeg" },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  return (
    <div className="w-full px-8 py-4 mx-auto">
      <div
        className="relative w-full overflow-hidden shadow-lg h-76 rounded-3xl"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={images[currentSlide].src}
            alt={`Banner ${currentSlide + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute z-10 p-2 transition -translate-y-1/2 bg-white bg-opacity-50 rounded-full cursor-pointer left-4 top-1/2 hover:bg-opacity-75"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute z-10 p-2 transition -translate-y-1/2 bg-white bg-opacity-50 rounded-full cursor-pointer right-4 top-1/2 hover:bg-opacity-75"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <div className="absolute z-10 flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
          {images.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all ${
                idx === currentSlide
                  ? "bg-white w-8 h-2"
                  : "bg-white bg-opacity-50 w-2 h-2 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-gray-600">
        <p className="text-sm font-medium">
          {currentSlide + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
