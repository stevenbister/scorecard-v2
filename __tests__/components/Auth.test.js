import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from '../../components/Auth'
import { AuthProvider } from '../../lib/auth/AuthContext'
import * as hooks from '../../lib/auth/useAuth'

test('Renders the auth form', () => {
  /*
  <Auth /> is dependent on the useAuth() hook which uses our authContext. Therefore we need to wrap our component in our provider so we can access the conext
  */
  render(
    <AuthProvider>
      <Auth />
    </AuthProvider>,
  )

  expect(screen.getByRole('form')).toBeInTheDocument()
  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
  expect(screen.getByTestId('label')).toHaveTextContent(/your email\*/i)
  expect(
    screen.getByRole('button', {
      name: /send magic link/i,
    }),
  ).toBeInTheDocument()
})

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
