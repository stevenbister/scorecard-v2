import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { getProfile, updateProfile } from '../utils/manageProfile'

const ProfileForm = ({ userSession }) => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const profile = await getProfile()

        profile.email && setEmail(profile.email)
        profile.username && setUsername(profile.username)
      } finally {
        setLoading(false)
      }
    })()
  }, [userSession])

  const handleUpdate = async () => {
    try {
      setLoading(true)
      updateProfile(username)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default ProfileForm
