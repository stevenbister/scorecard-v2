import PropTypes from 'prop-types'
import { ChakraProvider } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import Auth from './Auth'
import Navigation from './Navigation'

const Layout = ({ children, userSession }) => {
  return (
    <ChakraProvider>
      <Container>
        <Navigation />
        {userSession ? <main>{children}</main> : <Auth />}
      </Container>
    </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  userSession: PropTypes.object,
}

export default Layout
