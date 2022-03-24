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
  Box,
} from '@chakra-ui/react'
import { useForm } from '../lib/forms/useForm'
import FormError from './FormError'

const Auth = ({ heading }) => {
  const [successMessage, setSuccessMessage] = useState('')
  const { signIn, error: authError, loading } = useAuth()

  const formFields = {
    email: {
      value: '',
      isRequired: true,
      pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      errorMessage: 'Email address is invalid',
    },
    password: {
      value: '',
      isRequired: true,
      pattern:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, //  Minimum six characters, at least one upper case English letter, one lower case English letter, one number and one special character.
      errorMessage:
        'Password must be at least six characters; contain one uppercase letter, one number and one special character',
    },
  }
  const { fields, handleChange, validateFields, error } = useForm(formFields)

  useEffect(() => {
    if (heading === 'Sign in') {
      setSuccessMessage('Check your email for your magic link to login')
    }

    if (heading === 'Sign up') {
      setSuccessMessage('Check your email for your link to complete sign up')
    }
  }, [heading])

  const handleLogin = async (e) => {
    const email = fields.email.value
    const password = fields.password.value

    e.preventDefault()

    const { isValid } = validateFields()

    isValid ? await signIn({ email, password, successMessage }) : null
  }

  return (
    <VStack align="stretch" py={28}>
      <Heading as="h1" align="center" size="3xl">
        {heading}
      </Heading>

      <Box pt={16}>
        <form onSubmit={(e) => handleLogin(e)} name="signInForm" noValidate>
          <VStack spacing={4} align="flex-start">
            <FormControl
              isRequired={formFields.email.isRequired}
              isInvalid={error.email}
            >
              <FormLabel htmlFor="email" data-testid="label">
                Your email
              </FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={fields.email.value}
                onChange={handleChange}
              />
              {error.email ? (
                <FormErrorMessage>{error.email}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl
              isRequired={formFields.password.isRequired}
              isInvalid={error.password}
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                name="password"
                value={fields.password.value}
                onChange={handleChange}
              />
              {error.password ? (
                <FormErrorMessage>{error.password}</FormErrorMessage>
              ) : null}
            </FormControl>

            {authError ? <FormError error={authError} /> : null}

            <Button type="submit" isLoading={loading}>
              {heading}
            </Button>
          </VStack>
        </form>
      </Box>

      {heading === 'Sign in' ? (
        <NextLink href="/resetPassword" passHref>
          <Link>Forgotten your password?</Link>
        </NextLink>
      ) : null}
    </VStack>
  )
}

export default Auth
