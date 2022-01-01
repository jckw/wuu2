import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  placeholder?: string
  type: 'tel' | 'text' | 'email' | 'password' | 'tel'
  hint?: string
  suggestions?: string[]
  error?: FieldError
}

const Input = React.forwardRef(
  (
    {
      id,
      label,
      placeholder,
      type,
      hint,
      suggestions,
      error,
      ...props
    }: InputProps & UseFormRegisterReturn,
    ref
  ) => (
    <div>
      <label htmlFor={id}>
        <div className="mb-2">
          <div>{label}</div>
          {hint && <div className="text-2 text-taupe mb-4">{hint}</div>}
        </div>
        <input
          ref={ref} // this seems to work some magic?
          id={id}
          type={type}
          className={`px-4 py-2 border rounded-lg w-full ${
            error && 'border-ruby'
          }`}
          placeholder={placeholder}
          {...props}
        />
      </label>
      {suggestions && (
        <div className="flex mt-2 flex-wrap gap-2 text-2">
          <div className="font-medium text-pale">Ideas:</div>
          {suggestions.map((suggestion) => (
            <div key={suggestion} className="font-medium select-all text-taupe">
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="text-ruby font-medium text-2 mt-2">
          {error.message ||
            (error.type === 'required' && 'You need to complete this field.') ||
            'This field has an error somewhere...'}
        </div>
      )}
    </div>
  )
)

export default Input

interface TextAreaProps {
  id: string
  label: string
  placeholder?: string
  hint?: string
  error?: FieldError
}

export const TextArea = React.forwardRef(
  ({ id, label, placeholder, hint, error, ...props }: TextAreaProps, ref) => (
    <div>
      <label htmlFor={id}>
        <div className="mb-2">
          <div>{label}</div>
          {hint && <div className="text-2 text-taupe mb-4">{hint}</div>}
        </div>
        <textarea
          ref={ref}
          id={id}
          className={`px-4 py-2 border rounded-lg w-full ${
            error && 'border-ruby'
          }`}
          placeholder={placeholder}
          rows={4}
          {...props}
        />
      </label>
      {error && (
        <div className="text-ruby font-medium text-2 mt-2">
          {error.message ||
            (error.type === 'required' && 'You need to complete this field.') ||
            'This field has an error somewhere...'}
        </div>
      )}
    </div>
  )
)
