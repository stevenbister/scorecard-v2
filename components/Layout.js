import PropTypes from 'prop-types'
import { ChakraProvider, Container } from '@chakra-ui/react'
import theme from '../lib/theme'
import Navigation from './Navigation'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/800.css'

const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Navigation />
      <Container>
        <main>{children}</main>
      </Container>
    </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  userSession: PropTypes.object,
}

export default Layout
