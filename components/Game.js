import { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { supabase } from '../utils/supabaseClient'
import createPinNumber from '../utils/createPinNumber'

const Game = () => {
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState('')
  // TODO: Persist pin -- perhaps check to see which games are active and whether player is in it? Maybe use context?

  // Check our pin number against all of the currently live games.
  // If the pin exists elsewhere regenerate it so we don't ever have two
  // games with the same access pin
  const createGamePin = async () => {
    try {
      const pinNumber = createPinNumber()

      // If there is a matching pin recursively run this function again
      const { data, error, status } = await supabase
        .from('games')
        .select('in_progress, pin')
        .match({
          in_progress: true,
          pin: pinNumber,
        })

      if (error) console.error(status, error)

      if (data.length > 0) {
        createGamePin(pinNumber)
      }

      // Return new pin number
      return pinNumber

      // Loop over result
    } catch (error) {
      console.error(error)
    }
  }

  const createGame = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const gamePin = await createGamePin()
      setPin(gamePin)

      const { data, error, status } = await supabase.from('games').insert({
        creator_id: user.id,
        pin: gamePin,
        in_progress: true,
        players_in_game: `[{
          id: ${user.id}
        }]`,
      })

      if (error) console.error(status, error)

      return data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // TODO: Would be worth deleting the table row once the game is over so we don’t end up with a massive db to loop over
  const endGame = async (pin) => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const { error, status } = await supabase
        .from('games')
        .update({
          in_progress: false,
          players_in_game: null,
        })
        .match({ creator_id: user.id, pin })

      if (error) console.error(status, error)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Game</h1>
      Pin: {pin}
      <Button onClick={createGame} isLoading={loading}>
        Create Game
      </Button>
      <Button onClick={() => endGame(pin)} isLoading={loading}>
        End Game
      </Button>
    </>
  )
}
export default Game
