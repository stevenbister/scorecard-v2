import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { supabase } from '../../utils/supabaseClient'

const useProfile = (user) => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext.Provider')
  }

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  /**
   * Gets our profile from the supabase database and returns a promise
   * with an object containing our username and the email address
   * associated with the user
   *
   * @returns {promise} { email:, username }
   */
  const getProfile = async () => {
    try {
      let { data: profile, error } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (error) throw error

      return {
        email: user.email, // email address is stored in the user table rather than profiles
        username: profile.username,
      }
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  /**
   * POSTS an update to the profiles table in supabase
   */
  const updateProfile = async () => {
    try {
      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) console.error(error)
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  // Run this once when the component renders
  useEffect(() => {
    getProfile().then((res) => {
      setEmail(res?.email)
      setUsername(res?.username)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { email, username, setUsername, error, updateProfile }
}

export { useProfile }
