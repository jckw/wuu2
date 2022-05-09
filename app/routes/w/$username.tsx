import { LoaderFunction, redirect } from '@remix-run/server-runtime'

export const loader: LoaderFunction = ({ params }) =>
  redirect(`/with/${params.username}`)

export default function ShortUserProfile() {
  return 'redirecting...'
}
