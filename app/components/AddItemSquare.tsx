import { Link } from '@remix-run/react'

export default function AddItemSquare() {
  return (
    <div className="h-full w-full p-4">
      <Link
        to="/add"
        className="h-full w-full p-4 hover:bg-grain group block"
        style={{ minHeight: 128 }}
      >
        <div className="flex h-full w-full border-dashed border-2 items-center justify-center border-grain group-hover:border-sand">
          <div className="text-taupe">+ add item</div>
        </div>
      </Link>
    </div>
  )
}
