import { Textarea } from '@chakra-ui/react'

const ScoreInput = ({ defaultValue, onChange }) => {
  return (
    <Textarea
      size="lg"
      variant="filled"
      inputMode="numeric"
      onChange={onChange}
      value={defaultValue}
    />
  )
}

export default ScoreInput
