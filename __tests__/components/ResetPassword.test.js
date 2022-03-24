import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPassword from '../../pages/resetPassword'
import { AuthProvider } from '../../lib/auth/AuthContext'
import * as mockUseAuth from '../../lib/auth/useAuth'

const testUser = {
  id: process.env.SUPABASE_TEST_USER_ID,
  username: 'TestUser',
  email: 'test@example.com',
}

const mockContext = {
  user: {
    id: testUser.id,
  },
  loggedIn: true,
  sendResetPasswordLink: jest.fn(),
  updateUserPassword: jest.fn(),
}

describe('Resetpassword request', () => {
  beforeEach(() => {
    jest.spyOn(mockUseAuth, 'useAuth').mockImplementation(() => mockContext)

    mockContext.error = ''
    mockContext.message = ''

    render(
      <AuthProvider>
        <ResetPassword />
      </AuthProvider>,
    )
  })

  test('Renders the password reset form', () => {
    const emailInput = screen.getByLabelText(/your email/i)

    expect(
      screen.getByRole('heading', { name: /reset your password/i }),
    ).toBeInTheDocument()

    expect(emailInput).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /send reset link/i }),
    ).toBeInTheDocument()
  })

  test.only('Validates the email address field', async () => {
    mockContext.error = 'User not found'
    const emailInput = screen.getByLabelText(/your email/i)

    userEvent.type(emailInput, 'notanemail')
    fireEvent.submit(screen.getByRole('form'))

    expect(
      await screen.findByText(/email address is invalid/i),
    ).toBeInTheDocument()
    expect(await screen.findByText(mockContext.error)).toBeInTheDocument()
  })

  test('Successfully submits the form', async () => {
    mockContext.message = 'Check your email for the reset link'
    const emailInput = screen.getByLabelText(/your email/i)

    userEvent.type(emailInput, testUser.email)
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByText(mockContext.message)).toBeInTheDocument()
  })
})

describe('Update password', () => {
  beforeEach(() => {
    jest.spyOn(mockUseAuth, 'useAuth').mockImplementation(() => mockContext)

    mockContext.error = ''
    mockContext.message = ''
    mockContext.event = 'PASSWORD_RECOVERY'

    render(
      <AuthProvider>
        <ResetPassword />
      </AuthProvider>,
    )
  })
  test('Renders the password reset form', () => {
    const passwordInput = screen.getByLabelText(/password/i)
    expect(
      screen.getByRole('heading', { name: /reset your password/i }),
    ).toBeInTheDocument()

    expect(passwordInput).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /update my password/i }),
    ).toBeInTheDocument()
  })

  test('Validates the password field', async () => {
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(passwordInput, 'fred')
    fireEvent.submit(screen.getByRole('form'))

    expect(
      await screen.findByText(
        'Password must be at least six characters; contain one uppercase letter, one number and one special character',
      ),
    ).toBeInTheDocument()
  })

  test('Successfully submits the form', async () => {
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(passwordInput, 'EU9nwH8V%f&#')
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() =>
      expect(mockContext.updateUserPassword).toHaveBeenCalled(),
    )
  })
})
