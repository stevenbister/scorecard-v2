import { useState, useEffect } from 'react'
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
    <>
      <h1>Your profile</h1>

      <h2>Update your details</h2>
      <ProfileForm
        email={email}
        userName={username}
        setUserName={(e) => setUsername(e.target.value)}
        handleSubmit={(e) => updateUserProfile(e)}
      />

      {/* TODO: This could be a spinner component or something perhaps */}
      {loading ? <div className="loader">Loading</div> : null}

      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </>
  )
}

export default Profile
