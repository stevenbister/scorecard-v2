import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'
import Avatar from 'boring-avatars'

const Player = ({ username }) => {
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
  username: PropTypes.string,
}

export default Player
