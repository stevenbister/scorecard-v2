const AddPlayerForm = ({ handleSubmit, onChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Player Name</label>
      <input id="name" type="text" onChange={onChange} />

      <button>Add</button>
    </form>
  )
}

export default AddPlayerForm
