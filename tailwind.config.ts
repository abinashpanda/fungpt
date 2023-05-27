import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,

        primary: colors.blue['500'],
        error: colors.red['500'],
        success: colors.green['600'],
        warning: colors.amber['300'],

        content: {
          primary: colors.zinc['700'],
          secondary: colors.zinc['500'],
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config
