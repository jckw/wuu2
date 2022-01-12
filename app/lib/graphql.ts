import { GraphQLClient } from 'graphql-request'

import type {
  AppData,
  LoaderFunction,
  DataFunctionArgs,
} from '@remix-run/server-runtime'

const createGraphqlClient = (requestHeaders: Headers) =>
  new GraphQLClient(
    process.env.NODE_ENV === 'production'
      ? 'https://api.wuu2.app/graphql'
      : 'http://localhost:8000/graphql',
    {
      credentials: 'include',
      headers: { Cookie: requestHeaders.get('Cookie') || '' },
    }
  )

interface GraphQLDataFunctionArgs extends DataFunctionArgs {
  graphql: GraphQLClient
}

export interface GraphQLLoaderFunction {
  (args: GraphQLDataFunctionArgs):
    | Promise<Response>
    | Response
    | Promise<AppData>
    | AppData
}

export function graphqlLoader(
  loaderFunc: GraphQLLoaderFunction
): LoaderFunction {
  return (loaderArgs) =>
    loaderFunc({
      ...loaderArgs,
      graphql: createGraphqlClient(loaderArgs.request.headers),
    })
}

export interface GraphQLActionFunction {
  (args: GraphQLDataFunctionArgs):
    | Promise<Response>
    | Response
    | Promise<AppData>
    | AppData
}

export function graphqlAction(
  actionFunc: GraphQLActionFunction
): LoaderFunction {
  return (actionArgs) =>
    actionFunc({
      ...actionArgs,
      graphql: createGraphqlClient(actionArgs.request.headers),
    })
}
