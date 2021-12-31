import { LoaderFunction, useLoaderData } from 'remix'

import ItemIcon from '~/components/ItemIcon'
import { InterestCategory } from '~/schema/temp'

type Interest = {
  title: string
  subtitle?: string
  body: string
  category: InterestCategory
}

const DATA: Interest[] = [
  {
    title: 'A History of Modern Britain',
    subtitle: 'Andrew Marr',
    body: 'I have basically no history education, not even a GCSE. I’ve always read about it on the side but recently I’ve been wanting to learn more about how Britain and its institutions got to where they are today. This book seemed like it will do as a decent summary.',
    category: InterestCategory.Book,
  },
  {
    title: 'Architecture',
    subtitle: 'Just curious',
    body: 'I’m interested in how we got to the current state of architecture. It feels profoundly anti-human.',
    category: InterestCategory.Topic,
  },
  {
    title: 'Ceramics',
    subtitle: 'Want to learn',
    body: 'When I was in Istanbul I tried out a ceramics course and loved it. I only did it for a month, but would love to carry it on in the UK either at a studio or at home. \nI don’t really know where to start if I’m doing it at home, so it would be great to hear some guidance on the setup.',
    category: InterestCategory.Arts,
  },
  {
    title: 'Good Economics for Hard Times',
    subtitle: 'Andrew Marr',
    body: 'I’ve been trying to get into economics a little more, especially developmental economics.\nI don’t really have an economic training, but it’s interesting to see how the world works (or rather, how complicated the world is and how simple answers often miss the point).',
    category: InterestCategory.Book,
  },
]

function InterestItem({ title, subtitle, body, category }: Interest) {
  return (
    <div
      className="item"
      style={{
        margin: 16,
        gap: 8,
        // display: 'grid',
        // alignContent: 'start',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxHeight: '222px',
      }}
    >
      <div>
        <ItemIcon variant={category} />
      </div>
      <div
        className="grid h-fit min-h-0"
        style={{
          gap: 4,
          flexGrow: 1,
          alignContent: 'start',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.65) 66%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <h3 className="text-3 font-medium">{title}</h3>
        {subtitle && (
          <h4 className="font-medium text-2 text-pale">{subtitle}</h4>
        )}
        {body.split('\n').map((para) => (
          <p className="text-2 text-normal">{para}</p>
        ))}
      </div>
    </div>
  )
}

export const loader: LoaderFunction = async ({ params }) => params

function UserProfile() {
  const data = useLoaderData()

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,

        maxWidth: 768,
        margin: 'auto',

        marginTop: 16,
      }}
    >
      <div className="px-4">
        <h1 className="text-7 font-display">jack weatherilt</h1>
        <div className="font-medium">@{data.username} · Updated 3 hrs ago</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        }}
      >
        {DATA.map((d) => (
          <InterestItem key={d.title} {...d} />
        ))}
      </div>
    </div>
  )
}

export default UserProfile
