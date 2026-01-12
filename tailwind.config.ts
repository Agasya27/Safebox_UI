import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        safebox: {
          cream: "hsl(var(--safebox-cream))",
          green: "hsl(var(--safebox-green))",
          "green-light": "hsl(var(--safebox-green-light))",
          dark: "hsl(var(--safebox-dark))",
          sage: "hsl(var(--safebox-sage))",
          text: "hsl(var(--safebox-text))",
        },
        strength: {
          weak: "hsl(var(--strength-weak))",
          medium: "hsl(var(--strength-medium))",
          strong: "hsl(var(--strength-strong))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        subtle: "0 1px 2px 0 hsl(var(--foreground) / 0.04)",
        soft: "0 4px 6px -1px hsl(var(--foreground) / 0.06), 0 2px 4px -2px hsl(var(--foreground) / 0.04)",
        medium: "0 10px 15px -3px hsl(var(--foreground) / 0.08), 0 4px 6px -4px hsl(var(--foreground) / 0.04)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "border-wave": {
          "0%": { 
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)"
          },
          "50%": { 
            boxShadow: "0 0 0 4px hsl(var(--primary) / 0)"
          },
          "100%": { 
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0)"
          },
        },
        "border-wave-ghost": {
          "0%": { 
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0.25)"
          },
          "50%": { 
            boxShadow: "0 0 0 3px hsl(var(--primary) / 0)"
          },
          "100%": { 
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0)"
          },
        },
        "breathe-primary": {
          "0%, 100%": { 
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.92",
            transform: "scale(1.01)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "border-wave": "border-wave 5s ease-out infinite",
        "border-wave-ghost": "border-wave-ghost 5s ease-out infinite",
        "breathe-primary": "breathe-primary 4s ease-in-out infinite",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "18": "4.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
