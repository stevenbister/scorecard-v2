import { useState, useEffect } from 'react'
import AddPlayerForm from '../components/AddPlayerForm'
import ListPlayers from '../components/ListPlayers'
import { getPlayers, createPlayer } from '../utils/managePlayers'

// TODO: Add error handling component
const Players = () => {
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // Init a variable to track when the component is mounted
    // We can use this to clean up our async funciton
    let mounted = true

    if (mounted) {
      const handleSetPlayers = async () => {
        const data = await getPlayers()
        setPlayers(data)
      }
      handleSetPlayers()
    }

    // Side effect cleanup
    return () => (mounted = false)
  }, [players])

  return (
    <>
      <h1>Players</h1>

      <AddPlayerForm
        handleSubmit={(e) => createPlayer(e, playerName)}
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <ListPlayers players={players} />
    </>
  )
}

export default Players
