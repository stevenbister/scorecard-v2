import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import { Button, PinInput, PinInputField } from '@chakra-ui/react'

const GamePinInput = () => {
  const { joinGame, loading } = useContext(GameContext)

  return (
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
  )
}

export default GamePinInput
