import React from 'react'
import { useAppDispatch, useAppSelector } from '/~/app/hooks'
import { append, moveCom, FieldNodeSchema } from '../../codeTreeSlice'
import { CRAD } from '../ItemTypes'
import { useDrop } from 'react-dnd'
import cl from 'classnames'
import Item from './Item'

interface DragItem {
  type: string
  data: FieldNodeSchema
  dragParentId: string
  dragIndex: number
}

export default function Canvas() {
  const state = useAppSelector((state) => state.codeTree)
  const dispatch = useAppDispatch()
  const [{ canDrop, isOver }, drop] = useDrop<
    DragItem,
    {},
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: CRAD,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop() // returns false for direct drop target
      if (didDrop) {
        return
      }

      //没有id 是新增,有id是移动
      if (!item.data.id) {
        dispatch(append(item.data))
      } else {
        dispatch(
          moveCom({
            dragParentId: item.dragParentId,
            dragIndex: item.dragIndex,
            data: state,
            item: item.data,
          })
        )
      }
      return { name: 'Dustbin' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({
        shallow: true,
      }),
      canDrop: monitor.canDrop(),
    }),
  }))
  return (
    <div
      ref={drop}
      className={cl('flex-1 p-2 overflow-y-scroll space-y-1', {
        'bg-indigo-50': isOver && canDrop,
      })}
    >
      {state.children.map((sub, index) => (
        <Item parentId={state.id} index={index} data={sub} key={sub.id} />
      ))}
      {isOver && canDrop ? (
        <div className="border-indigo-500 border my-1" />
      ) : null}
    </div>
  )
}
