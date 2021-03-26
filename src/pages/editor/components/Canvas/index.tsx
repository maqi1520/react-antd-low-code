import React from 'react'
import { useAppDispatch, useAppSelector } from '/~/app/hooks'
import { append, moveCom, FieldNodeSchema } from '../../codeTreeSlice'
import { CRAD } from '../ItemTypes'
import { useDrop } from 'react-dnd'
import cl from 'classnames'
import Item from './Item'
import DragLayer from './DragLayer'

interface DragItem {
  type: string
  data: FieldNodeSchema
  dragParentId: string
  dragIndex: number
}
interface Props {
  mobile: boolean
}

export default function Canvas({ mobile }: Props) {
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
    <div className="flex-1 p-4 overflow-y-scroll bg-indigo-50">
      <div
        ref={drop}
        style={{ width: mobile ? 375 : 'auto' }}
        className={cl(
          'space-y-1 bg-white border-gray-200 border m-auto min-h-full  transition-all relative'
        )}
      >
        {state.children.map((sub, index) => (
          <Item parentId={state.id} index={index} data={sub} key={sub.id} />
        ))}
        {state.children.length == 0 ? (
          <div className="flex items-center justify-center text-gray-200 text-3xl absolute inset-0">
            拖动组件到这
          </div>
        ) : null}
        {isOver && canDrop ? (
          <div className="border-indigo-500 border my-1" />
        ) : null}
        <DragLayer />
      </div>
    </div>
  )
}
