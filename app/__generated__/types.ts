export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date with time (isoformat) */
  DateTime: any
  /** The GenericScalar scalar type represents a generic GraphQL scalar value that could be: List or Object. */
  JSONScalar: any
}

export type Mutation = {
  __typename?: 'Mutation'
  addItem: ProfileItem
  signIn: UserForm
  signOut: Scalars['Boolean']
  signUp: UserForm
}

export type MutationAddItemArgs = {
  data: ProfileItemInput
}

export type MutationSignInArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationSignUpArgs = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type ProfileItem = {
  __typename?: 'ProfileItem'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  slug: Scalars['String']
  subtitle: Scalars['String']
  summary: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  user: User
  variant: Variant
}

export type ProfileItemInput = {
  subtitle: Scalars['String']
  summary: Scalars['String']
  title: Scalars['String']
  variant: Variant
}

export type Query = {
  __typename?: 'Query'
  me?: Maybe<User>
  profileItem?: Maybe<ProfileItem>
  user?: Maybe<User>
  users: Array<User>
}

export type QueryProfileItemArgs = {
  itemSlug: Scalars['String']
  username: Scalars['String']
}

export type QueryUserArgs = {
  username: Scalars['String']
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  id: Scalars['ID']
  items: Array<ProfileItem>
  name: Scalars['String']
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserForm = {
  __typename?: 'UserForm'
  user?: Maybe<User>
  validationErrors?: Maybe<Scalars['JSONScalar']>
}

export enum Variant {
  Arts = 'ARTS',
  Book = 'BOOK',
  Group = 'GROUP',
  Topic = 'TOPIC',
}

export type UserNavbar_UserFragment = {
  __typename?: 'User'
  name: string
  username: string
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?:
    | { __typename?: 'User'; username: string; name: string }
    | null
    | undefined
}

export type AddMutationVariables = Exact<{
  params: ProfileItemInput
}>

export type AddMutation = {
  __typename?: 'Mutation'
  addItem: {
    __typename?: 'ProfileItem'
    slug: string
    user: { __typename?: 'User'; username: string }
  }
}

export type GetStartedMutationVariables = Exact<{
  name: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  email: Scalars['String']
}>

export type GetStartedMutation = {
  __typename?: 'Mutation'
  signUp: {
    __typename?: 'UserForm'
    validationErrors?: any | null | undefined
    user?: { __typename?: 'User'; username: string } | null | undefined
  }
}

export type IndexQueryVariables = Exact<{ [key: string]: never }>

export type IndexQuery = {
  __typename?: 'Query'
  me?: { __typename?: 'User'; username: string } | null | undefined
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; signOut: boolean }

export type SignInMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type SignInMutation = {
  __typename?: 'Mutation'
  signIn: {
    __typename?: 'UserForm'
    validationErrors?: any | null | undefined
    user?:
      | { __typename?: 'User'; email: string; username: string }
      | null
      | undefined
  }
}

export type ProfileItemQueryVariables = Exact<{
  username: Scalars['String']
  itemSlug: Scalars['String']
}>

export type ProfileItemQuery = {
  __typename?: 'Query'
  profileItem?:
    | {
        __typename?: 'ProfileItem'
        id: string
        title: string
        subtitle: string
        summary: string
        variant: Variant
        updatedAt: any
        user: { __typename?: 'User'; name: string }
      }
    | null
    | undefined
}

export type ProfileQueryVariables = Exact<{
  username: Scalars['String']
}>

export type ProfileQuery = {
  __typename?: 'Query'
  me?: { __typename?: 'User'; username: string } | null | undefined
  user?:
    | {
        __typename?: 'User'
        name: string
        username: string
        updatedAt: any
        items: Array<{
          __typename?: 'ProfileItem'
          slug: string
          title: string
          subtitle: string
          summary: string
          variant: Variant
        }>
      }
    | null
    | undefined
}
