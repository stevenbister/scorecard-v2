import { useState, useEffect } from 'react'
import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react'
import ProfileForm from '../components/ProfileForm'
import { supabase } from '../utils/supabaseClient'
import { getProfile, updateProfile } from '../utils/manageProfile'
import SignOutButton from '../components/SignOutButton'
import { useAuth } from '../lib/auth/useAuth'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const { event } = useAuth()

  useEffect(() => {
    let mounted = true

    if (mounted) {
      ;(async () => {
        const profile = await getProfile()

        profile.email ? setEmail(profile.email) : ''
        profile.username ? setUsername(profile.username) : ''
      })()
    }

    // Async side effect cleanup
    return () => (mounted = false)
  }, [])

  const updateUserProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await updateProfile(username)
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack align="stretch" spacing={6}>
      <Heading as="h1" align="center">
        Your profile
      </Heading>

      <Heading as="h2" align="center">
        Update your details
      </Heading>

      {event === 'USER_UPDATED' ? (
        <Alert status="success">
          <AlertIcon />
          Your password was updated successfully
        </Alert>
      ) : null}

      <ProfileForm
        email={email}
        userName={username}
        setUserName={(e) => setUsername(e.target.value)}
        handleSubmit={(e) => updateUserProfile(e)}
        loading={loading}
      />

      <SignOutButton />
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
