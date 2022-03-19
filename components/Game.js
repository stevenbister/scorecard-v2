import { useContext } from 'react'
import {
  Button,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { GameContext } from '../lib/game/GameContext'
import Player from './Player'
import GamePinInput from './GamePinInput'
import GamePinButton from './GamePinButton'
import GameEndButton from './GameEndButton'

const Game = () => {
  const { pin, players } = useContext(GameContext)

  return (
    <VStack align="stretch">
      <Heading>Game</Heading>

      <Text>{pin}</Text>

      {/* TODO: Remove this when player joins so they can't join more than once */}
      <GamePinInput />

      <GamePinButton />

      <UnorderedList styleType="none">
        {players.map((player) => (
          <ListItem key={player.id}>
            <Player user={player} />
          </ListItem>
        ))}
      </UnorderedList>

      <GameEndButton />
    </VStack>
  )
}
export default Game
