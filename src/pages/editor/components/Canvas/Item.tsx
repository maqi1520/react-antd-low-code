import React, { useRef } from 'react'
import { useAppSelector, useAppDispatch } from '/~/app/hooks'
import { useDrop, useDrag } from 'react-dnd'
import previewFields from '../schema/preview'
import cl from 'classnames'
import {
  appendCom,
  moveCom,
  setFocus,
  removeCom,
  FieldNodeSchema,
} from '../../codeTreeSlice'
import { CRAD } from '../ItemTypes'

interface Props {
  data: FieldNodeSchema
  parentId: string
  index: number
}

interface DragData {
  type: string
  data: FieldNodeSchema
  dragIndex: number
  dragParentId: string
}

interface CollectedProps {
  canDrop: boolean
  isOver: boolean
}

export default function Item({ data, parentId, index }: Props) {
  const ref = useRef(null)

  const state = useAppSelector((state) => state.codeTree)
  const dispatch = useAppDispatch()
  const [{ canDrop, isOver }, drop] = useDrop<DragData, {}, CollectedProps>(
    () => ({
      accept: CRAD,
      drop: (item, monitor) => {
        if (monitor.didDrop()) {
          return
        }
        //没有id 是新增,有id是移动
        if (!item.data.id) {
          dispatch(
            appendCom({
              hoverParentId: parentId,
              hoverIndex: index,
              data,
              item: item.data,
            })
          )
        } else {
          dispatch(
            moveCom({
              hoverParentId: parentId,
              hoverIndex: index,
              dragParentId: item.dragParentId,
              dragIndex: item.dragIndex,
              data,
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
    }),
    [data, parentId, index]
  )

  const [{ isDragging }, drag] = useDrag(() => {
    const dragData: DragData = {
      type: CRAD,
      data,
      dragIndex: index,
      dragParentId: parentId,
    }
    return {
      item: dragData,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }
  }, [data, index, parentId])
  drag(drop(ref))
  const CurrentTag = previewFields[data.type]

  const handleFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(
      setFocus({
        focusId: data.id,
      })
    )
  }
  const handleRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(
      removeCom({
        parentId,
        id: data.id,
      })
    )
  }
  const className = cl(
    'canvas-field p-1 border-2 border-dashed border-opacity-75 relative',
    {
      'border-opacity-50': isDragging,
      'border-indigo-500': state.focusId === data.id,
      'border-gray-200': !isOver || !canDrop,
      inline: data.type === 'span' || data.type === 'Link',
    }
  )
  const action = (
    <span
      onClick={handleRemove}
      className="px-2 py-1 text-white bg-indigo-600 opacity-75 absolute right-0 top-0 z-10 cursor-pointer"
    >
      <svg
        className="w-4 h-4"
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
    </span>
  )
  if (data.childElement) {
    return (
      <div>
        <div onClick={handleFocus} className={className} ref={ref}>
          {state.focusId === data.id && action}
          <CurrentTag {...data.props}></CurrentTag>
          <div
            className={cl('absolute inset-0 w-full h-full', {
              'opacity-50 bg-gray-200': isDragging,
            })}
          ></div>
        </div>
        {isOver && canDrop ? (
          <div className="border-indigo-500 border my-1" />
        ) : null}
      </div>
    )
  }
  return (
    <div onClick={handleFocus} className={className} ref={ref}>
      {state.focusId === data.id && action}
      <CurrentTag {...data.props}>
        {data.children &&
          data.children.map((sub, index) => (
            <Item parentId={data.id} index={index} data={sub} key={sub.id} />
          ))}
      </CurrentTag>
      {isOver && canDrop ? <div className="border-indigo-500 border" /> : null}
      <div
        className={cl('absolute inset-0 w-full h-full pointer-events-none', {
          'opacity-50 bg-gray-200': isDragging,
        })}
      ></div>
    </div>
  )
}
