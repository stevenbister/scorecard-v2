import Auth from "./Auth"

const Layout = ({ children, userSession }) => {
  return (
    <>
    {userSession ? <main>{children}</main> : <Auth />}
    </>
  )
}

export default Layout