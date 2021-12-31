import * as RadioGroup from '@radix-ui/react-radio-group'

import ItemIcon from './ItemIcon'

import { InterestCategory } from '~/schema/temp'

const VARIANTS = Object.values(InterestCategory)
const captionMap: { [V in InterestCategory]: string } = {
  [InterestCategory.Arts]: 'arty stuff',
  [InterestCategory.Book]: 'thing to read',
  [InterestCategory.Group]: 'a group',
  [InterestCategory.Topic]: 'a topic',
}

export default function ItemRadioGroup() {
  return (
    <RadioGroup.Root className="flex gap-2 flex-wrap items-center justify-center">
      {VARIANTS.map((variant) => (
        <label
          htmlFor={variant}
          className="flex gap-2 items-center px-4 py-2 rounded-full border bg-white flex-shrink-0"
        >
          <ItemIcon variant={variant} />
          {captionMap[variant]}
          <RadioGroup.Item id={variant} value={variant}>
            <RadioGroup.Indicator className="ml-1">✓</RadioGroup.Indicator>
          </RadioGroup.Item>
        </label>
      ))}
    </RadioGroup.Root>
  )
}
