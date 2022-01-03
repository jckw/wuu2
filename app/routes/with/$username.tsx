import { gql } from 'graphql-request'
import {
  LoaderFunction,
  MetaFunction,
  useCatch,
  useLoaderData,
  useParams,
} from 'remix'

import { ProfileQuery } from '~/__generated__/types'
import AddItemSquare from '~/components/AddItemSquare'
import Item from '~/components/Item'
import graphqlClient from '~/lib/graphqlClient'
import { title } from '~/utils/meta'

const query = gql`
  query Profile($username: String!) {
    user(username: $username) {
      name
      username
      items {
        slug
        title
        subtitle
        summary
        variant
      }
    }
  }
`

export const loader: LoaderFunction = async ({ params }) => {
  const data = await graphqlClient.request<ProfileQuery>(query, params)

  if (!data.user) {
    throw new Response('Not found', { status: 404 })
  }

  return data
}

export const meta: MetaFunction = ({ data, params }) => ({
  title: params.username && data ? title(params.username) : 'wuu.. who?',
})

export default function UserProfile() {
  const data = useLoaderData<ProfileQuery>()
  const params = useParams()

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,

        maxWidth: 768,
        margin: 'auto',

        marginTop: 16,
      }}
    >
      <div className="px-4">
        <h1 className="text-7 font-display">jack weatherilt</h1>
        <div className="font-medium">
          @{params.username} · Updated 3 hrs ago
        </div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        }}
      >
        <AddItemSquare />
        {data.user?.items.map((d) => (
          <Item key={d.slug} {...d} />
        ))}
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let message: React.ReactNode
  switch (caught.status) {
    case 404:
      message = (
        <div>
          <h1 className="font-display text-7 text-center">wuu... who?</h1>
          <p className="text-normal text-center">
            Looks like this profile doesn't exist.
          </p>
        </div>
      )
      break
    default:
      message = (
        <>
          <h2>Oops!</h2>
          <p>
            There was a problem with your request!
            <br />
            {caught.status} {caught.statusText}
          </p>
        </>
      )
  }
  return <div className="max-w-screen-md mx-auto px-4">{message}</div>
}
