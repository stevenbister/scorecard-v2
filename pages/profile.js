import Auth from '../components/Auth'
import ProfileForm from '../components/ProfileForm'

const Profile = ({userSession}) => {

  return (
    <>
      <h1>Profile</h1>
      {userSession ? <ProfileForm userSession={userSession} /> : <Auth />}
    </>
  )
}

export default Profile