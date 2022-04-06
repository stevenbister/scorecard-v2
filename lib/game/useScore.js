import { useState, useEffect, useContext } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useAuth } from '../auth/useAuth'
import { GameContext } from './GameContext'

const useScore = () => {
  const { pin } = useContext(GameContext)
  const [score, setScore] = useState(0)
  const { user } = useAuth()

  const updatePlayerScore = async () => {
    try {
      const activePlayers = await supabase
        .from('games')
        .select('players_in_game')
        .match({
          in_progress: true,
          pin: pin,
        })

      const { players_in_game } = activePlayers.data[0]
      const playersJSON = JSON.parse(players_in_game)

      for (const player of playersJSON) {
        if (user.id === player.id) {
          player.score = score
        }
      }

      const updatePlayers = await supabase
        .from('games')
        .update({
          players_in_game: JSON.stringify(playersJSON),
        })
        .match({ in_progress: true, pin: pin })

      if (activePlayers.error || updatePlayers.error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      ;(async () => {
        await updatePlayerScore()
      })()
    }
    // Async side effect cleanup
    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score])

  return [score, setScore]
}

export { useScore }
