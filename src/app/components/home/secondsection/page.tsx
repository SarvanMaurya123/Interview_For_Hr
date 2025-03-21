"use client";

import { motion } from "framer-motion";

export default function SecondSection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-lg z-0"></div>

            {/* Centered Content */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 px-6 max-w-3xl mx-auto mt-20"
            >
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                    Track Your <span className="text-pink-500">Progress</span> Seamlessly
                </h1>
                <p className="text-lg text-gray-300 mt-4">
                    Stay on top of your goals with real-time analytics and insights, designed to boost your productivity.
                </p>

            </motion.div>

            {/* Key Metrics Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-6 max-w-5xl"
            >
                <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white transition transform hover:scale-105 hover:border hover:border-pink-500">
                    <h3 className="text-xl font-semibold">Real-time Analytics</h3>
                    <p className="text-gray-400 mt-2">Monitor your progress with up-to-date performance metrics.</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white transition transform hover:scale-105 hover:border hover:border-pink-500">
                    <h3 className="text-xl font-semibold">Custom Reports</h3>
                    <p className="text-gray-400 mt-2">Generate detailed reports to analyze trends and make informed decisions.</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white transition transform hover:scale-105 hover:border hover:border-pink-500">
                    <h3 className="text-xl font-semibold">Automated Insights</h3>
                    <p className="text-gray-400 mt-2">Get Availability insights to optimize your productivity.</p>
                </div>
            </motion.div>

            {/* Bottom Image */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="relative z-10 mt-16 mb-16"
            >
                <div className="flex justify-center items-center">
                    <motion.img
                        src="./Availability.png"
                        alt="Availability Dashboard"
                        className="object-cover opacity-90 rounded-2xl shadow-lg transition transform hover:scale-105 hover:border-4 hover:border-pink-600"
                        width={1200}
                        height={600}
                    />
                </div>
            </motion.div>
        </section>
    );
}