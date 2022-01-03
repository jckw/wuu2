import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'
import {
  ActionFunction,
  Form,
  MetaFunction,
  redirect,
  useLoaderData,
} from 'remix'

import { SignInMutation } from '~/__generated__/types'
import Input from '~/components/Input'
import { graphqlAction } from '~/lib/graphql'
import { title } from '~/utils/meta'

export const meta: MetaFunction = () => ({
  title: title('Sign in'),
})

type FieldValues = {
  email: string
  password: string
}

const mutation = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      email
      username
    }
  }
`

export const action: ActionFunction = graphqlAction(
  async ({ request, graphql }) => {
    const body = await request.formData()

    const { data, headers } = await graphql.rawRequest<SignInMutation>(
      mutation,
      {
        email: body.get('email'),
        password: body.get('password'),
      }
    )

    if (!data.signIn) {
      return { error: "couldn't sign in" }
    }

    console.log(headers.get('set-cookie'))
    return redirect('/', {
      headers: { 'set-cookie': headers.get('set-cookie') || '' },
    })
  }
)

export default function SignIn() {
  const { register } = useForm<FieldValues>()
  const data = useLoaderData()
  console.log(data)

  return (
    <div className="flex flex-col items-stretch pb-6 max-w-sm mx-auto">
      <div className="flex items-center space-x-3 mb-5 justify-start">
        <img src="/icons/smiley.svg" alt="smiley" />
        <h1 className="text-5 font-bold leading-headline">Sign in</h1>
      </div>
      <div className="border border-black rounded-2xl p-8 bg-white">
        <Form className="space-y-8" method="post">
          <Input id="email" label="Email" type="email" {...register('email')} />
          <Input
            id="password"
            label="Password"
            type="password"
            {...register('password')}
          />
          <button
            type="submit"
            className="rounded-lg px-4 py-2 w-full bg-black text-white hover:scale-105 transition-transform active:scale-100"
          >
            Log in
          </button>
        </Form>
      </div>
    </div>
  )
}
