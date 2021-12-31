import { json } from 'remix'

import type { MetaFunction, LoaderFunction } from 'remix'
import Input from '~/components/Input'

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = () => {
  const data = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
      {
        name: 'React Router Docs',
        url: 'https://reactrouter.com/docs',
      },
      {
        name: 'Remix Discord',
        url: 'https://discord.gg/VBePs6d',
      },
    ],
    demos: [
      {
        to: 'demos/actions',
        name: 'Actions',
      },
      {
        to: 'demos/about',
        name: 'Nested Routes, CSS loading/unloading',
      },
      {
        to: 'demos/params',
        name: 'URL Params and Error Boundaries',
      },
    ],
  }

  // https://remix.run/api/remix#json
  return json(data)
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => ({
  title: 'Remix Starter',
  description: 'Welcome to remix!',
})

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="flex flex-col items-stretch pb-6 max-w-sm mx-auto">
      <div className="flex items-center space-x-3 mb-5 justify-start">
        <img src="/icons/smiley.svg" alt="smiley" />
        <h1 className="font-display text-5">Sign in</h1>
      </div>
      <div className="border border-black rounded-2xl p-8 bg-white">
        <form className="space-y-8">
          <Input label="Phone number" type="tel" placeholder="+447700900000" />
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
