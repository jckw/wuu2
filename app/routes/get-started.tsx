import sample from 'lodash/sample'
import { useForm } from 'react-hook-form'
import { MetaFunction } from 'remix'

import Input from '~/components/Input'
import { title } from '~/utils/meta'

export const meta: MetaFunction = () => ({
  title: title('Get started'),
})

type FieldValues = {
  name: string
  username: string
  email: string
}

export default function GetStarted() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'onBlur' })

  const placeholder = sample<FieldValues>([
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
      username: 'adaaa.lovelace',
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
  ])!

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <h1 className="text-5 font-semibold text-center leading-headline">
        Let's set you up
      </h1>

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex flex-col space-y-8 mt-16">
          <Input
            id="name"
            label="Name"
            hint="This is what we'll show on your public profile. Maybe include your surname, or at least the surname initial."
            placeholder={placeholder.name}
            type="text"
            {...register('name', { required: true })}
            error={errors.name}
          />
          <Input
            id="username"
            label="Username"
            placeholder={placeholder.username}
            type="text"
            {...register('username', { required: true })}
            error={errors.username}
          />
          <Input
            id="email"
            label="Email"
            placeholder={placeholder.email}
            type="email"
            hint="Just in case we need to contact you. We won’t spam, promise."
            {...register('email', { required: true })}
            error={errors.email}
          />
        </div>
        <button
          type="submit"
          className="mt-8 disabled:opacity-75 rounded-lg px-4 py-2 w-full bg-black text-white hover:scale-105 transition-transform active:scale-100"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
