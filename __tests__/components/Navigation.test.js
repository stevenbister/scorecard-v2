import { render, screen } from '@testing-library/react'
import Navigation from '../../components/Navigation'
import * as nextRouter from 'next/router'

test('renders the nav', () => {
  const useRouter = jest.spyOn(nextRouter, 'useRouter')

  useRouter.mockImplementationOnce(() => ({
    route: '/',
  }))

  render(<Navigation />)

  expect(screen.getByRole('navigation')).toBeInTheDocument()

  expect(screen.getAllByRole('listitem')).toHaveLength(2)

  expect(
    screen.getByRole('link', {
      name: /home/i,
    }),
  ).toHaveAttribute('href', '/')

  expect(
    screen.getByRole('link', {
      name: /profile/i,
    }),
  ).toHaveAttribute('href', '/profile')
})
