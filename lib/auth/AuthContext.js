import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [loggedIn, setLoggedin] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const user = supabase.auth.user()

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

        if (user) {
          setUser(user)
          setLoggedin(true)
          Router.push('/')
        } else {
          setUser(null)
          Router.push('/sign-in')
        }
      },
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

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
  const signIn = async ({ email }) => {
    try {
      setLoading(true)

      const { error } = await supabase.auth.signIn({ email })

      if (error) throw error

      toast({
        title: 'Success!',
        description: 'Check your email for the login link!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      setIsError(true)

      toast({
        title: 'Something went wrong!',
        description: error.error_description || error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
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

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
        userLoading,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
