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
                background: "#09090b", // Slightly darker than #0a0a0a
                foreground: "#ededed",
                card: {
                    DEFAULT: "#111111",
                    foreground: "#ededed",
                    hover: "#1a1a1a",
                },
                border: {
                    DEFAULT: "#27272a",
                    hover: "#3f3f46",
                },
                primary: {
                    DEFAULT: "#ededed",
                    foreground: "#09090b",
                },
                secondary: "#a1a1aa",
                muted: "#52525b",
                accent: {
                    green: "#10b981",
                    red: "#ef4444",
                    yellow: "#eab308",
                },
                virtualCurve: "#6366f1",
                backgroundSecondary: "#18181b",
                textPrimary: "#ffffff",
                textSecondary: "#a1a1aa",
                textTertiary: "#71717a",
                primaryBlueHover: "#3b82f6",
                primaryGreen: "#10b981",
                primaryRed: "#ef4444",
                primaryStroke: "#27272a",
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
