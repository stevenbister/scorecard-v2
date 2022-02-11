const ProfileForm = ({ email, userName, handleSubmit, setUserName }) => {
  return (
    <form onSubmit={handleSubmit} name="profileForm">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={email ? email : 'example@example.com'}
        disabled
      />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        defaultValue={userName ? userName : ''}
        onChange={setUserName}
      />

      <button>Update</button>
    </form>
  )
}

export default ProfileForm
