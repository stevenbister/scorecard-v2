import PropTypes from 'prop-types'

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

AddPlayerForm.propTypes = {
  handleSubmit: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default AddPlayerForm
