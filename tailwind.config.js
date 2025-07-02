/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Yellow/Gold color palette
        primary: {
          50: '#fffdf0',
          100: '#fffae1',
          200: '#fff4c4',
          300: '#ffea61', // rgba(255, 234, 97, 1)
          400: '#ffe030',
          500: '#ffd700',
          600: '#e6c200',
          700: '#ccad00',
          800: '#b39900',
          900: '#998500',
        },
        // Secondary Orange/Amber palette
        secondary: {
          50: '#fff8f0',
          100: '#ffedd1',
          200: '#ffdaa3',
          300: '#ffc875',
          400: '#ffb547',
          500: '#ff9500',
          600: '#e6860a',
          700: '#cc7914',
          800: '#b36b1e',
          900: '#995e28',
        },
        // Accent vibrant colors
        accent: {
          pink: '#ff6b9d',
          purple: '#a855f7',
          blue: '#3b82f6',
          green: '#10b981',
          red: '#ef4444',
          orange: '#f97316',
        },
        // Extended gradients
        gradient: {
          'sunset': 'linear-gradient(135deg, #ffea61 0%, #ff9500 50%, #ff6b9d 100%)',
          'sunrise': 'linear-gradient(135deg, #fff4c4 0%, #ffea61 50%, #ffd700 100%)',
          'golden': 'linear-gradient(135deg, #ffd700 0%, #ffea61 50%, #fff8f0 100%)',
          'vibrant': 'linear-gradient(135deg, #ff6b9d 0%, #a855f7 50%, #3b82f6 100%)',
          'warm': 'linear-gradient(135deg, #ff9500 0%, #ffea61 100%)',
          'cool': 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
        }
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-soft': 'bounce-soft 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '25%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right top'
          },
          '75%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'glow': {
          '0%': { 'box-shadow': '0 0 20px rgba(255, 234, 97, 0.5)' },
          '100%': { 'box-shadow': '0 0 30px rgba(255, 234, 97, 0.8), 0 0 40px rgba(255, 149, 0, 0.6)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-10%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 rgba(255, 234, 97, 0.7)'
          },
          '50%': { 
            opacity: 0.8,
            transform: 'scale(1.05)',
            'box-shadow': '0 0 0 10px rgba(255, 234, 97, 0)'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-sunset': 'linear-gradient(135deg, #ffea61 0%, #ff9500 50%, #ff6b9d 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #fff4c4 0%, #ffea61 50%, #ffd700 100%)',
        'gradient-golden': 'linear-gradient(135deg, #ffd700 0%, #ffea61 50%, #fff8f0 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #ff6b9d 0%, #a855f7 50%, #3b82f6 100%)',
        'gradient-warm': 'linear-gradient(135deg, #ff9500 0%, #ffea61 100%)',
        'gradient-cool': 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, #ffea61 0px, transparent 50%), radial-gradient(at 80% 0%, #ff9500 0px, transparent 50%), radial-gradient(at 0% 50%, #ff6b9d 0px, transparent 50%), radial-gradient(at 80% 50%, #a855f7 0px, transparent 50%), radial-gradient(at 0% 100%, #3b82f6 0px, transparent 50%), radial-gradient(at 80% 100%, #10b981 0px, transparent 50%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 234, 97, 0.5)',
        'glow-lg': '0 0 30px rgba(255, 234, 97, 0.6), 0 0 60px rgba(255, 149, 0, 0.4)',
        'glow-xl': '0 0 40px rgba(255, 234, 97, 0.8), 0 0 80px rgba(255, 149, 0, 0.6)',
        'neon': '0 0 5px rgba(255, 234, 97, 1), 0 0 10px rgba(255, 234, 97, 1), 0 0 15px rgba(255, 234, 97, 1), 0 0 20px rgba(255, 234, 97, 1)',
        'warm': '0 10px 25px -3px rgba(255, 149, 0, 0.1), 0 4px 6px -2px rgba(255, 234, 97, 0.05)',
        'colored': '0 10px 15px -3px rgba(255, 234, 97, 0.1), 0 4px 6px -2px rgba(255, 149, 0, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.bg-mesh': {
          'background-image': 'radial-gradient(at 40% 20%, #ffea61 0px, transparent 50%), radial-gradient(at 80% 0%, #ff9500 0px, transparent 50%), radial-gradient(at 0% 50%, #ff6b9d 0px, transparent 50%), radial-gradient(at 80% 50%, #a855f7 0px, transparent 50%), radial-gradient(at 0% 100%, #3b82f6 0px, transparent 50%), radial-gradient(at 80% 100%, #10b981 0px, transparent 50%)',
        },
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #ffea61, #ff9500)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-sunset': {
          'background': 'linear-gradient(135deg, #ffea61 0%, #ff9500 50%, #ff6b9d 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-vibrant': {
          'background': 'linear-gradient(135deg, #ff6b9d 0%, #a855f7 50%, #3b82f6 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-warm': {
          'background': 'rgba(255, 234, 97, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 234, 97, 0.2)',
        },
        '.btn-gradient': {
          'background': 'linear-gradient(135deg, #ffea61 0%, #ff9500 100%)',
          'color': '#ffffff',
          'border': 'none',
          'transition': 'all 0.3s ease',
        },
        '.btn-gradient:hover': {
          'background': 'linear-gradient(135deg, #ffd700 0%, #ff8500 100%)',
          'transform': 'translateY(-2px)',
          'box-shadow': '0 10px 20px rgba(255, 149, 0, 0.3)',
        },
        '.card-gradient': {
          'background': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 244, 196, 0.8) 100%)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 234, 97, 0.2)',
        },
        '.shimmer': {
          'position': 'relative',
          'overflow': 'hidden',
        },
        '.shimmer::after': {
          'content': '""',
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'width': '100%',
          'height': '100%',
          'background': 'linear-gradient(90deg, transparent, rgba(255, 234, 97, 0.4), transparent)',
          'transform': 'translateX(-100%)',
          'animation': 'shimmer 2.5s linear infinite',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}