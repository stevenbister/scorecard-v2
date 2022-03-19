import { useContext } from 'react'
import PropTypes from 'prop-types'
import { GameContext } from '../lib/game/GameContext'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'

const GameButton = ({ type, children }) => {
  const { createGame, loading } = useContext(GameContext)

  const functionType = type === 'start' ? createGame : null

  const variant = type === 'join' ? 'outline' : null

  return (
    <Link href="/" passHref>
      <Button
        as="a"
        onClick={functionType}
        variant={variant}
        isLoading={loading}
      >
        {children}
      </Button>
    </Link>
  )
}

GameButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
}

export default GameButton
