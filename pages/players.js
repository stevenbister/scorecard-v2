import { useState, useEffect } from 'react'
import AddPlayerForm from '../components/AddPlayerForm'
import ListPlayers from '../components/ListPlayers'
import { supabase } from '../utils/supabaseClient'

// TODO: Add error handling component
const Players = ({userSession}) => {
  const [playerName, setPlayerName] = useState(null)
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers()
    // deletePlayers() // ! Remove this this is only while we mess around with the db
  }, [players])


  const deletePlayers = async () => {
    try {
      const { data, error } = await supabase.from('players').delete().match({ player_name: 'test player 7' })

      if (error) throw error

    } catch (error) {
      throw error
    }
  }

  const getPlayers = async () => {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('players').select('id, player_name, created_at, profile_id').eq('profile_id', user.id)

      if (error && status !== 406) throw error

      await setPlayers(data)

    } catch (error) {
      throw error
    }
  }

  const createPlayer = async (e) => {
    e.preventDefault()

    try {
      let { data, error, status } = await supabase.from('players').insert({
          profile_id: userSession.user.id,
          player_name: playerName,
        })

      if (error && status !== 406) throw error

    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <h1>Players</h1>

      <AddPlayerForm
        userSession={userSession}
        handleSubmit={createPlayer}
        onChange={(e) => setPlayerName(e.target.value)}
        playerName={playerName}
      />
      <ListPlayers players={players} />
    </>
  )
}

export default Players