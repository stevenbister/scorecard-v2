import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return <Component {...pageProps} userSession={session} />
}

export default MyApp
