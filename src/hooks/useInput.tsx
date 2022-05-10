import { useState } from "react"

export const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)

  const onChange = (e: {target: {value: T}}) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange,
  }
}
