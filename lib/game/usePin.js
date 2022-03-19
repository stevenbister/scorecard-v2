import useLocalStorage from '../useLocalStorage'

const usePin = () => {
  const [pin, setPin] = useLocalStorage('pin', '')

  return [pin, setPin]
}

export default usePin
