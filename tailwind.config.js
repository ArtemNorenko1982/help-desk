/** @type {import('tailwindcss').Config} */
module.export = {
  content: ['.apps/**/src/**/*.{html,ts}', './libs/**/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          primaryHover: '#1D4ED8',
          primarySubtle: '#EFF6FF',
          secondary: '#14B8A6',
          secondaryHover: '#0D9488',
          secondarySubtle: '#ECFEFF',
        },
        ui: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          surfaceAlt: '#F1F5F9',
          border: '#E2E8F0',
          text: '#0F172A',
          text2: '#475569',
          muted: '#64748B',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#38BDF8',
        },
        chart: {
          1: '#2563EB',
          2: '#14B8A6',
          3: '#F59E0B',
          4: '#EF4444',
          5: '#8B5CF6',
          6: '#64748B',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
    },
  },
  plugins: [],
};
