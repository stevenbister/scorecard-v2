import AddPlayerForm from '../components/AddPlayerForm'
import ListPlayers from '../components/ListPlayers'
import Auth from '../components/Auth'

const Profile = ({userSession}) => {
  return (
    <>
      <h1>Players</h1>
      {userSession ?

      <>
        <AddPlayerForm userSession={userSession} />
        <ListPlayers />
      </>

      :

      <Auth />
      }
    </>
  )
}

export default Profile