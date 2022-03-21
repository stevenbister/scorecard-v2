import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../../lib/auth/AuthContext'
import Home from '../../pages/index'
import SignIn from '../../pages/sign-in'
import SignUp from '../../pages/sign-up'
import Auth from '../../components/Auth'
import * as mockUseAuth from '../../lib/auth/useAuth'

test('Renders sign in / sign up button on the homepage', () => {
  render(
    <AuthProvider>
      <Home />
    </AuthProvider>,
  )

  expect(
    screen.getByRole('heading', {
      name: /scorecard/i,
    }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole('link', {
      name: /sign in/i,
    }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole('link', {
      name: /sign up/i,
    }),
  ).toBeInTheDocument()
})

test('Renders the sign in form', () => {
  render(
    <AuthProvider>
      <SignIn />
    </AuthProvider>,
  )

  expect(
    screen.getByRole('heading', {
      name: /sign in/i,
    }),
  ).toBeInTheDocument()

  expect(screen.getByRole('form')).toBeInTheDocument()

  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
  expect(screen.getByTestId('label')).toHaveTextContent(/your email\*/i)
  expect(
    screen.getByRole('button', {
      name: /sign in/i,
    }),
  ).toBeInTheDocument()
})

test('Renders the sign up form', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>,
  )

  expect(
    screen.getByRole('heading', {
      name: /sign up/i,
    }),
  ).toBeInTheDocument()

  expect(screen.getByRole('form')).toBeInTheDocument()

  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
  expect(screen.getByTestId('label')).toHaveTextContent(/your email\*/i)
  expect(
    screen.getByRole('button', {
      name: /sign up/i,
    }),
  ).toBeInTheDocument()
})

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

  await screen.findByText(/email address is invalid/i)
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
  const spy = jest.spyOn(mockUseAuth, 'useAuth').mockImplementation(() => {
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
