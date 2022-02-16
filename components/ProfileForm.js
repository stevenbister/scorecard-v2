import PropTypes from 'prop-types'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

const ProfileForm = ({
  email,
  userName,
  handleSubmit,
  setUserName,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} name="profileForm">
      <VStack align="stretch" spacing={4}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={email ? email : 'example@example.com'}
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
            onChange={setUserName}
          />
        </FormControl>
        <Button type="submit" isLoading={loading}>
          Update
        </Button>
      </VStack>
    </form>
  )
}

ProfileForm.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
  handleSubmit: PropTypes.func,
  setUserName: PropTypes.func,
}

export default ProfileForm
