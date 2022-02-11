import { supabase } from '../utils/supabaseClient'

const getProfile = async () => {
  try {
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) console.error(error)

    const profile = {
      email: user && user.email,
      username: data && data.username,
    }

    return profile
  } catch (error) {
    console.error(error) //TODO: Better error handling
  }
}

const updateProfile = async (username) => {
  try {
    const user = supabase.auth.user()

    const updates = {
      id: user.id,
      username,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) console.error(error)
  } catch (error) {
    console.error(error) //TODO: Better error handling
  }
}

export { getProfile, updateProfile }
