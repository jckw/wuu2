import { Link, MetaFunction } from 'remix'

import { Variant } from '~/__generated__/types'
import ItemIcon from '~/components/ItemIcon'
import { title } from '~/utils/meta'

export const meta: MetaFunction = () => ({
  title: title('hey'),
})

export default function Index() {
  return (
    <div className="mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-center font-display leading-headline text-7">
        what's everyone up to?
      </h1>
      <h3 className="text-4 font-medium text-normal mt-4 text-center">
        Let's find out.
      </h3>
      <div className="flex space-x-8 my-10 justify-center">
        <ItemIcon variant={Variant.Topic} />
        <ItemIcon variant={Variant.Arts} />
        <ItemIcon variant={Variant.Book} />
        <ItemIcon variant={Variant.Group} />
      </div>
      <div className="text-center text-normal font-medium max-w-sm mx-auto">
        <p>A place to casually share what you're doing.</p>
        <p>
          Tell us what you find interesting, what you want to learn, what you're
          currently learning and all the other weird things about you.
        </p>
        <p> Find out more about people you already know.</p>
      </div>
      <div className="flex justify-center mt-8">
        <Link
          to="/sign-in"
          className="bg-white border text-black font-medium px-4 py-2 rounded-full"
        >
          + sign in
        </Link>
      </div>
    </div>
  )
}
