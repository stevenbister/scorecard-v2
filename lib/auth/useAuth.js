import { useContext } from 'react'
import { AuthContext } from './AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext.Provider')
  }

  return context
}

export default useAuth
