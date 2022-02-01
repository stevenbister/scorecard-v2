import Auth from "./Auth"
import Navigation from "./Navigation"

const Layout = ({ children, userSession }) => {
  return (
    <>
    <Navigation />
    {userSession ? <main>{children}</main> : <Auth />}
    </>
  )
}

export default Layout