import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../../lib/auth/AuthContext'
import SignIn from '../../pages/sign-in'

test('Renders the component', () => {
  render(<SignIn />)

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

test('Renders the sign in form when sign in button is clicked', () => {
  render(
    <AuthProvider>
      <SignIn />
    </AuthProvider>,
  )

  const signIn = screen.getByRole('button', {
    name: /sign in/i,
  })

  userEvent.click(signIn)

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

test('Renders the sign up form when sign up button is clicked', () => {
  render(
    <AuthProvider>
      <SignIn />
    </AuthProvider>,
  )

  const signIn = screen.getByRole('button', {
    name: /sign up/i,
  })

  userEvent.click(signIn)

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
