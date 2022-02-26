import { Button } from '@chakra-ui/react'
import useAuth from '../lib/auth/useAuth'

const SignOutButton = () => {
  const { signOut } = useAuth()

  return (
    <Button variant="outline" onClick={signOut}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
