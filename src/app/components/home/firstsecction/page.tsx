"use client";

import { motion } from "framer-motion";

export default function FirstSection() {
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
                    Manage Your <span className="text-pink-500">Meetings</span> Effortlessly
                </h1>
                <p className="text-lg text-gray-300 mt-4">
                    Simplify your workflow with a seamless scheduling experience. Stay organized and productive with intuitive tools designed for efficiency.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-pink-600 rounded-xl shadow-lg hover:bg-pink-700 transition"
                >
                    Get Started
                </motion.button>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-6 max-w-5xl"
            >
                <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white transition transform hover:scale-105 hover:border hover:border-pink-500">
                    <h3 className="text-xl font-semibold">Easy Scheduling</h3>
                    <p className="text-gray-400 mt-2">Schedule meetings effortlessly with an intuitive calendar system.</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white transition transform hover:scale-105 hover:border hover:border-pink-500">
                    <h3 className="text-xl font-semibold">Real-time Reminders</h3>
                    <p className="text-gray-400 mt-2">Never miss a meeting with automated notifications and reminders.</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl shadow-md text-white transition transform hover:scale-105 hover:border hover:border-pink-500">
                    <h3 className="text-xl font-semibold">Collaborative Tools</h3>
                    <p className="text-gray-400 mt-2">Seamlessly integrate with your team for effective collaboration.</p>
                </div>
            </motion.div>

            {/* Bottom Image */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="relative z-10 mt-16"
            >
                <div className="flex justify-center items-center">
                    <motion.img
                        src="/Dashboard.png"
                        alt="Dashboard"
                        className="object-cover opacity-90 rounded-2xl shadow-lg transition transform hover:scale-105 hover:border-4 hover:border-pink-500 mb-4"
                        width={1200}
                        height={600}
                    />
                </div>
            </motion.div>
        </section>
    );
}