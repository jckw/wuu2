import React from 'react'
import {
  Link,
  LoaderFunction,
  MetaFunction,
  useCatch,
  useLoaderData,
} from 'remix'

import ItemIcon from '~/components/ItemIcon'
import { DATA, Interest } from '~/schema/temp'

function InterestItem({ id, title, subtitle, body, category }: Interest) {
  return (
    <Link to={id}>
      <div
        className="item"
        style={{
          margin: 16,
          gap: 8,
          // display: 'grid',
          // alignContent: 'start',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: '222px',
        }}
      >
        <div>
          <ItemIcon variant={category} />
        </div>
        <div
          className="grid h-fit min-h-0"
          style={{
            gap: 4,
            flexGrow: 1,
            alignContent: 'start',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.65) 66%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <h3 className="text-3 font-medium">{title}</h3>
          {subtitle && (
            <h4 className="font-medium text-2 text-pale">{subtitle}</h4>
          )}
          {body.split('\n').map((para) => (
            <p className="text-2 text-normal">{para}</p>
          ))}
        </div>
      </div>
    </Link>
  )
}

export const loader: LoaderFunction = async ({ params }) => {
  if (params.username !== 'jack') {
    throw new Response('Not found', { status: 404 })
  }

  return { params }
}

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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        }}
      >
        {DATA.map((d) => (
          <InterestItem key={d.title} {...d} />
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

export const meta: MetaFunction = ({ data }) => ({
  title: data ? `@${data.params.username} · wuu2` : 'wuu... who?',
})
