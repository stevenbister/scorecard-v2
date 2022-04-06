import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import { SimpleGrid, Box, VStack, Flex } from '@chakra-ui/react'
import GameAlertButton from '../components/GameAlertButton'
import Leaderboard from '../components/Leaderboard'
import ScoreInput from '../components/ScoreInput'
import { arrayValuesToNumbers, sumArray } from '../utils/arrays'
import { useScore } from '../lib/game/useScore'

const Game = () => {
  const [score, setScore] = useScore(0)
  const { pin, host, rounds, setRounds } = useContext(GameContext)

  const handleScoreChange = (e) => {
    const { value } = e.currentTarget
    setRounds(value) // Save the current input to the local storage so we can refresh the page if necessary

    const valueToArray = arrayValuesToNumbers(value.split('\n'))
    const totalScore = sumArray(valueToArray)
    setScore(totalScore)
  }

  return (
    <VStack
      align="stretch"
      spacing={8}
      pt={14}
      style={{ minHeight: 'calc(100vh - 62px)' }}
    >
      <Box>Pin:{pin}</Box>

      <SimpleGrid columns={2} spacing={4}>
        <ScoreInput defaultValue={rounds} onChange={handleScoreChange} />

        <Leaderboard />
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
