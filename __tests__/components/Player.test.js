import { render, fireEvent, screen } from '@testing-library/react'
import Player from '../../components/Player'

describe('Player', () => {
  test.skip('Displays the player name', () => {
    render(<Player playerName="Player 1" />)

    expect(screen.queryByText(/player 1/i)).toBeInTheDocument()
  })

  //? Not sure if this is the best way to test this...
  //? Potentially moving the buttons into their own component anyway
  //? so they will be tested seperately if that happens regardless
  test('Disables button when player is added/removed to game', () => {
    const mockClick = jest.fn()

    render(
      <Player
        playerName="Player 1"
        addToGame={mockClick}
        removeFromGame={mockClick}
      />,
    )

    const addButton = screen.getByRole('button', {
      name: /add to game/i,
    })

    const removeButton = screen.getByRole('button', {
      name: /remove from game/i,
    })

    // Test our addButton disables the correct button
    fireEvent.click(addButton)
    expect(addButton).toBeDisabled()
    expect(removeButton).not.toBeDisabled()

    // Test our removeButton disables the correct button
    fireEvent.click(removeButton)
    expect(removeButton).toBeDisabled()
    expect(addButton).not.toBeDisabled()

    // Make sure our click is called
    expect(mockClick).toBeCalledTimes(2)
  })
})
