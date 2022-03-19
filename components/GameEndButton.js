import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import { Button } from '@chakra-ui/react'

const GameEndButton = () => {
  const { endGame, pin, loading } = useContext(GameContext)

  return (
    <Button onClick={() => endGame(pin)} isLoading={loading} colorScheme="red">
      End Game
    </Button>
  )
}

export default GameEndButton
