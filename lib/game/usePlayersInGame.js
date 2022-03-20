import useLocalStorage from '../useLocalStorage'

const usePlayersInGame = () => {
  const [players, setPlayers] = useLocalStorage('players', [])

  return [players, setPlayers]
}

export default usePlayersInGame
