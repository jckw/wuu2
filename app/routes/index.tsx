import type { MetaFunction } from 'remix'
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
    </div>
  )
}
