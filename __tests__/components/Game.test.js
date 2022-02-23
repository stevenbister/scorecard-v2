import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import Game from '../../components/Game'

// TODO: Clear out db after tests have run
afterEach(() => {})

test('Starts a game when the create game button is clicked', async () => {
  const testUser = {
    id: process.env.SUPABASE_TEST_USER_ID,
  }

  render(<Game user={testUser} />)

  const startButton = screen.getByText(/create game/i)

  expect(startButton).toBeInTheDocument()

  userEvent.click(startButton)

  await screen.findByText(/pin/i)

  expect(startButton).toBeDisabled()
  expect(screen.getByText(/pin/i)).toBeInTheDocument()
  expect(screen.getByText(/end game/i)).toBeInTheDocument()
})
