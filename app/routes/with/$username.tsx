import { LoaderFunction, MetaFunction, useCatch, useLoaderData } from 'remix'

import AddItemSquare from '~/components/AddItemSquare'
import Item from '~/components/Item'
import { DATA } from '~/schema/temp'
import { title } from '~/utils/meta'

export const loader: LoaderFunction = async ({ params }) => {
  if (params.username !== 'jack') {
    throw new Response('Not found', { status: 404 })
  }

  return { params }
}

export const meta: MetaFunction = ({ data }) => ({
  title: data ? title(data.params.username) : 'wuu.. who?',
})

export default function UserProfile() {
  const data = useLoaderData()

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
          @{data.params.username} · Updated 3 hrs ago
        </div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        }}
      >
        <AddItemSquare />
        {DATA.map((d) => (
          <Item key={d.title} {...d} />
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
