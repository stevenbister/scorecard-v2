import AddPlayerForm from '../components/AddPlayerForm'
import ListPlayers from '../components/ListPlayers'

const Profile = ({userSession}) => {
  return (
    <>
      <h1>Players</h1>

      <AddPlayerForm userSession={userSession} />
      <ListPlayers />
    </>
  )
}

export default Profile