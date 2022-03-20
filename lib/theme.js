import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'purple.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        background: 'purple.800',
        color: 'white',
        borderRadius: 0,
      },
      variants: {
        base: {},
        outline: {
          background: 'transparent',
          borderColor: 'purple.800',
          color: 'purple.800',
        },
      },
      defaultProps: {
        variant: 'base',
      },
    },
    FormLabel: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      sizes: {
        '3xl': {
          fontSize: '3xl',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderColor: 'purple.800',
          borderWidth: 1,
        },
      },
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
})

export default theme
