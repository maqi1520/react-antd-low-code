import React from 'react'
import { traverse } from '/~/utils'
import { fields } from './fields'
import editFields from '../schema/edit'
import { FieldNodeSchema, updateTree } from '../../codeTreeSlice'
import { useAppDispatch, useAppSelector } from '/~/app/hooks'
import { Field } from '../schema/types'

export default function Right() {
  const state = useAppSelector((state) => state.codeTree)
  const dispatch = useAppDispatch()
  let focusComponent: FieldNodeSchema | undefined
  traverse(state, (sub) => {
    if (sub.id === state.focusId) {
      focusComponent = sub
      return false
    }
    return true
  })

  const handleChange = (value: any, key: string) => {
    dispatch(
      updateTree({
        key,
        value,
      })
    )
  }

  const renderField = (item: Field) => {
    const { key, name, type, ...other } = item
    if (type === 'Table') {
      const Table = fields[type]
      return (
        <Table
          columns={focusComponent?.props.columns}
          value={focusComponent?.props[key]}
          onChange={(value: any) => handleChange(value, key)}
        />
      )
    }
    if (type === 'Select') {
      const Select = fields[type]
      return (
        <Select
          style={{ width: '100%' }}
          options={other.options}
          value={focusComponent?.props[key]}
          onChange={(value: any) => handleChange(value, key)}
        />
      )
    }
    const Field = fields[type]
    return (
      <Field
        {...other}
        value={focusComponent?.props[key]}
        onChange={(value: any) => handleChange(value, key)}
      />
    )
  }

  return (
    <div className="w-80 p-2 overflow-y-scroll border-l border-gray-200 space-y-2 ">
      {focusComponent
        ? editFields[focusComponent.type].map((item) => {
            const { key, name, type, ...other } = item
            return (
              <div className="" key={key}>
                <div>{name}:</div>
                <div className="mt-1">{renderField(item)}</div>
              </div>
            )
          })
        : null}
    </div>
  )
}
