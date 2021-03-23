import React from 'react'
import cl from 'classnames'
import { CRAD } from '../ItemTypes'
import { useDrag } from 'react-dnd'
import { FieldNodeSchema } from '../../codeTreeSlice'
import { FieldNode } from '../schema/types'

export default function DragItem({
  data,
}: {
  data: FieldNodeSchema | FieldNode
}) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      item: { type: CRAD, data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  )
  return (
    <div
      ref={dragRef}
      className={cl(
        'p-2 border border-indigo-400 text-center text-indigo-600 shadow-sm rounded bg-indigo-100 cursor-move hover:bg-indigo-500 hover:text-white',
        {
          'opacity-50': isDragging,
        }
      )}
    >
      {data.type}
    </div>
  )
}
