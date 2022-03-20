import { useContext } from 'react'
import PropTypes from 'prop-types'
import { GameContext } from '../lib/game/GameContext'
import { Button, useDisclosure } from '@chakra-ui/react'
import Alert from './Alert'

const GameAlertButton = ({ type, children }) => {
  const { endGame, leaveGame, loading } = useContext(GameContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} variant="outline" isLoading={loading}>
        {children}
      </Button>

      <Alert
        heading={
          type === 'leave'
            ? 'Are you sure you want to leave the game?'
            : 'Are you sure you want to end the game?'
        }
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={type === 'leave' ? leaveGame : endGame}
      />
    </>
  )
}

GameAlertButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
}

export default GameAlertButton
