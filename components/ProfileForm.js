import PropTypes from 'prop-types'
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from '@chakra-ui/react'
import SignOutButton from './SignOutButton'

const ProfileForm = ({
  email,
  userName,
  handleSubmit,
  handleChange,
  loading,
}) => {
  return (
    <Box pt={6}>
      <form onSubmit={handleSubmit} name="profileForm">
        <VStack align="flex-start" spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={email ? email : ''}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              name="username"
              type="text"
              defaultValue={userName ? userName : ''}
              onChange={handleChange}
            />
          </FormControl>

          <HStack>
            <Button type="submit" isLoading={loading}>
              Update
            </Button>

            <SignOutButton />
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}

ProfileForm.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
  handleSubmit: PropTypes.func,
  setUserName: PropTypes.func,
}

export default ProfileForm
