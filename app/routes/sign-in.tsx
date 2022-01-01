import type { MetaFunction } from 'remix'
import Input from '~/components/Input'
import { title } from '~/utils/meta'

export const meta: MetaFunction = () => ({
  title: title('Sign in'),
})

export default function SignIn() {
  return (
    <div className="flex flex-col items-stretch pb-6 max-w-sm mx-auto">
      <div className="flex items-center space-x-3 mb-5 justify-start">
        <img src="/icons/smiley.svg" alt="smiley" />
        <h1 className="text-5 font-bold leading-headline">Sign in</h1>
      </div>
      <div className="border border-black rounded-2xl p-8 bg-white">
        <form className="space-y-8">
          <Input
            id="phone"
            label="Phone number"
            type="tel"
            placeholder="+447700900000"
          />
          <button
            type="button"
            className="rounded-lg px-4 py-2 w-full bg-black text-white hover:scale-105 transition-transform active:scale-100"
          >
            Request login code
          </button>
        </form>
      </div>
    </div>
  )
}
