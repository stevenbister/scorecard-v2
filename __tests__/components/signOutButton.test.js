import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../../lib/auth/AuthContext'
import SignOutButton from '../../components/SignOutButton'
import * as hooks from '../../lib/auth/useAuth'

test('Renders sign out button', () => {
  render(
    <AuthProvider>
      <SignOutButton />
    </AuthProvider>,
  )

  expect(
    screen.getByRole('button', {
      name: /sign out/i,
    }),
  ).toBeInTheDocument()
})

test('Signs user out of application', () => {
  const spy = jest.spyOn(hooks, 'useAuth').mockImplementation(() => {
    return {
      signOut: jest.fn(),
    }
  })

  render(
    <AuthProvider>
      <SignOutButton />
    </AuthProvider>,
  )

  const button = screen.getByRole('button', {
    name: /sign out/i,
  })
  userEvent.click(button)

  expect(spy).toHaveBeenCalled()
})
