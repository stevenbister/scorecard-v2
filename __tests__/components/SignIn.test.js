import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../../lib/auth/AuthContext'
import Home from '../../pages/index'
import SignIn from '../../pages/sign-in'
import SignUp from '../../pages/sign-up'

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
    screen.getByRole('button', {
      name: /sign in/i,
    }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole('button', {
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
