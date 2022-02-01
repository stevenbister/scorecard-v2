import AddPlayerForm from '../components/AddPlayerForm'
import ListPlayers from '../components/ListPlayers'
import Auth from '../components/Auth'
import useSession from '../hooks/useSession'

const Profile = () => {
  const session = useSession()

  return (
    <>
      <h1>Players</h1>
      {session ?

      <>
        <AddPlayerForm />
        <ListPlayers />
      </>

      :

      <Auth />
      }
    </>
  )
}

export default Profile