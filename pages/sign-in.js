import { useState } from 'react'
import { Button, Heading, VStack } from '@chakra-ui/react'
import Auth from '../components/Auth'

const SignIn = () => {
  const [option, setOption] = useState('')

  return (
    <>
      {option === '' ? (
        <VStack align="stretch" spacing={6}>
          <Heading as="h1">Scorecard</Heading>

          <Button onClick={() => setOption('Sign in')}>Sign in</Button>

          <Button variant="outline" onClick={() => setOption('Sign up')}>
            Sign up
          </Button>
        </VStack>
      ) : (
        <Auth heading={option} />
      )}
    </>
  )
}

export default SignIn
