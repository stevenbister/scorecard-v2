import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'
import Avatar from 'boring-avatars'
import { useProfile } from '../lib/profile/useProfile'

const Player = ({ user }) => {
  const { username } = useProfile(user)

  return (
    <Box
      borderBottom="1px"
      borderBottomColor="gray.500"
      display="flex"
      alignItems="center"
      p={2}
    >
      <Avatar
        size={40}
        name={username}
        variant="beam"
        colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
      />

      <Text fontWeight="semibold" fontSize={20} px={4}>
        {username}
      </Text>
    </Box>
  )
}

Player.propTypes = {
  username: PropTypes.object,
}

export default Player
