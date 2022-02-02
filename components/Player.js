import { useState } from "react"
import { deletePlayer } from "../utils/managePlayers"

const Player = ({playerName, addToGame, removeFromGame}) => {
  const [playerIsInGame, setPlayerIsInGame] = useState(false)

  return(
    <div>
      <span>{playerName}</span>

      <button
        onClick={() => {addToGame(playerName), setPlayerIsInGame(true)}} disabled={playerIsInGame}>
        Add to game
      </button>

      <button onClick={() => {removeFromGame(playerName), setPlayerIsInGame(false)}} disabled={!playerIsInGame}>
        Remove from game
      </button>

      <button onClick={() => {removeFromGame(playerName), deletePlayer(playerName)}}>Delete</button>
    </div>
  )
}
export default Player