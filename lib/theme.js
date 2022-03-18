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
          color: 'purple.800',
        },
      },
      defaultProps: {
        variant: 'base',
      },
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
})

export default theme
