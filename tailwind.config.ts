import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Supports class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "#f3f4f6", // Example light-gray-like color,
        // muted: {
        //   // DEFAULT: "hsl(var(--muted, 220, 14%, 96%))", // Fallback for missing variables
        //   // foreground: "hsl(var(--muted-foreground, 220, 14%, 20%))",
        // },
        primary: {
          DEFAULT: "hsl(var(--primary, 240, 80%, 60%))",
          foreground: "hsl(var(--primary-foreground, 240, 80%, 90%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 200, 60%, 50%))",
          foreground: "hsl(var(--secondary-foreground, 200, 60%, 90%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 70%, 60%))",
          foreground: "hsl(var(--destructive-foreground, 0, 70%, 90%))",
        },
        border: "hsl(var(--border, 220, 14%, 75%))",
        input: "hsl(var(--input, 220, 14%, 88%))",
        ring: "hsl(var(--ring, 240, 60%, 70%))",
      },
      borderRadius: {
        lg: "var(--radius, 12px)",
        md: "calc(var(--radius, 12px) - 2px)",
        sm: "calc(var(--radius, 12px) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
