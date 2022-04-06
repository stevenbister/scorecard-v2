import useLocalStorageState from 'use-local-storage-state'

const usePin = () => {
  const [pin, setPin] = useLocalStorageState('pin', {
    ssr: true,
    defaultValue: '',
  })

  return [pin, setPin]
}

export default usePin
