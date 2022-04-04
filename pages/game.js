import { useState, useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import { SimpleGrid, Box, VStack, Flex } from '@chakra-ui/react'
import GameAlertButton from '../components/GameAlertButton'
import Leaderboard from '../components/LeaderBoard'
import ScoreInput from '../components/ScoreInput'
import { arrayValuesToNumbers, sumArray } from '../utils/arrays'

const Game = () => {
  const [score, setScore] = useState(0)
  const { pin, players, host } = useContext(GameContext)

  const handleScoreChange = (e) => {
    const { value } = e.currentTarget
    const valueToArray = arrayValuesToNumbers(value.split('\n'))
    const totalScore = sumArray(valueToArray)

    console.log(valueToArray)
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
        <div>
          <ScoreInput onChange={handleScoreChange} />
        </div>

        <Leaderboard players={players} score={score} />
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
