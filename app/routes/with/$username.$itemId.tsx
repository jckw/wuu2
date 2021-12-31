import React from 'react'
import {
  Link,
  LoaderFunction,
  MetaFunction,
  useCatch,
  useLoaderData,
} from 'remix'

import ItemIcon from '~/components/ItemIcon'
import { DATA } from '~/schema/temp'

const validItemIds = DATA.map((item) => item.id)

export const loader: LoaderFunction = async ({ params }) => {
  if (
    params.username !== 'jack' ||
    !params.itemId ||
    !validItemIds.includes(params.itemId)
  ) {
    throw new Response('Not found', { status: 404 })
  }

  const item = DATA.find((x) => x.id === params.itemId)!

  return { params, item }
}

export default function UserProfile() {
  const data = useLoaderData()

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,

        maxWidth: 640,
        margin: 'auto',
      }}
    >
      <Link to={`/with/${data.params.username}`}>
        <div className="px-4 mb-6">
          <div className="font-display text-4">jack weatherilt</div>
          <div className="font-medium text-1">
            @{data.params.username} · Updated 3 hrs ago
          </div>
        </div>
      </Link>
      <div className="px-4">
        <ItemIcon variant={data.item.category} />
        <h1 className="text-7 font-display mt-4 leading-headline">
          {data.item.title}
        </h1>
        <h2 className="text-4 font-medium text-pale mb-4">
          {data.item.subtitle}
        </h2>
        {data.item.body.split('\n').map((para) => (
          <p className="text-3 text-normal">{para}</p>
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

export const meta: MetaFunction = ({ data }) => ({
  title: data
    ? `${data.item.title} · @${data.params.username} · wuu2`
    : 'wuu... who?',
})
