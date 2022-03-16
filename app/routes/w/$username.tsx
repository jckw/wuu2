import { LoaderFunction, redirect } from 'remix'

export const loader: LoaderFunction = ({ params }) =>
  redirect(`/with/${params.username}`)

export default function ShortUserProfile() {
  return 'redirecting...'
}
