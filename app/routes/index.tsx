import { Link, useLoaderData } from '@remix-run/react'
import { LoaderFunction, MetaFunction } from '@remix-run/server-runtime'
import { gql } from 'graphql-request'

import { IndexQuery, Variant } from '~/__generated__/types'
import ItemIcon from '~/components/ItemIcon'
import { graphqlLoader } from '~/lib/graphql'
import { title } from '~/utils/meta'

const query = gql`
  query Index {
    me {
      username
    }
  }
`

export const loader: LoaderFunction = graphqlLoader(async ({ graphql }) =>
  graphql.request<IndexQuery>(query)
)

export const meta: MetaFunction = () => ({
  title: title('hey'),
})

export default function Index() {
  const data = useLoaderData<IndexQuery>()
  const isAuthed = !!data.me

  return (
    <>
      <div className="mx-auto max-w-4xl py-8 px-4">
        <h1 className="text-center font-display leading-headline-display text-9">
          what's everyone up to?
        </h1>
        <h3 className="text-4 font-medium text-normal mt-4 text-center">
          This is a place to find out.
        </h3>
        <div className="flex space-x-8 my-10 justify-center">
          <ItemIcon variant={Variant.Topic} />
          <ItemIcon variant={Variant.Arts} />
          <ItemIcon variant={Variant.Book} />
          <ItemIcon variant={Variant.Group} />
        </div>
        <div className="flex justify-center my-8">
          {isAuthed ? (
            <Link
              to={`/with/${data.me?.username}`}
              className="bg-white border text-black font-medium px-4 py-2 rounded-full"
            >
              view your profile
            </Link>
          ) : (
            <Link
              to="/get-started"
              className="bg-white border text-black font-medium px-4 py-2 rounded-full"
            >
              + create your profile
            </Link>
          )}
        </div>
      </div>
      <div className="text-center text-black font-medium text-5 grid grid-cols-1 sm:grid-cols-2 border-t border-b">
        <div className="border-b sm:border-r sm:border-b-0 px-4 py-8 bg-white flex items-center justify-center">
          A place to casually share what you're doing.
        </div>
        <div className="px-4 py-8 bg-white flex items-center justify-center">
          Find out more about people you already know.
        </div>
      </div>
    </>
  )
}
