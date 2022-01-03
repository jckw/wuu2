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
}

export type Mutation = {
  __typename?: 'Mutation'
  addItem: ProfileItem
  completeProfile: User
  signIn?: Maybe<User>
  signOut: Scalars['Boolean']
  signUp?: Maybe<User>
}

export type MutationAddItemArgs = {
  data: ProfileItemInput
}

export type MutationCompleteProfileArgs = {
  name: Scalars['String']
  username: Scalars['String']
}

export type MutationSignInArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationSignUpArgs = {
  email: Scalars['String']
  password: Scalars['String']
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
  username: Scalars['String']
}

export enum Variant {
  Arts = 'ARTS',
  Book = 'BOOK',
  Group = 'GROUP',
  Topic = 'TOPIC',
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
      }
    | null
    | undefined
}

export type ProfileQueryVariables = Exact<{
  username: Scalars['String']
}>

export type ProfileQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        name: string
        username: string
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
