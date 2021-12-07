import React, { ReactElement } from 'react'
import { Input } from 'antd'

interface Props {
  onChange: (value: string) => void
  value: any
}

export default function CustomInput({ onChange, value }: Props): ReactElement {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function TextArea({ onChange, value }: Props): ReactElement {
  return (
    <Input.TextArea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
