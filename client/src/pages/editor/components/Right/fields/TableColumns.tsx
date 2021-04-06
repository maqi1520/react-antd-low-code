import React from 'react'

interface Column {
  dataIndex: string
  title: string
}

interface Props {
  value: Column[]
  onChange: (v: Column[]) => void
}

interface ItemProps {
  index: number
  option: Column
  onChange: (v: Column, i: number) => void
  onRemove: (i: number) => void
}

function OptionItemEditor({ option, onChange, onRemove, index }: ItemProps) {
  const handleChange = (e: any) => {
    onChange(
      {
        ...option,
        [e.target.name]: e.target.value,
      },
      index
    )
  }
  return (
    <div className="space-y-1 flex items-center">
      <div className="flex-1 flex items-center">
        <div className="w-12 flex-shrink-0  px-2">dataIndex:</div>
        <input
          name="dataIndex"
          onChange={handleChange}
          value={option.dataIndex}
          type="text"
        />
      </div>
      <div className="flex-1 flex items-center">
        <div className="w-12 flex-shrink-0 px-2">title:</div>
        <input
          name="title"
          onChange={handleChange}
          value={option.title}
          type="text"
        />
      </div>
      <div onClick={() => onRemove(index)} className="pl-1">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  )
}

export default function OptionEditor({ value, onChange }: Props) {
  const handleChange = (option: Column, index: number) => {
    const newValue = [...value]
    newValue[index] = option
    onChange(newValue)
  }
  const handleAdd = () => {
    onChange([
      ...value,
      {
        dataIndex: '',
        title: '',
      },
    ])
  }
  const handleRemove = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }
  return (
    <div className="space-y-2">
      {value.map((option, i) => (
        <OptionItemEditor
          index={i}
          onChange={handleChange}
          onRemove={handleRemove}
          option={option}
        />
      ))}
      <button onClick={handleAdd} className="btn mt-2 w-full">
        Add
      </button>
    </div>
  )
}
