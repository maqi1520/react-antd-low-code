import { useDragLayer } from 'react-dnd'

import React, { ReactElement } from 'react'

interface Props {}

export default function DragLayer({}: Props): ReactElement | null {
  const { item, isDragging, clientOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
  }))

  if (!isDragging || !clientOffset) return null

  return (
    <div className="fixed pointer-events-none inset-0">
      <div
        className="px-3 py-2 w-40 text-center bg-gray-900 bg-opacity-50 rounded-sm text-white inline-block"
        style={{
          transform: `translate(${clientOffset.x - 10}px, ${
            clientOffset.y - 10
          }px)`,
        }}
      >
        {item.data.type}
      </div>
    </div>
  )
}
