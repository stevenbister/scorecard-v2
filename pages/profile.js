import { useState, useEffect } from 'react'
import { Heading, Button, VStack } from '@chakra-ui/react'
import ProfileForm from '../components/ProfileForm'
import { supabase } from '../utils/supabaseClient'
import { getProfile, updateProfile } from '../utils/manageProfile'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

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

      <ProfileForm
        email={email}
        userName={username}
        setUserName={(e) => setUsername(e.target.value)}
        handleSubmit={(e) => updateUserProfile(e)}
        loading={loading}
      />

      <Button variant="outline" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </Button>
    </VStack>
  )
}

export default Profile
