import PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <ChakraProvider>
      <Container>
        <Navigation />
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
