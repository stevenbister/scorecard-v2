import Game from '../components/Game'

const Home = ({ userSession }) => {
  return (
    <div className="container" style={{ padding: '50px' }}>
      <Game />
    </div>
  )
}

export default Home
