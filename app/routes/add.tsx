import Input, { TextArea } from '~/components/Input'
import ItemRadioGroup from '~/components/ItemVariantRadioGroup'

export default function Add() {
  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <h1 className="text-5 font-medium text-center leading-headline">
        What kind of thing are you showing?
      </h1>

      <div className="mt-8">
        <ItemRadioGroup />
      </div>

      <div className="flex flex-col space-y-8 mt-16">
        <Input
          type="text"
          label="What's the book name?"
          placeholder="Critique of Pure Reason"
        />
        <Input type="text" label="Who's it by?" placeholder="Immanuel Kant" />
        <TextArea
          label="Why do you want to read it?"
          hint="Just a couple of paragraphs help explain the interest to your friends. Not everyone knows the book, or why you’ve started reading it. Go ahead and share."
          placeholder="I am a masochist."
        />
      </div>
    </div>
  )
}
