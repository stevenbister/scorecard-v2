import { render, screen } from '@testing-library/react'
import ListPlayers from '../../components/ListPlayers'

describe('ListPlayers', () => {
  test('renders no players when the player list is empty', () => {
    render(<ListPlayers players={[]} />)

    expect(screen.queryByTestId('playerList')).not.toBeInTheDocument()
    expect(screen.queryByText(/no players/i)).toBeInTheDocument()
  })

  test('renders the player controls in a list', () => {
    // Generate some fake data to create the players list.
    // As we're only checking to see if the list gets rendered
    // it doesn't matter too much that we're not connecting to the
    // api to generate it.
    const fakePlayers = [
      {
        player_name: 'player 1',
        id: 1,
      },
      {
        player_name: 'player 2',
        id: 2,
      },
      {
        player_name: 'player 3',
        id: 3,
      },
    ]
    render(<ListPlayers players={fakePlayers} />)

    const listOfPlayers = screen.queryAllByRole('listitem')

    expect(listOfPlayers).toHaveLength(3)
    expect(listOfPlayers[0]).toHaveTextContent('player 1')
    expect(listOfPlayers[1]).toHaveTextContent('player 2')
    expect(listOfPlayers[2]).toHaveTextContent('player 3')
  })
})
