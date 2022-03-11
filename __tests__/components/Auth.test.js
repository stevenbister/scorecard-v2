import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from '../../components/Auth'
import { AuthProvider } from '../../lib/auth/AuthContext'
import * as hooks from '../../lib/auth/useAuth'

test('Shows an error message if the email address or the password input is empty', async () => {
  render(
    <AuthProvider>
      <Auth />
    </AuthProvider>,
  )

  const form = screen.getByRole('form')
  fireEvent.submit(form)

  await screen.findByText(/email is required/i)
  await screen.findByText(/password is required/i)
})

test('Shows an error message if the email address is invalid', async () => {
  render(
    <AuthProvider>
      <Auth />
    </AuthProvider>,
  )

  const form = screen.getByRole('form')
  const input = screen.getByLabelText(/your email/i)

  userEvent.type(input, 'notanemail')
  fireEvent.submit(form)

  await screen.findByText(/email is not valid/i)
})

test('Shows an error message if the password is invalid', async () => {
  render(
    <AuthProvider>
      <Auth />
    </AuthProvider>,
  )

  const form = screen.getByRole('form')
  const input = screen.getByLabelText(/password/i)

  userEvent.type(input, 'password1')
  fireEvent.submit(form)

  await screen.findByText(
    'Password must be at least six characters; contain one uppercase letter, one number and one special character',
  )
})

test('Successfully submits the form', async () => {
  const spy = jest.spyOn(hooks, 'useAuth').mockImplementation(() => {
    return {
      signIn: jest.fn(),
    }
  })

  render(
    <AuthProvider>
      <Auth />
    </AuthProvider>,
  )

  const form = screen.getByRole('form')
  const emailInput = screen.getByLabelText(/your email/i)
  const passwordInput = screen.getByLabelText(/password/i)

  userEvent.type(emailInput, 'test@test.com')
  userEvent.type(passwordInput, 'EU9nwH8V%f&#')
  fireEvent.submit(form)

  // it'll wait until the mock function has been called.
  await waitFor(() => expect(spy).toHaveBeenCalled())
})
