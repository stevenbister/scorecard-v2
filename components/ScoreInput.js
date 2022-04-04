import { Textarea } from '@chakra-ui/react'

const ScoreInput = ({ onChange }) => {
  return (
    <Textarea
      size="lg"
      variant="filled"
      inputMode="numeric"
      onChange={onChange}
    />
  )
}

export default ScoreInput
