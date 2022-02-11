import PropTypes from 'prop-types'
import Auth from './Auth'
import Navigation from './Navigation'

const Layout = ({ children, userSession }) => {
  return (
    <>
      <Navigation />
      {userSession ? <main>{children}</main> : <Auth />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  userSession: PropTypes.object,
}

export default Layout
