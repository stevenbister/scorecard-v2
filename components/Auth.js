import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth/useAuth'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'

const Auth = ({ heading }) => {
  const [email, setEmail] = useState('')
  const [emailIsError, setEmailIsError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordIsError, setPasswordIsError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { signIn, loading } = useAuth()

  useEffect(() => {
    if (heading === 'Sign in') {
      setSuccessMessage('Check your email for your magic link to login')
    }

    if (heading === 'Sign up') {
      setSuccessMessage('Check your email for your link to complete sign up')
    }
  }, [heading])

  const validateEmail = (email) => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    if (email.length === 0) {
      setEmailIsError(true)
      setEmailErrorMessage('Email is required')
    } else if (emailRegex.test(email) === false) {
      setEmailIsError(true)
      setEmailErrorMessage('Email is not valid')
    } else {
      setEmailIsError(false)
    }
  }

  const validatePassword = (password) => {
    //  Minimum six characters, at least one upper case English letter, one lower case English letter, one number and one special character.
    const pwRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/

    if (password.length === 0) {
      setPasswordIsError(true)
      setPasswordErrorMessage('Password is required')
    } else if (pwRegex.test(password) === false) {
      setPasswordIsError(true)
      setPasswordErrorMessage(
        'Password must be at least six characters; contain one uppercase letter, one number and one special character',
      )
    } else {
      setPasswordIsError(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    validateEmail(email)
    validatePassword(password)

    if (emailIsError === false && passwordIsError == false) {
      await signIn({ email, password, successMessage })
    }
  }

  return (
    <VStack align="stretch">
      <Heading as="h1">{heading}</Heading>

      <form onSubmit={(e) => handleLogin(e)} name="signInForm" noValidate>
        <VStack align="stretch">
          <FormControl isRequired isInvalid={emailIsError}>
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

            {emailIsError ? (
              <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isRequired isInvalid={passwordIsError}>
            <FormLabel htmlFor="password">Password</FormLabel>

            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {passwordIsError ? (
              <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
            ) : null}
          </FormControl>

          <Button type="submit" isLoading={loading}>
            {heading}
          </Button>
        </VStack>
      </form>

      {heading === 'Sign in' ? (
        <NextLink href="/resetPassword" passHref>
          <Link>Forgotten your password?</Link>
        </NextLink>
      ) : null}
    </VStack>
  )
}

export default Auth
