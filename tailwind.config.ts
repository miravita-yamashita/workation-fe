import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        coral: {
          "100": "#FFEFF1",
          "200": "#FFE0E5",
          "250": "#FFE1E6",
          "300": "#EF778C",
        },
        red: {
          "100": "#EB546D",
          "200": "#FF3052",
          "250": "#FF3153",
          "300": "#900B09",
          "350": "#BE2421",
        },
        blue: {
          "10": "#0000EE",
          "50": "#E0EFFF",
          "100": "#EBF5FF",
          "150": "#8DC4FF",
          "200": "#C0E2FF",
          "250": "#C8D6FF",
          "300": "#7598FF",
          "350": "#357DC9",
          "400": "#2A5B8F ",
        },
        green: {
          "100": "#DFF3C0",
          "150": "#E5FFDD",
          "200": "#98D936",
          "300": "#65DEAC",
          "400": "#06C755",
          "500": "#3CB37A",
        },
        yellow: {
          "100": "#FFF9D9",
          "200": "#F7D80A",
          "300": "#FFF600",
          "400": "#FFC58C",
          "500": "#FFF9DB",
        },
        orange: {
          "50": "#FFEBD8",
          "100": "#FFAB56",
          "200": "#FFA449",
        },
        pink: {
          "100": "#F59DDC",
          "200": "#EF788C",
        },
        purple: {
          "100": "#DCAFFF",
        },
        ivory: {
          "100": "#FFFCED",
        },
        dark: {
          "100": "#495057",
          "200": "#212529",
          "250": "#2C2C2C",
          "300": "#6C757D",
          "400": "#1E1E1E",
          "500": "#303030",
          "550": "#757575",
        },
        shade: {
          "10": "#EBEBEB",
          "50": "#F4F4F4",
          "100": "#F8F9FA",
          "150": "#F2F2F2",
          "200": "#F1F3F5",
          "210": "#F6F6F6",
          "250": "#E4E4E4",
          "300": "#CED4DA",
          "350": "#CCCCCC",
          "360": "#CECECE",
          "400": "#DEE2E6",
          "450": "#D4D4D4",
          "500": "#DCDFE2",
          "550": "#D9D9D9",
          "600": "#90979D",
          "650": "#4D4D4D",
          "700": "#9AA4AC",
          "800": "#666666",
          "850": "#838383",
          "900": "#AEAEAE",
          "910": "#ABABAB",
          "950": "#F9F9F9",
        },
      },
      spacing: {
        "1.5rem": "1.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        yugothic: ["var(--font-yu-gothic)"],
        albertsans: ["var(--font-albertsans)"],
        inter: ["var(--font-inter)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      leading: {
        normal: "normal",
      },
      textShadow: {
        white: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
