"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-8 px-6 text-center">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo or Brand Name */}
                <h2 className="text-xl font-bold text-white">&#60;SM/&#62;</h2>
            </div>

            {/* Copyright */}
            <p className="mt-6 text-gray-400 text-sm">© {new Date().getFullYear()} &#60;SM/&#62;. All rights reserved.</p>
        </footer>
    );
}
