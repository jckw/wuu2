export enum InterestVariant {
  Book = 'book',
  Arts = 'arts',
  Topic = 'topic',
  Group = 'group',
}

export type Interest = {
  id: string
  title: string
  subtitle: string
  body: string
  category: InterestVariant
}

export const DATA: Interest[] = [
  {
    id: 'history-of-modern-britain',
    title: 'A History of Modern Britain',
    subtitle: 'Andrew Marr',
    body: 'I have basically no history education, not even a GCSE. I’ve always read about it on the side but recently I’ve been wanting to learn more about how Britain and its institutions got to where they are today. This book seemed like it will do as a decent summary.',
    category: InterestVariant.Book,
  },
  {
    id: 'architecture-3920',
    title: 'Architecture',
    subtitle: 'Just curious',
    body: 'I’m interested in how we got to the current state of architecture. It feels profoundly anti-human.',
    category: InterestVariant.Topic,
  },
  {
    id: 'ceramics-393',
    title: 'Ceramics',
    subtitle: 'Want to learn',
    body: 'When I was in Istanbul I tried out a ceramics course and loved it. I only did it for a month, but would love to carry it on in the UK either at a studio or at home. \nI don’t really know where to start if I’m doing it at home, so it would be great to hear some guidance on the setup.',
    category: InterestVariant.Arts,
  },
  {
    id: 'good-economics-for-hard-times',
    title: 'Good Economics for Hard Times',
    subtitle: 'Andrew Marr',
    body: 'I’ve been trying to get into economics a little more, especially developmental economics.\nI don’t really have an economic training, but it’s interesting to see how the world works (or rather, how complicated the world is and how simple answers often miss the point).',
    category: InterestVariant.Book,
  },
]
