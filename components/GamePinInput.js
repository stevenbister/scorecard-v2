import { useContext } from 'react'
import { GameContext } from '../lib/game/GameContext'
import Link from 'next/link'
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  FormControl,
  FormLabel,
  PinInput,
  PinInputField,
  HStack,
  VStack,
} from '@chakra-ui/react'

const GamePinInput = () => {
  const { joinGame, loading, error } = useContext(GameContext)

  return (
    <>
      <form onSubmit={(e) => joinGame(e)} id="joinGame" name="joinGame">
        <VStack align="stretch" spacing={4}>
          <FormControl as="fieldset">
            <FormLabel as="legend" size="3xl" mx="auto">
              Enter pin
            </FormLabel>

            <HStack justify="center">
              <PinInput>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </FormControl>
        </VStack>
      </form>

      {error ? (
        <Alert status="error" color="red.900">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <VStack align="stretch" p={20} style={{ marginTop: 'auto' }}>
        <Button form="joinGame" type="submit" isLoading={loading}>
          Join game
        </Button>

        <Link href="/" passHref>
          <Button as="a" variant="outline">
            Exit
          </Button>
        </Link>
      </VStack>
    </>
  )
}

export default GamePinInput
