import PropTypes from 'prop-types'
import Player from '../components/Player'
import { Text, Box, UnorderedList, ListItem } from '@chakra-ui/react'

const Leaderboard = ({ players, score }) => {
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
            <Player user={player} score={score} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

Leaderboard.propTypes = {
  players: PropTypes.array,
}

export default Leaderboard
