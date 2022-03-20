import Link from 'next/link'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { supabase } from '../utils/supabaseClient'
import GameButton from '../components/GameButton'

const Home = ({ user }) => {
  return (
    <VStack align="stretch" spacing={16} py={40}>
      <Heading as="h1" align="center" size="3xl">
        Scorecard
      </Heading>

      <VStack align="stretch" spacing={6} px={20}>
        {user ? (
          <>
            <GameButton link="/lobby" type="start">
              Start a game
            </GameButton>
            <GameButton link="/lobby" type="join">
              Join a game
            </GameButton>
          </>
        ) : (
          <>
            <Link href="/sign-in" passHref>
              <Button as="a">Sign in</Button>
            </Link>

            <Link href="/sign-up" passHref>
              <Button as="a" variant="outline">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </VStack>
    </VStack>
  )
}

export default Home

export async function getServerSideProps({ req }) {
  // check to see if a user is set
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // if a user is set, pass it to the page via props
  return { props: { user } }
}
