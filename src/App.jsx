import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const birthday = new Date("2025-06-06T00:00:00");
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = birthday - now;

      if (distance < 0) {
        setCountdown("🎉 Happy Birthday! 🎂");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-200 p-8 font-sans">
      {/* Title and Countdown */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold text-pink-700">
          Happy Birthday, Shruti! 🎉
        </h1>
        <p className="mt-2 text-lg text-purple-800">Countdown to your special day:</p>
        <p className="text-2xl font-semibold text-pink-600 mt-1">{countdown}</p>
      </motion.div>

      {/* Grid Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Message Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            A Message From Me 💌
          </h2>
          <p className="text-gray-700">
            Dear Shruti, on your special day, I just want to say how much you mean
            to me. Thank you for being you — wonderful, bright, and beautiful inside
            and out.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            Photo Gallery 📸
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="/photos/photo1.jpg"
              alt="Memory 1"
              className="rounded-lg object-cover h-24 w-full"
            />
            <img
              src="/photos/photo2.jpg"
              alt="Memory 2"
              className="rounded-lg object-cover h-24 w-full"
            />
            <img
              src="/photos/photo3.jpg"
              alt="Memory 3"
              className="rounded-lg object-cover h-24 w-full"
            />
            <img
              src="/photos/photo4.jpg"
              alt="Memory 4"
              className="rounded-lg object-cover h-24 w-full"
            />
            <img
              src="/photos/photo5.jpg"
              alt="Memory 5"
              className="rounded-lg object-cover h-24 w-full"
            />
            <img
              src="/photos/photo6.jpg"
              alt="Memory 6"
              className="rounded-lg object-cover h-24 w-full"
            />
          </div>
        </div>

        {/* Wishes Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            Leave Your Wishes ✨
          </h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Write your message..."
              className="p-2 border border-gray-300 rounded-md"
            ></textarea>
            <button
              type="submit"
              className="bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
