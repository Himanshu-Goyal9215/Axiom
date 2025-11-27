/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                card: {
                    DEFAULT: "rgb(var(--card) / <alpha-value>)",
                    foreground: "rgb(var(--card-foreground) / <alpha-value>)",
                    hover: "rgb(var(--card-hover) / <alpha-value>)",
                },
                border: {
                    DEFAULT: "rgb(var(--border) / <alpha-value>)",
                    hover: "rgb(var(--border-hover) / <alpha-value>)",
                },
                primary: {
                    DEFAULT: "rgb(var(--primary) / <alpha-value>)",
                    foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
                },
                secondary: "rgb(var(--secondary) / <alpha-value>)",
                muted: "rgb(var(--muted) / <alpha-value>)",
                accent: {
                    green: "rgb(var(--accent-green) / <alpha-value>)",
                    red: "rgb(var(--accent-red) / <alpha-value>)",
                    yellow: "rgb(var(--accent-yellow) / <alpha-value>)",
                },
                virtualCurve: "#6366f1", // Placeholder for virtual curve color
                backgroundSecondary: "#1a1d20",
                textPrimary: "#ffffff",
                textSecondary: "#a1a1aa",
                textTertiary: "#71717a",
                primaryBlueHover: "#3b82f6",
                primaryGreen: "#10b981",
                primaryRed: "#ef4444",
                primaryStroke: "#3f3f46",
                primaryYellow: "#eab308",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            spacing: {
                '18': '4.5rem',
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
            },
            fontWeight: {
                medium: '500',
                semibold: '600',
            },
        },
    },
    plugins: [],
};
