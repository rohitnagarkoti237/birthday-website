import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function BirthdayWebsite() {
  const [countdown, setCountdown] = useState('');
  const mountRef = useRef(null);

  // Countdown Timer
  useEffect(() => {
    const birthday = new Date('2025-06-06T00:00:00');
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = birthday - now;

      if (distance < 0) {
        setCountdown("🎉 Happy Birthday! 🎂");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Three.js 3D Background
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add animated stars
    const stars = [];
    for (let i = 0; i < 300; i++) {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(200)
      );
      scene.add(star);
      stars.push(star);
    }

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.forEach(star => {
        star.rotation.x += 0.002;
        star.rotation.y += 0.002;
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 -z-10" />

      <motion.div
        className="text-center pt-10 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-pink-300 drop-shadow-lg">Happy Birthday, Shruti! 🎉</h1>
        <p className="mt-3 text-xl text-purple-100">Countdown to your special day:</p>
        <p className="text-3xl font-semibold mt-1 text-yellow-200">{countdown}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-16">
        {/* Message Card */}
        <motion.div
          className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-yellow-100 mb-3">A Message From Me 💌</h2>
          <p className="text-white">
            Dear Shruti, on your special day, I just want to say how much you mean to me.
            Thank you for being you — wonderful, bright, and beautiful inside and out.
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-yellow-100 mb-3">Photo Gallery 📸</h2>
          <div className="grid grid-cols-3 gap-2">
            <img src="/photos/photo1.jpg" alt="1" className="rounded-xl" />
            <img src="/photos/photo2.jpg" alt="2" className="rounded-xl" />
            <img src="/photos/photo3.jpg" alt="3" className="rounded-xl" />
            <img src="/photos/photo4.jpg" alt="4" className="rounded-xl" />
            <img src="/photos/photo5.jpg" alt="5" className="rounded-xl" />
            <img src="/photos/photo6.jpg" alt="6" className="rounded-xl" />
          </div>
        </motion.div>

        {/* Wishes Form */}
        <motion.div
          className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:col-span-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-xl font-bold text-yellow-100 mb-3">Leave Your Wishes ✨</h2>
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="p-2 border rounded-md bg-white text-black" />
            <textarea placeholder="Write your message..." className="p-2 border rounded-md bg-white text-black"></textarea>
            <button type="submit" className="bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
