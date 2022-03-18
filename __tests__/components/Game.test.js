import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createClient } from '@supabase/supabase-js'
import Game from '../../components/Game'

// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY,
// )

// Clear out db before tests run
// beforeAll(() => {
//   try {
//     // TODO: Make this a utility function so we can use elsewhere
//     const deleteAllRows = async () => {
//       const { data: games, error } = await supabaseAdmin
//         .from('games')
//         .select('id')

//       if (error) console.error(error)

//       for (const game of games) {
//         const { data, error } = await supabaseAdmin
//           .from('games')
//           .delete()
//           .match({ id: game.id })
//       }
//     }

//     deleteAllRows()
//   } catch (error) {
//     console.error(error)
//   }
// })

// const testUser = {
//   id: process.env.SUPABASE_TEST_USER_ID,
// }

test.skip('Starts a game when the create game button is clicked', async () => {
  render(<Game user={testUser} />)

  const startButton = screen.getByText(/create game/i)

  expect(startButton).toBeInTheDocument()

  userEvent.click(startButton)

  await screen.findByText(/pin/i)
  await waitFor(() =>
    expect(screen.queryByText(/end game/i)).toBeInTheDocument(),
  )
  await waitFor(() => expect(screen.getByText(/pin/i)).toBeInTheDocument())

  expect(startButton).toBeDisabled()
})

test.skip('Ends the game instance when end game button is clicked', async () => {
  render(<Game user={testUser} />)

  // Ensure the game has started
  const startButton = screen.getByText(/create game/i)
  userEvent.click(startButton)

  await waitFor(() =>
    expect(screen.queryByText(/end game/i)).toBeInTheDocument(),
  )

  userEvent.click(screen.queryByText(/end game/i))

  await waitFor(() =>
    expect(screen.queryByText(/end game/i)).not.toBeInTheDocument(),
  )
})

test.skip('Shows error message if the game fails to generate', async () => {
  // Mock our error message so we don't log to our test console
  const errorObject = console.error //store the state of the object
  console.error = jest.fn() // mock the object

  // Render game without the user object so we can simulate a case
  // where an error might occur
  render(<Game />)

  const startButton = screen.getByText(/create game/i)
  userEvent.click(startButton)

  await screen.findByText(/something went wrong/i)

  expect(screen.queryByText(/end game/i)).not.toBeInTheDocument()

  console.error = errorObject // assign it back so you can use it in the next test
})
