import { useContext, useState } from 'react'
import { GameContext } from '../lib/game/GameContext'
import {
  Button,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
} from '@chakra-ui/react'
import GamePinInput from '../components/GamePinInput'
import Player from '../components/Player'
import GameAlertButton from '../components/GameAlertButton'

const lobby = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        <UnorderedList styleType="none" style={{ margin: 0 }}>
          {players?.map((player) => (
            <ListItem key={player.id}>
              <Player user={player} />
            </ListItem>
          ))}
        </UnorderedList>

        {host && players?.length <= 1 ? (
          <Text align="center">Waiting for players...</Text>
        ) : null}

        {!host ? (
          <Text align="center">Waiting for game to start...</Text>
        ) : null}
      </VStack>

      {/* TODO: Remove this when player joins so they can't join more than once */}
      {pin ? null : <GamePinInput />}

      {pin ? (
        <VStack
          align="stretch"
          spacing={0}
          p={20}
          style={{ marginTop: 'auto' }}
        >
          {/* TODO: Add leave game option */}

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

export default lobby
