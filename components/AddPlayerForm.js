const AddPlayerForm = ({ handleSubmit, value, onChange }) => {
  return (
    <form onSubmit={handleSubmit} name="addPlayerForm">
      <label htmlFor="name">Player Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={value}
        onChange={onChange}
      />

      <button>Add</button>
    </form>
  )
}

export default AddPlayerForm
