import { useState } from 'react'
import {
  Button,
  Divider,
  PinInput,
  PinInputField,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import useLocalStorage from '../hooks/useLocalStorage'
import { supabase } from '../utils/supabaseClient'
import createPinNumber from '../utils/createPinNumber'

const Game = () => {
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useLocalStorage('pin', '')

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

      // Remove our saved pin number
      setPin('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // TODO: When joins successfully redirect player to the game screen
  const joinGame = async (e) => {
    e.preventDefault()
    // Join pin input values
    let pinInputValue = ''

    const pinInputs = [...e.target.elements].filter(
      (input) => !input.matches('[type="submit"]'),
    )

    for (const input of pinInputs) {
      pinInputValue += input.value
    }

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const { data, error, status } = await supabase
        .from('games')
        .update({
          players_in_game: `[{
            id: ${user.id}
          }]`,
        })
        .match({ in_progress: true, pin: pinInputValue })

      console.log(data)

      if (error) console.error(status, error)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack align="stretch">
      <Heading>Game</Heading>
      <Heading as="h2" align="center">
        Join a game
      </Heading>

      <form onSubmit={(e) => joinGame(e)} name="joinGame">
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
        <Button type="submit" isLoading={loading}>
          Join
        </Button>
      </form>

      <Divider />

      <Heading as="h2" align="center">
        Start a game
      </Heading>

      <Button onClick={createGame} isLoading={loading}>
        Create Game
      </Button>

      {pin ? (
        <>
          <Text>Pin: {pin}</Text>
          <Button
            onClick={() => endGame(pin)}
            isLoading={loading}
            colorScheme="red"
          >
            End Game
          </Button>
        </>
      ) : null}
    </VStack>
  )
}
export default Game
