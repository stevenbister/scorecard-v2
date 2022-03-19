import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkOverlay, LinkBox, UnorderedList, ListItem } from '@chakra-ui/react'
import { FaGamepad, FaUserAstronaut } from 'react-icons/fa'

const Navigation = () => {
  const router = useRouter()

  return (
    <nav>
      <UnorderedList styleType="none" display="flex" m={0} color="purple.800">
        <LinkBox
          as="li"
          p={4}
          borderBottom="2px"
          borderColor={router.pathname === '/' ? 'purple.600' : 'gray.400'}
        >
          <NextLink href="/" passHref>
            <LinkOverlay>
              <FaGamepad size={28} />
              <span className="sr-only">Home</span>
            </LinkOverlay>
          </NextLink>
        </LinkBox>

        <LinkBox
          as="li"
          p={4}
          borderBottom="2px"
          borderColor={
            router.pathname === '/profile' ? 'purple.600' : 'gray.400'
          }
        >
          <NextLink href="/profile" passHref>
            <LinkOverlay>
              <FaUserAstronaut size={28} />
              <span className="sr-only">Profile</span>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
      </UnorderedList>
    </nav>
  )
}

export default Navigation
