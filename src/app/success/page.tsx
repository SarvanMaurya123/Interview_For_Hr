'use client'
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Success() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 relative overflow-hidden">
            {/* 🎉 Animated Celebration Icons Floating in Background */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                    animate={{ scale: 1, opacity: 1, y: [Math.random() * 50, -Math.random() * window.innerHeight] }}
                    transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute text-yellow-400 opacity-50 text-4xl  left-24"
                >
                    🎉
                </motion.div>
            ))}

            <Card className="max-w-[500px] w-full mx-auto bg-white shadow-xl rounded-3xl p-8 relative z-10">
                <CardContent className="flex flex-col items-center text-center space-y-6">
                    {/* 🎉 Main Animated Celebration Icon */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                        className="text-6xl"
                    >
                        <CheckCircle className="size-24 text-green-600 drop-shadow-md" />
                    </motion.div>

                    {/* 🎉 Success Message */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-2xl font-bold text-gray-800"
                    >
                        🎉 Booking Confirmed!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="text-gray-600"
                    >
                        Your meeting has been successfully scheduled. <br />
                        Check your email for details. 📅
                    </motion.p>

                    {/* 🎉 Animated Button */}
                    <motion.a
                        href="/dashboard"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow-md transition-all"
                    >
                        Back Now
                    </motion.a>
                </CardContent>
            </Card>
        </div>
    );
}