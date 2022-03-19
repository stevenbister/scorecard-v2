import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'

const GameButton = ({ type, children }) => {
  const { createGame, endGame, loading } = useContext(GameContext)

  const functionType =
    type === 'start' ? createGame : type === 'end' ? endGame : null

  const link = type === 'end' ? '/' : '/lobby'

  const variant = type === 'join' || type === 'end' ? 'outline' : null

  return (
    <Link href={link} passHref>
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

export default GameButton
