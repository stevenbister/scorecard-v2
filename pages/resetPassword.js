import { useState } from 'react'
import { useAuth } from '../lib/auth/useAuth'
import { useForm } from '../lib/forms/useForm'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import FormError from '../components/FormError'
import FormSuccess from '../components/FormSuccess'

const ResetPassword = () => {
  const {
    sendResetPasswordLink,
    updateUserPassword,
    event,
    message,
    error: authError,
    loading,
  } = useAuth()

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

  const handleSubmit = (e) => {
    e.preventDefault()

    const { isValid } = validateFields()

    if (event === 'PASSWORD_RECOVERY') {
      isValid ? null : updateUserPassword(password)
    } else {
      isValid ? null : sendResetPasswordLink(email)
    }
  }

  return (
    <VStack align="stretch">
      <Heading as="h1">Reset your password</Heading>

      <form onSubmit={(e) => handleSubmit(e)} name="resetPassword" noValidate>
        <VStack align="stretch">
          {event !== 'PASSWORD_RECOVERY' ? (
            <FormControl isRequired isInvalid={error.email}>
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
          ) : null}

          {event === 'PASSWORD_RECOVERY' ? (
            <FormControl isRequired isInvalid={error.password}>
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
          ) : null}

          {authError ? <FormError error={authError} /> : null}
          {message ? <FormSuccess message={message} /> : null}

          <Button type="submit" isLoading={loading}>
            {event === 'PASSWORD_RECOVERY'
              ? 'Update my password'
              : 'Send reset link'}
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default ResetPassword
