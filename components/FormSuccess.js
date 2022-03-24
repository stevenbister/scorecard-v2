import PropTypes from 'prop-types'
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

const FormSuccess = ({ message }) => {
  return (
    <Alert status="success" color="green.900">
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

FormSuccess.propTypes = {
  message: PropTypes.string.isRequired,
}

export default FormSuccess
