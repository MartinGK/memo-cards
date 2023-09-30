import type { Config } from "tailwindcss";
import { shrinkAnimation, anvilAnimation } from "./styles/keyframes";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      "no-scrollbar": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none"
      },
      keyframes: {
        shrinkAnimation: shrinkAnimation(),
        anvil: anvilAnimation()
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
};

export default config;
