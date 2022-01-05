import { gql } from 'graphql-request'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActionFunction,
  Form,
  MetaFunction,
  redirect,
  useActionData,
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
      user {
        email
        username
      }
      validationErrors
    }
  }
`

export const action: ActionFunction = graphqlAction(
  async ({ request, graphql }) => {
    const body = await request.formData()
    const params = Object.fromEntries(body)

    const { data, headers } = await graphql.rawRequest<SignInMutation>(
      mutation,
      params
    )

    if (!data.signIn.user) {
      return data
    }

    const rawHeaders = headers.raw()
    const setCookies = rawHeaders['set-cookie'] as string[]
    return redirect(`/with/${data.signIn.user.username}`, {
      headers: setCookies.map((c) => ['set-cookie', c]),
    })
  }
)

export default function SignIn() {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm<FieldValues>()

  // TODO: Extract to hook. See routes/get-started.tsx
  const data = useActionData<SignInMutation>()
  const validationErrors: Record<keyof FieldValues, string> =
    data?.signIn.validationErrors || {}
  const validationErrorsStr = JSON.stringify(validationErrors)
  useEffect(() => {
    Object.entries(validationErrors).map((k) =>
      setError(k[0] as keyof FieldValues, { type: 'server', message: k[1] })
    )
  }, [validationErrorsStr])

  return (
    <div className="flex flex-col items-stretch pb-6 max-w-sm mx-auto">
      <div className="flex items-center space-x-3 mb-5 justify-start">
        <img src="/icons/smiley.svg" alt="smiley" />
        <h1 className="text-5 font-bold leading-headline">Sign in</h1>
      </div>
      <div className="border border-black rounded-2xl p-8 bg-white">
        <Form className="space-y-8" method="post">
          <Input
            id="email"
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password}
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
