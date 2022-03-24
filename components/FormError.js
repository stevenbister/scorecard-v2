import PropTypes from 'prop-types'
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

const FormError = ({ error }) => {
  return (
    <Alert status="error" color="red.900">
      <AlertIcon />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}

FormError.propTypes = {
  error: PropTypes.string.isRequired,
}

export default FormError
