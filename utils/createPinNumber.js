/**
 * Creates a random 5 digit pin number
 */
const createPinNumber = () => {
  const pin = []

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * 9)
    pin.push(randomNum)
  }

  return pin.join('')
}

export default createPinNumber
