import { useState } from 'react'
import useAuth from '../lib/auth/useAuth'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [isError, setIsError] = useState(false)
  const { signIn, loading } = useAuth()

  // TODO: Handle form verification
  const handleLogin = async (e) => {
    e.preventDefault()

    signIn({ email })
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
