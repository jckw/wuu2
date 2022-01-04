import { gql } from 'graphql-request'
import sample from 'lodash/sample'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
} from 'remix'

import { GetStartedMutation } from '~/__generated__/types'
import Input from '~/components/Input'
import { graphqlAction } from '~/lib/graphql'
import { title } from '~/utils/meta'
import { usernameRegEx } from '~/utils/username'

export const meta: MetaFunction = () => ({
  title: title('Get started'),
})

type FieldValues = {
  name: string
  username: string
  email: string
  password: string
}

type GetStartedData = {
  placeholder: Omit<FieldValues, 'password'>
}

export const loader: LoaderFunction = (): GetStartedData => ({
  placeholder: sample<Omit<FieldValues, 'password'>>([
    {
      name: 'Audrey Hepburn',
      username: 'audrey.hep',
      email: 'audreyhepburn@hotmail.com',
    },
    {
      name: 'Albert Einstein',
      username: 'ali.einstein4',
      email: 'a.einstein@ias.edu',
    },
    {
      name: 'Henry Tudor',
      username: 'henry8',
      email: 'henry8@royal.uk',
    },
    {
      name: 'Ada Lovelace',
      username: 'lovelace',
      email: 'ada@lovelace.net',
    },
    {
      name: 'Amelia Earhart',
      username: 'amelia.e',
      email: 'amelia.earhart@gmail.com',
    },
    {
      name: 'Genghis K.',
      username: 'genghis',
      email: 'khangenghis@yahoo.com',
    },
  ])!,
})

const mutation = gql`
  mutation GetStarted(
    $name: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    signUp(
      name: $name
      username: $username
      password: $password
      email: $email
    ) {
      user {
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

    const { data, headers } = await graphql.rawRequest<GetStartedMutation>(
      mutation,
      params
    )

    if (!data.signUp.user) {
      return data
    }

    const rawHeaders = headers.raw()
    const setCookies = rawHeaders['set-cookie'] as string[]
    return redirect(`/with/${data.signUp.user.username}`, {
      headers: setCookies.map((c) => ['set-cookie', c]),
    })
  }
)

export default function GetStarted() {
  const {
    setError,
    register,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onBlur' })

  const { placeholder } = useLoaderData<GetStartedData>()

  // TODO: Extract to hook
  const data = useActionData<GetStartedMutation>()
  const validationErrors: Record<keyof FieldValues, string> =
    data?.signUp.validationErrors || {}
  const validationErrorsStr = JSON.stringify(validationErrors)
  useEffect(() => {
    Object.entries(validationErrors).map((k) =>
      setError(k[0] as keyof FieldValues, { type: 'server', message: k[1] })
    )
  }, [validationErrorsStr])

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <h1 className="text-5 font-semibold text-center leading-headline">
        Let's set you up
      </h1>

      <Form method="post">
        <div className="flex flex-col space-y-8 mt-16">
          <Input
            id="name"
            label="Name"
            hint="This is what we'll show on your public profile. Maybe include your surname, or at least the surname initial."
            placeholder={placeholder.name}
            type="text"
            {...register('name', {
              required: "You need a name, even if it's not your full one.",
            })}
            error={errors.name}
          />
          <Input
            id="username"
            label="Username"
            placeholder={placeholder.username}
            type="text"
            {...register('username', {
              required: 'You have to have a username.',
              pattern: {
                value: usernameRegEx,
                message:
                  'Your username can only include A-z, 0-9, and a full-stop.',
              },
            })}
            hint="You can keep it simple, you're one of the first people here."
            error={errors.username}
          />
          <Input
            id="email"
            label="Email"
            placeholder={placeholder.email}
            type="email"
            hint="Just in case we need to contact you. We won't spam, promise."
            {...register('email', {
              required: "You'll need an email address to log in.",
            })}
            error={errors.email}
          />
          <Input
            id="password"
            label="Password"
            placeholder="••••••••"
            hint="At least 8 characters long."
            type="password"
            {...register('password', {
              required: "You'll need an password to log in.",
              minLength: {
                value: 8,
                message: 'It needs to be longer than this!',
              },
            })}
            error={errors.password}
          />
        </div>
        <button
          type="submit"
          className="mt-8 disabled:opacity-75 rounded-lg px-4 py-2 w-full bg-black text-white hover:scale-105 transition-transform active:scale-100"
        >
          Create account
        </button>
      </Form>
    </div>
  )
}
