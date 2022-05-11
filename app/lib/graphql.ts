import { GraphQLClient } from 'graphql-request'

import type {
  AppData,
  LoaderFunction,
  DataFunctionArgs,
  ActionFunction,
} from '@remix-run/server-runtime'

const getEnvVar = (name: string) => {
  // Watch out: naughty type casting
  const env = process ? process.env : (window as any).ENV

  return env[name]
}

const createGraphqlClient = (requestHeaders: Headers) =>
  new GraphQLClient(getEnvVar('API_URL'), {
    credentials: 'include',
    headers: { Cookie: requestHeaders.get('Cookie') || '' },
  })

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
): ActionFunction {
  return (actionArgs) =>
    actionFunc({
      ...actionArgs,
      graphql: createGraphqlClient(actionArgs.request.headers),
    })
}
