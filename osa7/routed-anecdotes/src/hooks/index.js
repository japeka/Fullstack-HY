import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event, arg) => {
    if(!arg) setValue(event.target.value)
    else reset()
  }
  const reset = () => {
    setValue('')
  }
  
  return {
    type,
    value,
    onChange
  }
}

