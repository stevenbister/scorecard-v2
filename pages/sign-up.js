import { useEffect } from 'react'
import Router from 'next/router'
import Auth from '../components/Auth'
import { useAuth } from '../lib/auth/useAuth'

const SignUp = () => {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      Router.push('/profile')
    }
  }, [user])

  return <Auth heading="Sign up" />
}

export default SignUp
