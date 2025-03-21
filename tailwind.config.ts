import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tailwindcss-animate")], // ✅ Correct way to add plugins
};

export default withUt(config);
