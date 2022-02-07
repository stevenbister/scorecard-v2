import { useState, useEffect } from 'react'
import AddPlayerForm from '../components/AddPlayerForm'
import ListPlayers from '../components/ListPlayers'
import { getPlayers, createPlayer } from '../utils/managePlayers'

// TODO: Add error handling component
const Players = ({ userSession }) => {
  const [playerName, setPlayerName] = useState(null)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await getPlayers()

      setPlayers(data)

      // TODO: Clean up async function
    })()
  }, [players])

  return (
    <>
      <h1>Players</h1>

      <AddPlayerForm
        userSession={userSession}
        handleSubmit={(e) => createPlayer(e, playerName)}
        onChange={(e) => setPlayerName(e.target.value)}
        playerName={playerName}
      />
      <ListPlayers players={players} />
    </>
  )
}

export default Players
