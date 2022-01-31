import useSession from '../hooks/useSession'
import Auth from '../components/Auth'
import Link from 'next/link'

const Home = () => {
  const session = useSession()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {session ? <Link href="/profile">Profile</Link> : <Auth />}
    </div>
  )
}

export default Home