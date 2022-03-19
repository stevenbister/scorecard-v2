import { Heading, VStack } from '@chakra-ui/react'
import GameButton from './GameButton'

// TODO: Start/join games should probably be a route or at least url params so we can go back with browser controls
const Game = () => {
  return (
    <VStack align="stretch" spacing={16} py={40}>
      <Heading as="h1" align="center" size="3xl">
        Scorecard
      </Heading>

      <VStack align="stretch" spacing={6} px={20}>
        <GameButton type="start">Start a game</GameButton>
        <GameButton type="join">Join a game</GameButton>
      </VStack>
    </VStack>
  )
}
export default Game
