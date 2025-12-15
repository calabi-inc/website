/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Geist', 'sans-serif'],
                heading: ['Manrope', 'sans-serif'],
                mono: ['Geist Mono', 'monospace'],
            },
            animation: {
                'float': 'subtle-float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 1.5s ease-out forwards',
            },
            keyframes: {
                'subtle-float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            }
        },
    },
    plugins: [],
}
