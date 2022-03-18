import { useState, useEffect } from 'react'
import {
  Button,
  Divider,
  PinInput,
  PinInputField,
  Heading,
  Text,
  VStack,
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import useLocalStorage from '../hooks/useLocalStorage'
import { supabase } from '../utils/supabaseClient'
import createPinNumber from '../utils/createPinNumber'
import { useAuth } from '../lib/auth/useAuth'
import Player from './Player'

const Game = () => {
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useLocalStorage('pin', '')
  const [activeGame, setActiveGame] = useLocalStorage('activeGame', '')
  const [players, setPlayers] = useLocalStorage('players', [])
  const { user } = useAuth()
  const toast = useToast()

  useEffect(() => {
    let mounted = true

    if (mounted) {
      // TODO: A lot of boilerplate code going on -- could I refactor?
      const getPlayersInGame = async () => {
        try {
          const {
            data: games,
            error,
            status,
          } = await supabase.from('games').select('players_in_game').match({
            in_progress: true,
            pin: activeGame,
          })

          if (error) console.error(status, error)

          if (games.length > 0) {
            // Turn our string of players into an array
            const playersArr = JSON.parse(games[0].players_in_game)

            setPlayers(playersArr)
          }
        } catch (error) {
          console.error(error)
        }
      }

      getPlayersInGame()
    }

    // Async side effect cleanup
    return () => (mounted = false)
  }, [activeGame, setPlayers])

  useEffect(() => {
    const liveGameSubscription = supabase
      .from(`games:pin=eq.${pin}`)
      .on('*', (payload) => {
        console.log('Change received!')
        handleNewPlayer(payload)
      })
      .subscribe()

    return () => supabase.removeSubscription(liveGameSubscription)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, players])

  const handleNewPlayer = (payload) => {
    console.log({ payload }) // TODO: Handle errors?

    const { players_in_game } = payload.new

    if (players_in_game) {
      const playersJSON = JSON.parse(players_in_game)
      setPlayers(playersJSON)
    }
  }

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

  const createGame = async (user) => {
    try {
      setLoading(true)

      const gamePin = await createGamePin()

      const { data, error, status } = await supabase.from('games').insert({
        creator_id: user.id,
        pin: gamePin,
        in_progress: true,
        players_in_game: JSON.stringify([{ id: user.id }]),
      })

      if (error) console.error(status, error)

      setPin(gamePin)
      setActiveGame(gamePin)
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: error.error_description || error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // TODO: Would be worth deleting the table row once the game is over so we don’t end up with a massive db to loop over
  const endGame = async (pin, user) => {
    try {
      setLoading(true)

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
      setActiveGame('')
      setPlayers([])
      // TODO: Remove subscription
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // TODO: When joins successfully redirect player to the game screen
  const joinGame = async (e, user) => {
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

      // Check to make sure our player isn't already in the game
      const activePlayers = await supabase
        .from('games')
        .select('players_in_game')
        .match({ in_progress: true, pin: pinInputValue })

      // Turn our string of players into an array
      const { players_in_game } = activePlayers.data[0]
      const playersJSON = JSON.parse(players_in_game)

      for (const player of playersJSON) {
        if (player === '') continue // Skip any blank strings

        // if user id doesn't match player id add them to the players list
        if (user.id !== player.id) {
          playersJSON.push({ id: user.id })
        }
      }

      const updatePlayers = await supabase
        .from('games')
        .update({
          players_in_game: JSON.stringify(playersJSON),
        })
        .match({ in_progress: true, pin: pinInputValue })

      console.log(updatePlayers.data)

      if (updatePlayers.error)
        console.error(updatePlayers.status, updatePlayers.error)

      setActiveGame(pinInputValue)
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

      {/* TODO: Remove this when player joins so they can't join more than once */}
      <form onSubmit={(e) => joinGame(e, user)} name="joinGame">
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

      <Text>Players in current game:</Text>

      <UnorderedList styleType="none">
        {players.map((player) => (
          <ListItem key={player.id}>
            <Player user={player} />
          </ListItem>
        ))}
      </UnorderedList>

      <Divider />

      <Heading as="h2" align="center">
        Start a game
      </Heading>

      <Button
        onClick={() => createGame(user)}
        disabled={pin}
        isLoading={loading}
      >
        Create Game
      </Button>

      {pin ? (
        <>
          <Text>Pin: {pin}</Text>
          <Button
            onClick={() => endGame(pin, user)}
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
