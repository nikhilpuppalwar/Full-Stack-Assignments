"use client";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function LandingPage() {
    const handleGetStarted = () => {
        window.location.href = "/portfolio";
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Spline 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Spline scene="https://prod.spline.design/Aj5R8QQzOQcCcrCB/scene.splinecode" />
            </div>

            {/* Get Started Button - Bottom */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute bottom-12 left-0 right-0 z-20 flex items-center justify-center pointer-events-none"
            >
                <motion.button
                    onClick={handleGetStarted}
                    className="pointer-events-auto group relative px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full text-white font-bold text-xl shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />

                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                            x: ["-200%", "200%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />

                    {/* Button text */}
                    <span className="relative z-10 flex items-center space-x-3">
                        <span>Get Started</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </span>
                </motion.button>
            </motion.div>

            {/* Optional: Brand name at top */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <span className="text-white font-bold text-lg">NP</span>
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-white font-semibold text-lg leading-tight">
                            Nikhil Puppalwar
                        </span>
                        <span className="text-gray-400 text-sm">Developer Portfolio</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
