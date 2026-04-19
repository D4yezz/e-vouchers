/* eslint-disable */
import { useEffect } from "react";
import { useToastStore } from "@/store/toastStore";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Toast() {
  const { open, message, type, closeToast } = useToastStore();

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      closeToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [open, closeToast]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-5 w-fit p-4 right-1/2 translate-x-1/2 rounded-2xl flex z-50 items-center gap-4 ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {message}
        <button className="cursor-pointer" onClick={closeToast}>
          <XIcon />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
