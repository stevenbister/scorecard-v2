import { arrayValuesToNumbers, sumArray } from '../../utils/arrays'

describe('arrayValuesToNumbers', () => {
  test('It converts each item in the array to a number', () => {
    const arrayOfStrings = ['1', '2', '3']

    const convertedArray = arrayValuesToNumbers(arrayOfStrings)

    for (const item of convertedArray) {
      expect(typeof item).toBe('number')
    }
  })
})

describe('sumArray', () => {
  test('It sums up the numbers in the array', () => {
    const array = [1, 2, 3]

    expect(sumArray(array)).toBe(6)
  })

  test('It returns 0 if any items in the array are not a number', () => {
    const array = [1, 'a', 3]

    expect(sumArray(array)).toBe(0)
  })
})
