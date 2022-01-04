import { Link } from 'remix'

import ItemIcon from './ItemIcon'

import { Variant } from '~/__generated__/types'

type ItemProps = {
  slug: string
  title: string
  subtitle: string
  summary: string
  variant: Variant
}

export default function Item({
  slug,
  title,
  subtitle,
  summary,
  variant,
}: ItemProps) {
  return (
    <Link
      to={slug}
      className="m-4 gap-2 flex flex-col overflow-hidden group"
      style={{
        maxHeight: '222px',
      }}
    >
      <div className="group-hover:-translate-y-0.5 transition-transform">
        <ItemIcon variant={variant} />
      </div>
      <div
        className="flex-1 min-h-0"
        style={{
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.65) 66%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.65) 66%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div className="mb-2">
          <h3 className="text-3 font-medium leading-headline">{title}</h3>
          {subtitle && (
            <h4 className="font-medium text-2 text-pale">{subtitle}</h4>
          )}
        </div>
        {summary.split('\n').map((para, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i} className="text-2 text-normal">
            {para}
          </p>
        ))}
      </div>
    </Link>
  )
}
