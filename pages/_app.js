import { AuthProvider } from '../lib/auth/AuthContext'
import { GameProvider } from '../lib/game/GameContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <AuthProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </AuthProvider>
    </Layout>
  )
}

export default MyApp
