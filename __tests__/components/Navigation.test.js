import { render, screen } from '@testing-library/react'
import Navigation from '../../components/Navigation'

describe('Navigation', () => {
  test('renders the nav', () => {
    render(<Navigation />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
