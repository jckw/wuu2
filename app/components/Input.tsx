interface InputProps {
  label: string
  placeholder?: string
  type: 'tel' | 'text' | 'email' | 'password' | 'tel'
  hint?: string
}

export default function Input({ label, placeholder, type, hint }: InputProps) {
  return (
    <label>
      <div className="mb-2">
        <div>{label}</div>
        {hint && <div className="text-2 text-taupe mb-2">{hint}</div>}
      </div>
      <input
        type={type}
        className="px-4 py-2 border rounded-lg w-full"
        placeholder={placeholder}
      />
    </label>
  )
}

interface TextAreaProps {
  label: string
  placeholder?: string
  hint?: string
}

export function TextArea({ label, placeholder, hint }: TextAreaProps) {
  return (
    <label>
      <div className="mb-2">
        <div>{label}</div>
        {hint && <div className="text-2 text-taupe mb-2">{hint}</div>}
      </div>
      <textarea
        className="px-4 py-2 border rounded-lg w-full"
        placeholder={placeholder}
        rows={4}
      />
    </label>
  )
}
