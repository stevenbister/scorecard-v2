import createPinNumber from '../../utils/createPinNumber'

test('returns a 5 digit number', () => {
  expect(createPinNumber().toString()).toHaveLength(5)
})
