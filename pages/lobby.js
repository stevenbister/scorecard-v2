import { useContext } from 'react'
import NextLink from 'next/link'
import { GameContext } from '../lib/game/GameContext'
import {
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
  Button,
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
            <>
              <VStack align="stretch" spacing={8}>
                {/* TODO: Set this to be dynamic so only works if more than one player is available */}
                <NextLink href="/game" passHref>
                  <Button as="a">Start game</Button>
                </NextLink>

                <GameAlertButton>End game</GameAlertButton>
              </VStack>
            </>
          ) : (
            <GameAlertButton type="leave">Leave game</GameAlertButton>
          )}
        </VStack>
      ) : null}
    </VStack>
  )
}

export default Lobby
