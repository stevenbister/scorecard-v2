import { useState, useEffect } from "react"

/**
 * Custom hook to set and get items in our localstorage
 *
 * @param {*} defaultValue
 *  Default fallback value is nothing has been saved locally yet
 * @param {*} key
 *  Value to set and get the localstorage item
 * @returns
 *  Local storage key value pair
 */
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    // Check for a value in localstorage, if that exists use that otherwise use the
    // default value passed by our hook
    const localValue = window.localStorage.getItem(key)

    return localValue !== null ? JSON.parse(localValue) : defaultValue
  })

  // Make sure localstorage is kept in sync whenever the state value chages
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return[value, setValue]
}

export default useLocalStorage