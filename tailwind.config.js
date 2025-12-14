/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Indigo moderne
        secondary: '#EC4899', // Rose vibrant
        accent: '#10B981', // Vert success
        dark: '#1F2937',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg-colored': '0 10px 25px -5px rgba(99, 102, 241, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
      }
    },
  },
  plugins: [],
}
