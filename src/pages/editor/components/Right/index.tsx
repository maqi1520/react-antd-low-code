import React from 'react'
import { traverse } from '/~/utils'
import { fields } from './fields'
import editFields from '../schema/edit'
import { FieldNodeSchema, updateTree } from '../../codeTreeSlice'
import { useAppDispatch, useAppSelector } from '/~/app/hooks'

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

  return (
    <div className="w-80 p-2 overflow-y-scroll bg-indigo-50 border-l border-gray-200 space-y-2 ">
      {focusComponent
        ? editFields[focusComponent.type].map((item) => {
            const { key, name, type, ...other } = item
            const Field = fields[type]
            return (
              <div className="" key={key}>
                <div>{name}:</div>
                <div className="mt-1">
                  <Field
                    {...other}
                    value={focusComponent?.props[key]}
                    onChange={(value: any) => handleChange(value, key)}
                  />
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}
