import Player from './Player'
import useLocalStorage from '../hooks/useLocalStorage'

const ListPlayers = ({ players }) => {
  const [playersInGame, setPlayersInGame] = useLocalStorage('players', [])

  const addPlayerToGame = (player) => {
    setPlayersInGame((playersInGame) => [...playersInGame, player])
  }

  const removePlayerFromGame = (player) => {
    setPlayersInGame(playersInGame.filter((p) => p !== player))
    console.log(player, 'removed')
  }

  const playerList =
    players.length > 0 &&
    players.map((player) => (
      <li key={player.id}>
        <Player
          playerName={player.player_name}
          addToGame={addPlayerToGame}
          removeFromGame={removePlayerFromGame}
        />
      </li>
    ))

  return (
    <>
      <h2>Players saved</h2>
      {players.length > 0 ? <ul>{playerList}</ul> : <p>No players</p>}
    </>
  )
}

export default ListPlayers
