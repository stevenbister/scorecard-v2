import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import { Button } from '@chakra-ui/react'

const GamePinButton = () => {
  const { createGame, pin, loading } = useContext(GameContext)

  return (
    <Button onClick={() => createGame()} disabled={pin} isLoading={loading}>
      Create Game
    </Button>
  )
}

export default GamePinButton
