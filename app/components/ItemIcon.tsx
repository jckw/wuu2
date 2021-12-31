import { LinksFunction } from 'remix'

import { InterestCategory } from '~/schema/temp'

const VariantIconMap: { [K in InterestCategory]: string } = {
  [InterestCategory.Arts]: '/icons/arts.svg',
  [InterestCategory.Book]: '/icons/book.svg',
  [InterestCategory.Group]: '/icons/group.svg',
  [InterestCategory.Topic]: '/icons/topic.svg',
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: VariantIconMap[InterestCategory.Arts],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[InterestCategory.Book],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[InterestCategory.Group],
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: VariantIconMap[InterestCategory.Topic],
    as: 'image',
    type: 'image/svg+xml',
  },
]

function ItemIcon({ variant }: { variant: InterestCategory }) {
  return <img src={VariantIconMap[variant]} alt={variant} />
}

export default ItemIcon
