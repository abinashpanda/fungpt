import { ConfigProvider } from 'antd'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

type ThemeConfig = React.ComponentProps<typeof ConfigProvider>['theme']

export const ANTD_THEME: ThemeConfig = {
  token: {
    fontFamily: ['Inter', ...defaultTheme.fontFamily.sans].join(', '),
    colorText: colors.zinc['700'],
    colorTextSecondary: colors.zinc['500'],
    colorPrimary: colors.blue['500'],
    colorBgLayout: colors.gray['50'],
    colorError: colors.red['500'],
    colorWarning: colors.yellow['600'],
    colorSuccess: colors.green['600'],
    controlHeight: 36,
    borderRadius: 4,
  },
  components: {
    Form: {
      fontSize: 14,
      margin: 32,
    },
  },
}
