import useLocalStorageState from 'use-local-storage-state'

const useActiveGame = () => {
  const [activeGame, setActiveGame] = useLocalStorageState('activeGame', {
    ssr: true,
    defaultValue: '',
  })

  return [activeGame, setActiveGame]
}

export default useActiveGame
