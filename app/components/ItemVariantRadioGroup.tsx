import * as RadioGroup from '@radix-ui/react-radio-group'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import ItemIcon from './ItemIcon'

import { InterestVariant } from '~/schema/temp'

const VARIANTS = Object.values(InterestVariant)
const captionMap: { [V in InterestVariant]: string } = {
  [InterestVariant.Arts]: 'arty stuff',
  [InterestVariant.Book]: 'thing to read',
  [InterestVariant.Group]: 'a group',
  [InterestVariant.Topic]: 'a topic',
}

function ItemRadioGroup<T extends FieldValues>(props: UseControllerProps<T>) {
  const { field } = useController(props)

  return (
    <RadioGroup.Root
      className="flex gap-2 flex-wrap items-center justify-center"
      {...field}
      onValueChange={(value) => field.onChange({ target: { value } })}
      onChange={undefined}
    >
      {VARIANTS.map((variant) => (
        <label
          key={variant}
          htmlFor={variant}
          className="flex gap-2 items-center px-4 py-2 rounded-full border bg-white flex-shrink-0i"
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

export default ItemRadioGroup
