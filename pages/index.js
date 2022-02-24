import Game from '../components/Game'
import { supabase } from '../utils/supabaseClient'
const user = supabase.auth.user()

const Home = ({ userSession }) => {
  return (
    <div className="container" style={{ padding: '50px' }}>
      <Game user={user} />
    </div>
  )
}

export default Home
