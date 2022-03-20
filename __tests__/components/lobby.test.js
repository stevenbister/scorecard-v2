import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../../lib/auth/AuthContext'
import { GameContext, GameProvider } from '../../lib/game/GameContext'
import Lobby from '../../pages/lobby'
import Home from '../../pages/index'
import * as mockUseAuth from '../../lib/auth/useAuth'
import * as mockUseProfile from '../../lib/profile/useProfile'

const testUser = {
  id: process.env.SUPABASE_TEST_USER_ID,
  username: 'TestUser',
}

const testUser2 = {
  id: 12345,
  username: 'TestUser2',
}

beforeEach(() => {
  jest.spyOn(mockUseAuth, 'useAuth').mockImplementation(() => ({
    user: {
      id: testUser.id,
    },
    loggedIn: true,
  }))

  // TODO: Mock this globally
  jest.spyOn(mockUseProfile, 'useProfile').mockImplementation(() => testUser)

  // Aviod issue with websockets causing jest to freak out
  jest.useFakeTimers()
})

test('Renders the start and join links on the homepage once user is signed in', () => {
  render(
    <AuthProvider>
      <GameProvider>
        <Home user={testUser} />
      </GameProvider>
    </AuthProvider>,
  )

  expect(
    screen.getByRole('link', {
      name: /start a game/i,
    }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole('link', {
      name: /join a game/i,
    }),
  ).toBeInTheDocument()
})

describe('Host view', () => {
  test('Renders the host view of the lobby', async () => {
    // Can't for the life of me get this to work on actually clicking the button with RTL
    // I'm constantly getting an error about next/link. Will test this interaction with
    // Cypress in the e2e test. Will just mock up here for now
    const mockContext = {
      host: process.env.SUPABASE_TEST_USER_ID,
      pin: 12345,
      players: [{ id: testUser.id }],
      leaveGame: () => jest.fn(),
      endGame: () => jest.fn(),
    }

    render(
      <AuthProvider>
        <GameContext.Provider value={mockContext}>
          <Lobby />
        </GameContext.Provider>
      </AuthProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: `Pin: ${mockContext.pin}` }),
    ).toBeInTheDocument()

    expect(await screen.findByTitle(testUser.username)).toBeInTheDocument()
    expect(await screen.findAllByText(testUser.username)).toHaveLength(2)

    expect(
      await screen.findByText(/waiting for players.../i),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('button', { name: /end game/i }),
    ).toBeInTheDocument()
  })

  test('Opens alert message when host clicks the end game button', async () => {
    const mockContext = {
      host: testUser.id,
      pin: 12345,
      players: [{ id: process.env.SUPABASE_TEST_USER_ID }],
      leaveGame: () => jest.fn(),
      endGame: () => jest.fn(),
    }

    render(
      <AuthProvider>
        <GameContext.Provider value={mockContext}>
          <Lobby />
        </GameContext.Provider>
      </AuthProvider>,
    )

    const endGameButton = screen.getByRole('button', { name: /end game/i })

    userEvent.click(endGameButton)

    expect(
      await screen.findByText('Are you sure you want to end the game?'),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('button', { name: /yes/i }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('button', { name: /no/i }),
    ).toBeInTheDocument()
  })
})

describe('Guest view', () => {
  test('Renders the guests view of the lobby', () => {
    render(
      <AuthProvider>
        <GameProvider>
          <Lobby />
        </GameProvider>
      </AuthProvider>,
    )

    expect(
      screen.getByRole('heading', { name: /join a game/i }),
    ).toBeInTheDocument()

    expect(screen.getByText(/enter pin/i)).toBeInTheDocument()

    expect(
      screen.getAllByRole('textbox', { name: 'Please enter your pin code' }),
    ).toHaveLength(5)

    expect(
      screen.getByRole('button', { name: /join game/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /exit/i })).toBeInTheDocument()
  })

  test('Guest can join an active game', async () => {
    const mockContext = {
      joinGame: jest.fn(),
    }

    render(
      <AuthProvider>
        <GameContext.Provider value={mockContext}>
          <Lobby />
        </GameContext.Provider>
      </AuthProvider>,
    )

    const pinInputs = screen.getAllByRole('textbox', {
      name: 'Please enter your pin code',
    })

    pinInputs.forEach((input, i) => {
      userEvent.type(input, `${i}`)
    })

    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => expect(mockContext.joinGame).toHaveBeenCalledTimes(1))
  })

  test('Shows the players list when in the lobby', async () => {
    const useProfileSpy = jest.spyOn(mockUseProfile, 'useProfile')

    useProfileSpy.mockImplementationOnce(() => testUser)
    useProfileSpy.mockImplementationOnce(() => testUser2)

    const mockContext = {
      pin: 12345,
      players: [{ id: testUser.id }, { id: testUser2.id }],
      leaveGame: () => jest.fn(),
      endGame: () => jest.fn(),
    }

    render(
      <AuthProvider>
        <GameContext.Provider value={mockContext}>
          <Lobby />
        </GameContext.Provider>
      </AuthProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: `Pin: ${mockContext.pin}` }),
    ).toBeInTheDocument()

    expect(await screen.findByTitle(testUser.username)).toBeInTheDocument()
    expect(await screen.findAllByText(testUser.username)).toHaveLength(2)

    expect(await screen.findByTitle(testUser2.username)).toBeInTheDocument()
    expect(await screen.findAllByText(testUser2.username)).toHaveLength(2)

    expect(
      await screen.findByText(/waiting for game to start.../i),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('button', { name: /leave game/i }),
    ).toBeInTheDocument()
  })
})
