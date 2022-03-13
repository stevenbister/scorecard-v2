import { useState } from 'react'
import { useAuth } from '../lib/auth/useAuth'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [emailIsError, setEmailIsError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordIsError, setPasswordIsError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const { sendResetPasswordLink, updateUserPassword, event, loading } =
    useAuth()

  // TODO: Repeating this -- turn into a util
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

  const handleSubmit = (e) => {
    e.preventDefault()

    validateEmail(email)
    validatePassword(password)

    if (event === 'PASSWORD_RECOVERY') {
      passwordIsError ? null : updateUserPassword(password)
    } else {
      emailIsError ? null : sendResetPasswordLink(email)
    }
  }

  return (
    <VStack align="stretch">
      <Heading as="h1">Reset your password</Heading>

      <form onSubmit={(e) => handleSubmit(e)} name="resetPassword" noValidate>
        <VStack align="stretch">
          {event !== 'PASSWORD_RECOVERY' ? (
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
          ) : null}

          {event === 'PASSWORD_RECOVERY' ? (
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
          ) : null}

          <Button type="submit" isLoading={loading}>
            Send reset link
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default ResetPassword
