import Link from 'next/link'
import { Button, Heading, VStack } from '@chakra-ui/react'
import Game from '../components/Game'
import { supabase } from '../utils/supabaseClient'
import { useAuth } from '../lib/auth/useAuth'

const Home = () => {
  const { loggedIn } = useAuth()

  return (
    <div className="container" style={{ padding: '50px' }}>
      {loggedIn ? (
        <Game />
      ) : (
        <VStack align="stretch" spacing={6}>
          <Heading as="h1">Scorecard</Heading>

          <Link href="/sign-in" passHref>
            <Button>Sign in</Button>
          </Link>

          <Link href="/sign-up" passHref>
            <Button variant="outline">Sign up</Button>
          </Link>
        </VStack>
      )}
    </div>
  )
}

export default Home

export async function getServerSideProps({ req }) {
  // check to see if a user is set
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // if a user is set, pass it to the page via props
  return { props: { user } }
}
