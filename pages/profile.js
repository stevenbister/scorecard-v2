import ProfileForm from '../components/ProfileForm'

const Profile = ({ userSession }) => {
  return (
    <>
      <h1>Profile</h1>
      <ProfileForm userSession={userSession} />
    </>
  )
}

export default Profile
