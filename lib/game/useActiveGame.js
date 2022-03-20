import useLocalStorage from '../useLocalStorage'

const useActiveGame = () => {
  const [activeGame, setActiveGame] = useLocalStorage('activeGame', '')

  return [activeGame, setActiveGame]
}

export default useActiveGame
