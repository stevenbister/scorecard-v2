import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Profile from '../../pages/profile'
import ProfileForm from '../../components/ProfileForm'
import * as util from '../../utils/manageProfile'

test('Renders the profile form', () => {
  render(<ProfileForm />)

  expect(screen.getByRole('form')).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeDisabled()
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
  expect(
    screen.getByRole('button', {
      name: /update/i,
    }),
  ).toBeInTheDocument()
})

test('Successfully submits the form', async () => {
  const originalGetProfile = util.getProfile
  const originalUpdateProfile = util.updateProfile

  const fakeUser = {
    email: 'example@example.com',
    username: 'exampleName',
  }

  util.getProfile = jest.fn(() => Promise.resolve(fakeUser))
  util.updateProfile = jest.fn(() => {})

  render(<Profile />)

  const form = screen.getByRole('form')
  const userNameInput = screen.getByLabelText(/username/i)

  userEvent.type(userNameInput, fakeUser.username)
  expect(userNameInput).toHaveValue(fakeUser.username)

  fireEvent.submit(form)

  await waitFor(() => expect(util.updateProfile).toHaveBeenCalledTimes(1))

  jest.clearAllMocks()
  // Reset to original implementation after the te  st
  util.getProfile.mockImplementation(originalGetProfile)
  util.updateProfile.mockImplementation(originalUpdateProfile)
})
