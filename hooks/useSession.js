import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const useSession = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    /**
     * ? Set the session directly within the hook.
     * ? I wonder if this would be better handled if we pass the session token
     * ? into the hook each time we call it?
     */
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return session
}

export default useSession