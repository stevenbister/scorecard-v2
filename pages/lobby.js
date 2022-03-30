import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import {
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
} from '@chakra-ui/react'
import GamePinInput from '../components/GamePinInput'
import Player from '../components/Player'
import GameAlertButton from '../components/GameAlertButton'

const Lobby = () => {
  const { pin, players, host } = useContext(GameContext)

  return (
    <VStack
      align="stretch"
      spacing={8}
      pt={14}
      style={{ minHeight: 'calc(100vh - 62px)' }}
    >
      <Heading as="h1" align="center" size="3xl">
        {pin ? `Pin: ${pin}` : 'Join a game'}
      </Heading>

      <VStack align="stretch">
        {pin ? (
          <UnorderedList
            styleType="none"
            style={{ margin: 0 }}
            data-testid="playerList"
          >
            {players?.map((player) => (
              <ListItem key={player.id}>
                <Player user={player} />
              </ListItem>
            ))}
          </UnorderedList>
        ) : null}

        {host && players?.length <= 1 ? (
          <Text align="center">Waiting for players...</Text>
        ) : null}

        {!host && pin ? (
          <Text align="center">Waiting for game to start...</Text>
        ) : null}
      </VStack>

      {pin ? null : <GamePinInput />}

      {pin ? (
        <VStack
          align="stretch"
          spacing={0}
          p={20}
          style={{ marginTop: 'auto' }}
        >
          {host ? (
            <GameAlertButton>End game</GameAlertButton>
          ) : (
            <GameAlertButton type="leave">Leave game</GameAlertButton>
          )}
        </VStack>
      ) : null}
    </VStack>
  )
}

export default Lobby
