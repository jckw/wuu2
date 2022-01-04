import { gql } from 'graphql-request'
import { LoaderFunction, redirect } from 'remix'

import { LogoutMutation } from '~/__generated__/types'
import { graphqlLoader } from '~/lib/graphql'

const mutation = gql`
  mutation Logout {
    signOut
  }
`

export const loader: LoaderFunction = graphqlLoader(async ({ graphql }) => {
  const { headers } = await graphql.rawRequest<LogoutMutation>(mutation)

  const rawHeaders = headers.raw()
  const setCookies = rawHeaders['set-cookie'] as string[]
  return redirect('/', {
    headers: setCookies.map((c) => ['set-cookie', c]),
  })
})
