import useLocalStorage from "../hooks/useLocalStorage"

const Game = () => {
  const [ playersInGame ] = useLocalStorage('players', []);

  return(
    <>
      <h1>Game</h1>
      <ul>
        {playersInGame.map(player => <li key={player}>{player}</li>)}
      </ul>
    </>
  )
}
export default Game