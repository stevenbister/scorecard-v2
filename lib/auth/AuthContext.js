import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user())
  const [loading, setLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [loggedIn, setLoggedin] = useState(false)
  const [event, setEvent] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const toast = useToast()

  useEffect(() => {
    // when the component loads, checks user to show or hide Sign In link
    if (user) {
      setUser(user)
      setUserLoading(false)
      setLoggedin(true)
    } else {
      setUserLoading(false)
    }

    // fires when a user signs in or out
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null

        setUserLoading(false)

        handleAuthChange(event, session)
        setEvent(event)

        if (user) {
          setUser(user)
          setLoggedin(true)
        } else {
          setUser(null)
          Router.push('/')
        }
      },
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [user])

  /**
   * handleAuthChange
   *
   * Watches for an auth change and pushes data to our auth api route
   *
   * @param {*} event
   * @param {*} session
   */
  async function handleAuthChange(event, session) {
    // sets and removes the Supabase cookie
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  /**
   * signIn
   *
   * Signs our user into our app / signs up new user
   *
   * @param {Object} email
   */
  const signIn = async ({ email, password }) => {
    try {
      setLoading(true)

      const { error } = await supabase.auth.signIn({ email, password })

      if (error) throw error

      setError('')
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * signOut
   *
   * Signs the current user out of our app
   */
  const signOut = async () => await supabase.auth.signOut()

  /**
   * sendResetPasswordLink
   *
   * Resets users password
   *
   * @param {string} email
   */
  const sendResetPasswordLink = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetPassword`,
      })

      if (error) throw error

      setError('')
      setMessage('Check your email for the reset link')
    } catch (error) {
      console.error(error)
      setError(error.message)
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  const updateUserPassword = async (newPassword) => {
    try {
      setLoading(true)

      const { user, error } = await supabase.auth.update({
        password: newPassword,
      })

      if (error) throw error

      Router.push('/profile')
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: error.error_description || error.message,
        status: 'error',
        duration: null,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        event,
        signIn,
        signOut,
        sendResetPasswordLink,
        updateUserPassword,
        loading,
        userLoading,
        loggedIn,
        error,
        message,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
