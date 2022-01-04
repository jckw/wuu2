import { gql } from 'graphql-request'
import {
  Link,
  LoaderFunction,
  MetaFunction,
  useCatch,
  useLoaderData,
  useParams,
} from 'remix'

import { ProfileItemQuery } from '~/__generated__/types'
import ItemIcon from '~/components/ItemIcon'
import { graphqlLoader } from '~/lib/graphql'
import { title } from '~/utils/meta'
import { formatISODistance } from '~/utils/time'

const query = gql`
  query ProfileItem($username: String!, $itemSlug: String!) {
    profileItem(username: $username, itemSlug: $itemSlug) {
      id
      title
      subtitle
      summary
      variant
      updatedAt
      user {
        name
      }
    }
  }
`

export const loader: LoaderFunction = graphqlLoader(
  async ({ params, graphql }) => {
    const data = await graphql.request<ProfileItemQuery>(query, params)

    if (!data.profileItem) {
      throw new Response('Not found', { status: 404 })
    }

    return data
  }
)

export const meta: MetaFunction = ({ data, params }) => ({
  title:
    params.username && data
      ? title(data.profileItem.title, params.username)
      : 'wuu... who?',
})

export default function UserProfile() {
  const data = useLoaderData<ProfileItemQuery>()
  const params = useParams()

  const item = data.profileItem!

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,

        maxWidth: 640,
        margin: 'auto',
      }}
    >
      <Link to={`/with/${params.username}`} className="group">
        <div className="px-4 mb-6">
          <div className="font-display text-4">
            <span className="font-sans text-normal group-hover:text-black">
              &larr;
            </span>{' '}
            {item.user.name}
          </div>
          <div className="font-medium text-1">
            @{params.username} · Updated{' '}
            {formatISODistance(data.profileItem?.updatedAt)}
          </div>
        </div>
      </Link>
      <div className="px-4">
        <ItemIcon variant={item.variant} />
        <h1 className="text-7 font-display mt-4 leading-headline">
          {item.title}
        </h1>
        <h2 className="text-4 font-medium text-pale mb-4">{item.subtitle}</h2>
        {item.summary.split('\n').map((para, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i} className="text-3 text-normal">
            {para}
          </p>
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
          <h1 className="font-display text-7 text-center leading-headline">
            wuu... what?
          </h1>
          <p className="text-normal text-center">
            Looks like this item doesn't exist.
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
