import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import { SimpleGrid, Box, VStack, Flex } from '@chakra-ui/react'
import GameAlertButton from '../components/GameAlertButton'
import Leaderboard from '../components/LeaderBoard'

const Game = () => {
  const { pin, players, host } = useContext(GameContext)

  return (
    <VStack
      align="stretch"
      spacing={8}
      pt={14}
      style={{ minHeight: 'calc(100vh - 62px)' }}
    >
      <SimpleGrid columns={2} spacing={4}>
        <Box>Pin:{pin}</Box>

        <Leaderboard players={players} />
      </SimpleGrid>

      <Flex
        direction="column"
        alignItems="stretch"
        style={{ marginTop: 'auto', marginBottom: '1rem' }}
      >
        {host ? (
          <GameAlertButton>End game</GameAlertButton>
        ) : (
          <GameAlertButton type="leave">Leave game</GameAlertButton>
        )}
      </Flex>
    </VStack>
  )
}

export default Game
