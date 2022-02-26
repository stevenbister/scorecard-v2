import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from '../../components/Auth'
import { AuthProvider } from '../../lib/auth/AuthContext'
import * as hooks from '../../lib/auth/useAuth'

test('Shows an error message if the email address is empty', async () => {
  render(
    <AuthProvider>
      <Auth />
    </AuthProvider>,
  )

  const form = screen.getByRole('form')
  fireEvent.submit(form)

  await screen.findByText(/email is required/i)
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
  const input = screen.getByLabelText(/your email/i)

  userEvent.type(input, 'test@test.com')
  fireEvent.submit(form)

  // it'll wait until the mock function has been called.
  await waitFor(() => expect(spy).toHaveBeenCalled())
})
