import { gql } from 'graphql-request'
import { useForm } from 'react-hook-form'
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  redirect,
} from 'remix'

import { AddMutation, Variant } from '~/__generated__/types'
import Input, { TextArea } from '~/components/Input'
import ItemRadioGroup from '~/components/ItemVariantRadioGroup'
import { graphqlAction } from '~/lib/graphql'
import { hasSessionidCookie } from '~/utils/cookies'
import { title } from '~/utils/meta'

export const meta: MetaFunction = () => ({
  title: title('Add item'),
})

type FieldValues = {
  variant: Variant
  title: string
  subtitle: string
  summary: string
}

type FieldText = {
  label: string
  placeholder: string
  hint?: string
  suggestions?: string[]
}

const fieldTextMap: {
  [V in Variant]: {
    title: FieldText
    subtitle: FieldText
    summary: FieldText
  }
} = {
  [Variant.Arts]: {
    title: { label: 'What are you creating?', placeholder: 'Macaroni art' },
    subtitle: {
      label: 'What are you looking for?',
      placeholder: 'Share our artwork',
      suggestions: ['Want to learn', 'Want to practise', 'Want to share'],
    },
    summary: {
      label: "What's the interest in it?",
      hint: "Just a little summary of what you're doing, and how much experience you have, or whatever else might be useful for other people to know. A few sentences should cover it.",
      placeholder: 'I have always had a passion for food-based art.',
    },
  },
  [Variant.Book]: {
    title: {
      label: "What's the name of the book?",
      placeholder: 'Critique of Pure Reason',
    },
    subtitle: {
      label: 'Who wrote it?',
      placeholder: 'Immanuel Kant',
    },
    summary: {
      label: 'Why do you want to read it?',
      hint: "Just a few sentences help explain the interest to your friends. Not everyone knows the book, or why you've started reading it. Go ahead and share.",
      placeholder: 'I enjoy painful reading.',
    },
  },
  [Variant.Group]: {
    title: {
      label: 'What kind of group is it?',
      placeholder: 'Catan club',
    },
    subtitle: {
      label: 'What are you looking for? New Members?',
      placeholder: 'Looking to start',
      suggestions: ['Looking for members', 'Want to start', 'Looking to join'],
    },
    summary: {
      label: 'What else should people know?',
      hint: 'Just a couple of paragraphs help explain the interest to your friends. A few sentences should cover it. If the group already exists, maybe share what form it currently takes.',
      placeholder: "I'm looking to fine-tune my strategy.",
    },
  },
  [Variant.Topic]: {
    title: {
      label: 'What topic do you want to share?',
      placeholder: 'Theoretical physics',
    },
    subtitle: {
      label: 'What are you looking for?',
      placeholder: 'Share ideas and reading',
      suggestions: ['Want to learn', 'Looking for experts', 'Just curious'],
    },
    summary: {
      label: "What's the interest in it?",
      hint: 'Just a couple of paragraphs help explain the interest to your friends. A few sentences should cover it. Go ahead and share.',
      placeholder:
        "I'm thinking of building a thermonuclear reactor on the weekends.",
    },
  },
}

const mutation = gql`
  mutation Add($params: ProfileItemInput!) {
    addItem(data: $params) {
      slug
      user {
        username
      }
    }
  }
`

export const loader: LoaderFunction = async ({ request }) => {
  if (!hasSessionidCookie(request)) {
    return redirect('/')
  }

  return null
}

export const action: ActionFunction = graphqlAction(
  async ({ request, graphql }) => {
    const body = await request.formData()
    const params = Object.fromEntries(body)

    const data = await graphql.request<AddMutation>(mutation, { params })

    return redirect(`/with/${data.addItem.user.username}/${data.addItem.slug}`)
  }
)

export default function Add() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onBlur' })
  const variant = watch('variant')

  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      <h1 className="text-5 font-semibold text-center leading-headline">
        What kind of thing are you showing?
      </h1>

      <Form method="post">
        <div className="mt-8 px-3">
          <ItemRadioGroup name="variant" control={control} />
        </div>

        {!!variant && (
          <>
            <div className="flex flex-col space-y-8 mt-16">
              <Input
                id="title"
                type="text"
                {...register('title', { required: true })}
                {...fieldTextMap[variant as Variant].title}
                error={errors.title}
              />
              <Input
                id="subtitle"
                type="text"
                {...register('subtitle', { required: true })}
                {...fieldTextMap[variant as Variant].subtitle}
                error={errors.subtitle}
              />
              <TextArea
                id="summary"
                {...register('summary', { required: true })}
                {...fieldTextMap[variant as Variant].summary}
                error={errors.summary}
              />
            </div>
            <button
              type="submit"
              className="mt-4 disabled:opacity-75 rounded-lg px-4 py-2 w-full bg-black text-white hover:scale-105 transition-transform active:scale-100"
            >
              Submit
            </button>
          </>
        )}
      </Form>
    </div>
  )
}
