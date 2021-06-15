import React from 'react'
import { traverse } from '/~/utils'
import { fields } from './fields'
import editFields from '../schema/edit'
import { FieldNodeSchema, updateTree } from '../../codeTreeSlice'
import {  updateComBase } from '../../componentSlice'
import { useAppDispatch, useAppSelector } from '/~/app/hooks'
import { Field } from '../schema/types'

export default function Right() {
  const state = useAppSelector((state) => state.codeTree)
  const component = useAppSelector((state) => state.component)
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

  const handleComChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateComBase({
        name: e.target.name,
        value: e.target.value,
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
    <div className="w-80 overflow-y-scroll border-l border-gray-200 space-y-2 flex flex-col">
      <div className="flex-shrink-0 h-10 leading-10 px-3 text-indigo-600 border-b border-gray-200 font-medium">
        组件信息
      </div>
      <div className="p-2">
        <div>名称：</div>
        <input
          name="name"
          onChange={handleComChange}
          type="text"
          value={component.name}
        />
        <div>编码：</div>
        <input
          name="code"
          onChange={handleComChange}
          type="text"
          value={component.code}
        />
      </div>
      <div className="flex-shrink-0 h-10 leading-10 px-3 text-indigo-600 border-b border-gray-200 font-medium">
        属性设置
      </div>
      <div className="p-2 flex-1">
        {focusComponent ? (
          editFields[focusComponent.type].map((item) => {
            const { key, name, type, ...other } = item
            return (
              <div className="" key={key}>
                <div>{name}:</div>
                <div className="mt-1">{renderField(item)}</div>
              </div>
            )
          })
        ) : (
          <div className="flex justify-center items-center h-full text-gray-200 text-xl">
            请在左侧画布中选择节点
          </div>
        )}
      </div>
    </div>
  )
}
