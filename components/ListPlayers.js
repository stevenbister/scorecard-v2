import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

// TODO: Make this update when the form is submitted

const ListPlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers()
    // deletePlayers() // ! Remove this this is only while we mess around with the db
  }, [])

  const getPlayers = async () => {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('players').select('id, player_name, created_at, profile_id').eq('profile_id', user.id)

      if (error && status !== 406) {
        throw error
      }

      console.log(data);

      setPlayers(data)

    } catch (error) {
      console.error(error)
    }
  }

  const deletePlayers = async () => {
    try {
      const { data, error } = await supabase.from('players').delete().match({ player_name: 'test player' })

      if (error) throw error

      return data

    } catch (error) {
      console.error(error)
    }
  }

  const playerList = players.map(player => <li key={player.id} >{player.player_name}</li>)

  return (
    <>
      <h2>Players saved</h2>
      <ul>{playerList}</ul>
    </>
  )
}

export default ListPlayers