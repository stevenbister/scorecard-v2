import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return (
    <Layout userSession={session}>
      <Component {...pageProps} userSession={session} />
    </Layout>
  )
}

export default MyApp
