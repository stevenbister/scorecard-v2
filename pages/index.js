import Game from '../components/Game'
import { supabase } from '../utils/supabaseClient'

const Home = () => {
  return (
    <div className="container" style={{ padding: '50px' }}>
      <Game />
    </div>
  )
}

export default Home

export async function getServerSideProps({ req }) {
  // check to see if a user is set
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // if no user is set, redirect to the sign-in page
  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }

  // if a user is set, pass it to the page via props
  return { props: { user } }
}
