import { supabase } from "./supabaseClient"

/**
 * Gets a list of players based on the logged in user's ID.
 */
const getPlayers = async () => {
  try {
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('players').select('id, player_name, created_at, profile_id').eq('profile_id', user.id)

    if (error && status !== 406) throw error

    return data

  } catch (error) {
    throw error
  }
}

/**
 * Creates a new player and saves them to the database
 *
 * @param {Event} e
 *  Form event
 *
 * @param {String} playerName
 *  Unique player identifier
 */
const createPlayer = async (e, playerName) => {
  e.preventDefault()

  try {
    const user = supabase.auth.user()

    let { data, error, status } = await supabase.from('players').insert({
        profile_id: user.id,
        player_name: playerName,
      })

    if (error && status !== 406) throw error

    return data

  } catch (error) {
    throw error
  }
}

/**
 * Deletes a single player from the database
 *
 * @param {String} playerName
 *  The playerName is the identifier in the database. Pass this to the statement to identify which player to remove.
 */
const deletePlayer = async (playerName) => {
  try {
    const { data, error } = await supabase.from('players').delete().match({ player_name: playerName })

    if (error) throw error

    return data

  } catch (error) {
    throw error
  }
}

export { getPlayers, createPlayer, deletePlayer }