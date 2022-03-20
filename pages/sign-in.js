import { useEffect } from 'react'
import Router from 'next/router'
import Auth from '../components/Auth'
import { useAuth } from '../lib/auth/useAuth'

const SignIn = () => {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      Router.push('/')
    }
  }, [user])
  return <Auth heading="Sign in" />
}

export default SignIn
