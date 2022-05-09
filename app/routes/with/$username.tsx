import { LoaderFunction, MetaFunction } from '@remix-run/server-runtime'
import { useCatch, useLoaderData, useParams } from '@remix-run/react'
import { gql } from 'graphql-request'

import { ProfileQuery } from '~/__generated__/types'
import AddItemSquare from '~/components/AddItemSquare'
import Item from '~/components/Item'
import { graphqlLoader } from '~/lib/graphql'
import { title } from '~/utils/meta'
import { formatISODistance } from '~/utils/time'

const query = gql`
  query Profile($username: String!) {
    me {
      username
    }
    user(username: $username) {
      name
      username
      updatedAt
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

export const loader: LoaderFunction = graphqlLoader(
  async ({ params, graphql }) => {
    const data = await graphql.request<ProfileQuery>(query, params)

    if (!data.user) {
      throw new Response('Not found', { status: 404 })
    }

    return data
  }
)

export const meta: MetaFunction = ({ data, params }) => ({
  title: params.username && data ? title(`@${params.username}`) : 'wuu.. who?',
})

export default function UserProfile() {
  const data = useLoaderData<ProfileQuery>()
  const params = useParams()

  const isOwnPage = data.me?.username === data.user?.username

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
        <h1 className="text-7 font-display">{data.user?.name}</h1>
        <div className="font-medium">
          @{params.username} · Updated {formatISODistance(data.user?.updatedAt)}
        </div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        }}
      >
        {isOwnPage && <AddItemSquare />}
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
