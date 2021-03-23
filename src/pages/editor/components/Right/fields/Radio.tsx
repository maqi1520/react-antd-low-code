import React, { ReactElement } from 'react'
import { Radio } from 'antd'

interface Props {
  onChange: (value: string) => void
  value: any
}

export default function RadioField({
  onChange,
  value,
  ...other
}: Props): ReactElement {
  return (
    <Radio.Group
      optionType="button"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      {...other}
    ></Radio.Group>
  )
}
