import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddPlayerForm from '../../components/AddPlayerForm'
import Players from '../../pages/players'
import * as util from '../../utils/managePlayers'

test('Renders the AddPlayerForm', () => {
  render(<AddPlayerForm />)

  expect(screen.getByRole('form')).toBeInTheDocument()
  expect(screen.getByLabelText(/player name/i)).toBeInTheDocument()
  expect(
    screen.getByRole('button', {
      name: /add/i,
    }),
  ).toBeInTheDocument()
})

// We will test the value changes as that's what the user will see
// rather than testing the function having been called.
test('Successfully submits the form', async () => {
  const originalGetPlayers = util.getPlayers
  const originalCreatePlayer = util.createPlayer

  // Mock our get/create players functions
  util.getPlayers = jest.fn(() => Promise.resolve())
  util.createPlayer = jest.fn((e) => {
    e.preventDefault()
    const inputVal = e.target.elements.name.value

    return inputVal
  })

  render(<Players />)

  const form = screen.getByRole('form')
  const input = screen.getByLabelText(/player name/i)

  expect(form).toBeInTheDocument()
  expect(input).toBeInTheDocument()

  userEvent.type(input, 'Player 1')
  expect(input).toHaveValue('Player 1')

  fireEvent.submit(form)

  // Batch up all of our state updates while the promise is in flight
  // then flush those changes once the promise resolves
  // This is because our getPlayers method on the component updates the state
  await waitFor(() => expect(util.createPlayer).toHaveBeenCalledTimes(1))

  jest.clearAllMocks()
  // Reset to original implementation after the test
  util.getPlayers.mockImplementation(originalGetPlayers)
  util.getPlayers.mockImplementation(originalCreatePlayer)
})
