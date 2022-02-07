import Link from 'next/link'

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/players">Players</Link>
      </li>
    </ul>
  )
}

export default Navigation
