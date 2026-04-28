import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.{ts,tsx}",
  ],

  theme: {
    /* -----------------------------
     * BREAKPOINTS (media queries)
     * ----------------------------- */
    screens: {
      sm: "640px",   // mobile landscape
      md: "768px",   // tablet
      lg: "1024px",  // laptop
      xl: "1280px",  // desktop
      "2xl": "1400px", // large desktop (design width)
    },

    /* -----------------------------
     * CONTAINER (layout width)
     * ----------------------------- */
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
        sm: "640px",   // mobile landscape
        md: "768px",   // tablet
        lg: "900px",  // laptop
        xl: "1280px",  // desktop
      },
    },

    extend: {
      /* -----------------------------
       * FONTS
       * ----------------------------- */
      fontFamily: {
        sans: [
          "Inter",
          "Figtree",
          ...defaultTheme.fontFamily.sans,
        ],
      },

      /* -----------------------------
       * RESPONSIVE TYPOGRAPHY TOKENS
       * ----------------------------- */
      fontSize: {
        /* Body text */
        body: ["1rem", { lineHeight: "1.75rem" }],
        "body-lg": ["1.125rem", { lineHeight: "1.85rem" }],

        /* Headings */
        h1: ["clamp(2rem, 3vw, 2.5rem)", { lineHeight: "1.2" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.3" }],
        h3: ["1.5rem", { lineHeight: "2rem" }],

        /* Fluid (optional, advanced) */
        "fluid-sm": "clamp(0.875rem, 1vw, 1rem)",
        "fluid-lg": "clamp(2rem, 4vw, 3rem)",
      },

      /* -----------------------------
       * COLORS (your existing system)
       * ----------------------------- */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: "hsl(var(--accent-blue))",
          pink: "hsl(var(--accent-pink))",
          green: "hsl(var(--accent-green))",
          orange: "hsl(var(--accent-orange))",
          purple: "hsl(var(--accent-purple))",
          cyan: "hsl(var(--accent-cyan))",
        },

        footer: {
          DEFAULT: "hsl(var(--footer-bg))",
          foreground: "hsl(var(--footer-foreground))",
          muted: "hsl(var(--footer-muted))",
        },
      },

      /* -----------------------------
       * RADIUS
       * ----------------------------- */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* -----------------------------
       * ANIMATIONS
       * ----------------------------- */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },

  plugins: [
    forms,
    animate,
  ],
};

export default config;
