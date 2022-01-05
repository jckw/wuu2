import * as Popover from '@radix-ui/react-popover'
import { gql } from 'graphql-request'
import { Link, LinksFunction } from 'remix'

import { UserNavbar_UserFragment } from '~/__generated__/types'

const fragment = gql`
  fragment UserNavbar_User on User {
    name
    username
  }
`

type Props = {
  user?: UserNavbar_UserFragment | null
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/icons/user.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
]

export default function UserNavbar({ user }: Props) {
  return user ? (
    <div>
      <Popover.Root>
        <Popover.Trigger className="pl-4 pr-3 py-2 space-x-4 font-display text-4 hover:opacity-80 flex items-center">
          <div>@{user.username}</div>
          <img src="/icons/user.svg" alt="user icon" />
        </Popover.Trigger>
        <Popover.Content>
          <div
            className="bg-black text-white p-2 rounded-md flex flex-col space-y-2 transition"
            style={{ minWidth: 200 }}
          >
            <div className="px-4 py-2 font-display text-4">{user.name}</div>
            <div className="text-2">
              <Link
                to={`/with/${user.username}`}
                className="hover:bg-normal rounded-sm py-2 px-4 block transition"
              >
                View profile
              </Link>
              <a
                href="/logout"
                className="hover:bg-normal rounded-sm py-2 px-4 block transition"
              >
                Logout
              </a>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ) : (
    <div className="flex items-center">
      <Link
        to="/sign-in"
        className="px-4 py-2 underline transition hover:-translate-y-0.5 active:text-normal"
      >
        log in
      </Link>
      {/* <Link
        to="/get-started"
        className="block px-4 py-2 rounded-full border bg-white transition hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-pink active:translate-x-0 active:translate-y-0"
      >
      </Link> */}
      <Link
        to="/get-started"
        className="block px-4 py-2 rounded-full border bg-white transition hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-pink active:translate-x-0 active:translate-y-0"
      >
        {/* create your profile */}
        sign up
      </Link>
    </div>
  )
}

UserNavbar.fragment = fragment
