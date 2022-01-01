import { LinksFunction } from 'remix'

import { InterestVariant } from '~/schema/temp'

const VariantIconMap: { [K in InterestVariant]: string } = {
  [InterestVariant.Arts]: '/icons/arts.svg',
  [InterestVariant.Book]: '/icons/book.svg',
  [InterestVariant.Group]: '/icons/group.svg',
  [InterestVariant.Topic]: '/icons/topic.svg',
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: VariantIconMap[InterestVariant.Arts],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[InterestVariant.Book],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[InterestVariant.Group],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[InterestVariant.Topic],
    as: 'image',
    type: 'image/svg+xml',
  },
]

function ItemIcon({ variant }: { variant: InterestVariant }) {
  return <img src={VariantIconMap[variant]} alt={variant} />
}

export default ItemIcon
