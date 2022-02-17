import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isError, setIsError] = useState(false)
  const toast = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()

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

  return (
    <VStack align="stretch">
      <Text className="description">
        Sign in via magic link with your email below
      </Text>

      <form onSubmit={(e) => handleLogin(e)}>
        <VStack align="stretch">
          <FormControl isRequired isInvalid={isError}>
            <FormLabel htmlFor="email">Your email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {isError ? (
              <FormErrorMessage>Email is required</FormErrorMessage>
            ) : null}
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
