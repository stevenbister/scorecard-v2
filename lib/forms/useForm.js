import { useEffect, useState } from 'react'

/**
 * Custom useForm hook
 *
 * @param {object} initialState object of the form fields with properties
 *  e.g. {email: {
      value: '',
      isRequired: true,
      pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      errorMessage: 'Email address is invalid',
    },}
 * @returns {object} fields, handleChange, validateFields, error
 */
const useForm = (initialState = {}) => {
  const [fields, setFields] = useState(initialState)
  const [error, setError] = useState({})

  /**
   * Handle the change of the value in our form fields so they update in here
   *
   * @param {event} e
   */
  const handleChange = (e) => {
    const fieldValues = {
      ...fields,
      [e.target.name]: { ...fields[e.target.name], value: e.target.value },
    }

    setFields(fieldValues)
  }

  /**
   * Checks whether value is greater than 0 or empty
   *
   * @param {string} value
   * @returns {boolean} Boolean
   */
  const hasValue = (value) => value != null && value.trim().length > 0

  /**
   * Loops over the form fields object and validate each field value.
   * If a field is invalis set the formValid state to false.
   *
   * @returns {object} err, isValid
   */
  const validateFields = () => {
    let err = {}
    let isValid = false

    for (const field in fields) {
      if (hasValue(fields[field].value) === false) {
        err = {
          ...err,
          [field]: `${field} is required`,
        }
      } else if (fields[field].pattern.test(fields[field].value) === false) {
        err = {
          ...err,
          [field]: fields[field]?.errorMessage,
        }
      } else {
        err = {
          ...err,
          [field]: '',
        }
        isValid = true
      }
    }

    setError(err)

    return { err, isValid }
  }

  return { fields, handleChange, validateFields, error }
}

export { useForm }
