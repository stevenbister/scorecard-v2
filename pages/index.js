import Auth from '../components/Auth'
import Link from 'next/link'

const Home = ({userSession}) => {

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {userSession ?
      <>
        <Link href="/profile">Profile</Link>
        <Link href="/players">Players</Link>
      </>
      : <Auth />}
    </div>
  )
}

export default Home