import Link from 'next/link'

const Home = ({userSession}) => {

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <>
        <Link href="/profile">Profile</Link>
        <Link href="/players">Players</Link>
      </>
    </div>
  )
}

export default Home