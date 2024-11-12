import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myblue: "#06bdc5",
        myred: "#f9423a",
      },
      fontFamily: {
        avenirBlack: "var(--font-avenir-black)",
        avenirRegular: "var(--font-avenir-regular)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
    logs: true,
  },
};

export default config;
