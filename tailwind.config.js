/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                stone: {
                    950: '#0c0a09', // Canvas
                    900: '#1c1917', // Surface
                    850: '#23201e', // Slightly lighter surface
                    50: '#fafaf9', // Text Primary
                    400: '#a8a29e', // Text Secondary
                },
                sand: {
                    500: '#d4a574',
                    600: '#b8956f',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'sand-gradient': 'linear-gradient(135deg, #d4a574 0%, #b8956f 100%)',
                'glass-gradient': 'linear-gradient(145deg, rgba(28, 25, 23, 0.85) 0%, rgba(12, 10, 9, 0.95) 100%)',
            },
            boxShadow: {
                'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
                'glow-sand': '0 0 15px rgba(212, 165, 116, 0.15)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
