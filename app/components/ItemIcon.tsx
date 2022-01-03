import { LinksFunction } from 'remix'

import { Variant } from '~/__generated__/types'

const VariantIconMap: { [K in Variant]: string } = {
  [Variant.Arts]: '/icons/arts.svg',
  [Variant.Book]: '/icons/book.svg',
  [Variant.Group]: '/icons/group.svg',
  [Variant.Topic]: '/icons/topic.svg',
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: VariantIconMap[Variant.Arts],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[Variant.Book],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[Variant.Group],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[Variant.Topic],
    as: 'image',
    type: 'image/svg+xml',
  },
]

function ItemIcon({ variant }: { variant: Variant }) {
  return <img src={VariantIconMap[variant]} alt={variant} />
}

export default ItemIcon
