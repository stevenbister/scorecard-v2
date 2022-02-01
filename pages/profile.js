import Auth from '../components/Auth'
import ProfileForm from '../components/ProfileForm'
import useSession from '../hooks/useSession'

const Profile = () => {
  const session = useSession()

  return (
    <>
      <h1>Profile</h1>
      {session ? <ProfileForm /> : <Auth />}
    </>
  )
}

export default Profile