import { GraphQLClient } from 'graphql-request'

const graphqlClient = new GraphQLClient(
  process.env.NODE_ENV === 'production'
    ? 'https://wuu2-app.herokuapp.com/graphql'
    : 'http://localhost:8000/graphql',
  {
    credentials: 'include',
  }
)

export default graphqlClient
