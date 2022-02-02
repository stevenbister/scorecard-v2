import Player from "./Player"

const ListPlayers = ({players}) => {
  const playerList = players.length > 0 && players.map(player => <li key={player.id} ><Player playerName={player.player_name}/></li>)

  return (
    <>
      <h2>Players saved</h2>
      <ul>{playerList}</ul>
    </>
  )
}

export default ListPlayers