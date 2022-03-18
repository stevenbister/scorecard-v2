import { AuthProvider } from '../lib/auth/AuthContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Layout>
  )
}

export default MyApp
