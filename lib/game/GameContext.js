import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import { useAuth } from '../auth/useAuth'
import useActiveGame from './useActiveGame'
import usePlayersInGame from './usePlayersInGame'
import useLocalStorage from '../useLocalStorage'
import usePin from './usePin'
import createPinNumber from '../../utils/createPinNumber'

const GameContext = createContext(null)

const GameProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [host, setHost] = useLocalStorage('host', '')
  const [activeGame, setActiveGame] = useActiveGame()
  const [players, setPlayers] = usePlayersInGame()
  const [pin, setPin] = usePin()
  const { user } = useAuth()

  /**
   * Check our pin number against all of the currently live games.
   * If the pin exists elsewhere regenerate it so we don't ever have two
   * games with the same access pin
   * @returns
   */
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

  /**
   * Creates a new game instance
   *
   * Sets the pin number and the active game to our state
   */
  const createGame = async () => {
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
      setHost(user.id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // TODO: Would be worth deleting the table row once the game is over so we don’t end up with a massive db to loop over
  /**
   * Ends the current game
   *
   * Clears the state of our pin number, the active game and the players array
   *
   * @param {number} pin active game pin number
   */
  const endGame = async (pin) => {
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

      Router.push('/')
      setPin('')
      setActiveGame('')
      setPlayers([])
      setHost('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Leave the game without ending it
   *
   * @param {number} pin active game pin number
   */
  const leaveGame = async (pin) => {
    console.log('elvis has left the buildind')

    // TODO: write this
  }

  /**
   * Adds player to the current game session
   *
   * @param {Event} e
   */
  const joinGame = async (e) => {
    // TODO: When joins successfully redirect player to the game screen
    e.preventDefault()
    console.log(user)

    // Join pin input values
    let pinInputValue = ''

    const pinInputs = [...e.target.elements].filter(
      (input) => !input.matches('fieldset, [type="submit"]'),
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

      if (updatePlayers.error)
        console.error(updatePlayers.status, updatePlayers.error)

      setPin(pinInputValue)
      setActiveGame(pinInputValue)
      setError('')
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Get the players currently in the game when the activeGame state updates and
   * push the returned player array into our players state.
   */
  useEffect(() => {
    let mounted = true

    if (mounted) {
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

  /**
   * Listen to the row in our supabase table for updates and pass the returned payload
   * into our handleNewPlayer function.
   *
   * We're listening to the row in the games table that has a pin equal to our current
   * pin number.
   */
  useEffect(() => {
    const websocketListner = async () => {
      const liveGameSubscription = supabase
        .from(`games:pin=eq.${pin}`)
        .on('*', (payload) => {
          console.log('Change received!')
          handleNewPlayer(payload)
        })
        .subscribe()

      return () => supabase.removeSubscription(liveGameSubscription)
    }

    websocketListner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, players])

  /**
   * Push players who join the game into the players array
   *
   * @param {object} payload
   */
  const handleNewPlayer = (payload) => {
    console.log({ payload }) // TODO: Handle errors?

    const { players_in_game } = payload.new

    if (players_in_game) {
      const playersJSON = JSON.parse(players_in_game)
      setPlayers(playersJSON)
    }
  }

  return (
    <GameContext.Provider
      value={{
        createGame,
        endGame,
        joinGame,
        leaveGame,
        activeGame,
        host,
        pin,
        players,
        loading,
        error,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
