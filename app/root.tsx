import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react'
import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { gql } from 'graphql-request'
import React from 'react'

import { MeQuery } from './__generated__/types'
import UserNavbar from './components/UserNavbar'
import { graphqlLoader } from './lib/graphql'

import globalStyles from './styles/global.css'
import styles from './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: globalStyles,
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap&text=↑→↓←✓',
  },
  {
    rel: 'stylesheet',
    href: 'https://use.typekit.net/unv5hzx.css',
  },
  {
    rel: 'preload',
    href: '/icons/wuu2.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#9b7ebb' },
]

export const meta: MetaFunction = () => ({
  'msapplication-TileColor': '#da532c',
  'theme-color': '#ffffff',
})

const query = gql`
  query Me {
    me {
      username
      ...UserNavbar_User
    }
  }

  ${UserNavbar.fragment}
`

export const loader: LoaderFunction = graphqlLoader(async ({ graphql }) => {
  const data = await graphql.request<MeQuery>(query)

  return data
})

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData<MeQuery>()

  return (
    <Document>
      <div className="pb-8 leading-normal font-sans">
        <div className="p-2 flex justify-between items-center flex-wrap">
          <Link to="/">
            <img src="/icons/wuu2.svg" alt="wuu2" />
          </Link>
          <UserNavbar user={data.me} />
        </div>
        <Outlet />
      </div>
    </Document>
  )
}

function ErrorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md p-4 mx-auto">
      <div className="mb-6 flex justify-center">
        <img src="/icons/wuu2.svg" alt="wuu2" />
      </div>
      {children}
    </div>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <ErrorLayout>
        <h1 className="font-display text-5">There was an error</h1>
        <p>{error.message}</p>
        <hr />
        <p>
          Hey, developer, you should replace this with what you want your users
          to see.
        </p>
      </ErrorLayout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ErrorLayout>
        <h1 className="font-display text-5">
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </ErrorLayout>
    </Document>
  )
}
