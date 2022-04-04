// Convert the array values into numbers
const arrayValuesToNumbers = (arr) => arr.map((value) => Number(value))

const sumArray = (arr) => {
  if (Array.isArray(arr) && arr.length) {
    const result = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    )

    // Catch NaN value and return 0 as a nice output for the user
    if (isNaN(result)) return 0

    return result
  }

  return 0
}

export { arrayValuesToNumbers, sumArray }
