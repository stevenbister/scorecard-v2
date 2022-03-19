import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Profile from '../../pages/profile'
import { AuthProvider } from '../../lib/auth/AuthContext'
import * as hooks from '../../lib/profile/useProfile'

const testUser = {
  id: process.env.SUPABASE_TEST_USER_ID,
  email: 'testuser@example.com',
  username: 'TestUser',
}

const setUp = (options) => {
  const spy = jest.spyOn(hooks, 'useProfile').mockImplementation(() => options)

  render(
    <AuthProvider>
      <Profile />
    </AuthProvider>,
  )

  return { spy }
}

test('Renders the users profile', () => {
  setUp({
    email: testUser.email,
    username: testUser.username,
  })

  const emailInput = screen.getByLabelText(/email/i)
  const userNameInput = screen.getByLabelText(/username/i)

  expect(
    screen.getByRole('heading', {
      name: /profile/i,
    }),
  )

  expect(screen.getByRole('form')).toBeInTheDocument()

  expect(emailInput).toBeInTheDocument()
  expect(emailInput).toBeDisabled()
  expect(emailInput).toHaveValue(testUser.email)

  expect(userNameInput).toBeInTheDocument()
  expect(userNameInput).toHaveValue(testUser.username)

  expect(
    screen.getByRole('button', {
      name: /update/i,
    }),
  ).toBeInTheDocument()
})

test('Successfully updates the username', async () => {
  setUp({
    email: testUser.email,
    username: testUser.username,
    error: '',
    setUsername: () => jest.fn(),
    updateProfile: () => jest.fn(),
  })

  const spy = jest.spyOn(hooks, 'useProfile').mockImplementation(() => {
    return {
      email: testUser.email,
      username: testUser.username,
      error: '',
      setUsername: () => jest.fn(),
      updateProfile: () => jest.fn(),
    }
  })

  const form = screen.getByRole('form')
  const userNameInput = screen.getByLabelText(/username/i)

  userEvent.clear(userNameInput)

  userEvent.type(userNameInput, 'newusername')
  expect(userNameInput).toHaveValue('newusername')

  fireEvent.submit(form)

  await waitFor(() => expect(spy).toHaveBeenCalled())
})
