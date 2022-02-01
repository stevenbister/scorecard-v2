import { useState } from 'react'
import useSession from '../hooks/useSession'
import { supabase } from '../utils/supabaseClient'

// TODO: Add react context so we can pass the session state through all of our components
// TODO: Add error handling component
const AddPlayerForm = () => {
  const session = useSession()
  const [playerName, setPlayerName] = useState(null)

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      let { data, error, status } = await supabase.from('players').insert({
          profile_id: session.user.id,
          player_name: playerName,
        })

      if (error && status !== 406) {
        throw error
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form>
        <label htmlFor="name">Player Name</label>
        <input id="name" type="text" value={playerName || ''} onChange={(e) => setPlayerName(e.target.value)} />

        <button onClick={handleUpdate}>Add</button>
    </form>
  )
}

export default AddPlayerForm