import { deletePlayer } from "../utils/managePlayers"

const Player = ({playerName}) => {
  return(
    <div>
      <span>{playerName}</span>
      <button onClick={() => deletePlayer(playerName)}>Remove</button>
    </div>
  )
}
export default Player