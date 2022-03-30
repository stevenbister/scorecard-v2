import { useState } from 'react'
import Router from 'next/router'
import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react'
import ProfileForm from '../components/ProfileForm'
import { supabase } from '../utils/supabaseClient'
import Player from '../components/Player'
import { useAuth } from '../lib/auth/useAuth'
import { useProfile } from '../lib/profile/useProfile'

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const { event } = useAuth()
  const { email, username, setUsername, updateProfile, error } =
    useProfile(user)

  const updateUserProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await updateProfile()
      Router.reload()
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack align="stretch" spacing={6} py={28}>
      <Heading as="h1" align="center" size="3xl">
        Profile
      </Heading>

      <Player user={user} username={username} />

      {event === 'USER_UPDATED' ? (
        <Alert status="success">
          <AlertIcon />
          Your password was updated successfully
        </Alert>
      ) : null}

      {error ? (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : null}

      <ProfileForm
        email={email}
        userName={username}
        handleChange={(e) => setUsername(e.target.value)}
        handleSubmit={(e) => updateUserProfile(e)}
        loading={loading}
      />
    </VStack>
  )
}

export default Profile

export async function getServerSideProps({ req }) {
  // check to see if a user is set
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // if no user is set, redirect to the sign-in page
  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }

  // if a user is set, pass it to the page via props
  return { props: { user } }
}
