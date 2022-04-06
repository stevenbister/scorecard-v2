import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import Player from '../components/Player'
import { Text, Box, UnorderedList, ListItem } from '@chakra-ui/react'

const Leaderboard = () => {
  const { players } = useContext(GameContext)

  return (
    <Box>
      <Text size="lg" textAlign="center">
        Leaderboard
      </Text>
      <UnorderedList
        styleType="none"
        style={{ margin: 0 }}
        data-testid="playerList"
      >
        {players?.map((player) => (
          <ListItem key={player.id}>
            <Player user={player} score={player.score || '0'} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default Leaderboard
