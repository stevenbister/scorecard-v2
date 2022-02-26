import { useState } from 'react'
import { useAuth } from '../lib/auth/useAuth'
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
  const [errorMessage, setErrorMessage] = useState('')
  const { signIn, loading } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()

    const input = e.target.elements.email
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    if (input.value.length === 0) {
      setIsError(true)
      setErrorMessage('Email is required')
    } else if (emailRegex.test(input.value) === false) {
      setIsError(true)
      setErrorMessage('Email is not valid')
    } else {
      setIsError(false)
      await signIn({ email })
    }
  }

  return (
    <VStack align="stretch">
      <Text className="description">
        Sign in via magic link with your email below
      </Text>

      <form onSubmit={(e) => handleLogin(e)} name="signInForm" noValidate>
        <VStack align="stretch">
          <FormControl isRequired isInvalid={isError}>
            <FormLabel htmlFor="email" data-testid="label">
              Your email
            </FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {isError ? (
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
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
