import Link from 'next/link'
import { Button, Heading, VStack } from '@chakra-ui/react'
import Game from '../components/Game'
import { supabase } from '../utils/supabaseClient'
import { useAuth } from '../lib/auth/useAuth'

const Home = () => {
  const { loggedIn } = useAuth()

  return (
    <>
      {loggedIn ? (
        <Game />
      ) : (
        <VStack align="stretch" spacing={16} py={40}>
          <Heading as="h1" align="center" size="3xl">
            Scorecard
          </Heading>

          <VStack align="stretch" spacing={6} px={20}>
            <Link href="/sign-in" passHref>
              <Button as="a" full>
                Sign in
              </Button>
            </Link>

            <Link href="/sign-up" passHref>
              <Button as="a" variant="outline">
                Sign up
              </Button>
            </Link>
          </VStack>
        </VStack>
      )}
    </>
  )
}

export default Home

export async function getServerSideProps({ req }) {
  // check to see if a user is set
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // if a user is set, pass it to the page via props
  return { props: { user } }
}
