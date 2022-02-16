import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack align="stretch">
      <p className="description">
        Sign in via magic link with your email below
      </p>

      <form onSubmit={(e) => handleLogin(e)}>
        <VStack align="stretch">
          <FormControl>
            <FormLabel htmlFor="email">Your email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Button type="submit" isLoading={loading}>
            Send magic link
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default Auth
