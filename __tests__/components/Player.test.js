import { getByTitle, render, screen, waitFor } from '@testing-library/react'
import { AuthProvider } from '../../lib/auth/AuthContext'
import Player from '../../components/Player'
import * as hooks from '../../lib/profile/useProfile'

const testUser = {
  id: process.env.SUPABASE_TEST_USER_ID,
  email: 'testuser@example.com',
  username: 'TestUser',
}

test('Renders the player component', () => {
  jest.spyOn(hooks, 'useProfile').mockImplementation(() => testUser)

  render(
    <AuthProvider>
      <Player />
    </AuthProvider>,
  )

  expect(screen.getByTitle(testUser.username)).toBeInTheDocument()

  expect(screen.getAllByText(testUser.username)).toHaveLength(2)
})
