const ListPlayers = ({players}) => {
  const playerList = players.map(player => <li key={player.id} >{player.player_name}</li>)

  return (
    <>
      <h2>Players saved</h2>
      <ul>{playerList}</ul>
    </>
  )
}

export default ListPlayers