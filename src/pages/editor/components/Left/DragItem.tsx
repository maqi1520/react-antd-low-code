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
        'p-2 border border-gray-200 text-center text-gray-600 shadow-sm rounded bg-gray-50 cursor-move hover:bg-gray-100 hover:text-gray-900',
        {
          'opacity-50': isDragging,
        }
      )}
    >
      {data.type}
    </div>
  )
}
