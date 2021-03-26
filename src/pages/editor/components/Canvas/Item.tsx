import React, { useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '/~/app/hooks'
import { useDrop, useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
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
  const ref = useRef<HTMLDivElement | null>(null)
  const [positionDown, setPosition] = useState(true)

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
              positionDown,
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
              positionDown,
            })
          )
        }

        return { name: 'Dustbin' }
      },
      hover: (item, monitor) => {
        // 只检查被hover的最小元素
        const didHover = monitor.isOver({ shallow: true })
        if (didHover && ref.current) {
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current.getBoundingClientRect()
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          // Determine mouse position

          const clientOffset = monitor.getClientOffset()
          //const dragOffset = monitor.getSourceClientOffset()

          if (clientOffset) {
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards

            if (hoverClientY <= hoverMiddleY) {
              setPosition(false)
            }
            // Dragging upwards
            if (hoverClientY > hoverMiddleY) {
              setPosition(true)
            }
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({
          shallow: true,
        }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [data, parentId, positionDown, index]
  )

  const [{ isDragging }, drag, connectDragPreview] = useDrag(() => {
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

  connectDragPreview(getEmptyImage())
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
    'canvas-field p-2 border border-gray-300 border-dashed  relative',
    {
      'opacity-0': isDragging,
      'outline-blue border-opacity-0': state.focusId === data.id,
      inline: data.type === 'span' || data.type === 'Link',
    }
  )
  const action = (
    <span
      onClick={handleRemove}
      className="px-2 py-1 text-white bg-indigo-600 opacity-75 absolute right-0 top-0 z-10 cursor-pointer"
    >
      <svg
        className="w-4 h-4 bg"
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
      <div
        ref={ref}
        onClick={handleFocus}
        className={cl({ 'opacity-0': isDragging })}
      >
        {isOver && canDrop && !positionDown ? (
          <div className="border-indigo-600 border my-1" />
        ) : null}
        <div className={className}>
          {state.focusId === data.id && action}
          <CurrentTag {...data.props}></CurrentTag>
          <div
            className={cl('absolute inset-0 w-full h-full', {
              'opacity-50 bg-gray-200': isDragging,
            })}
          ></div>
        </div>
        {isOver && canDrop && positionDown ? (
          <div className="border-indigo-600 border my-1" />
        ) : null}
      </div>
    )
  }

  return (
    <div onClick={handleFocus} className={className} ref={ref}>
      {state.focusId === data.id && action}
      {isOver && canDrop && !positionDown ? (
        <div className="border-indigo-600 border" />
      ) : null}
      <CurrentTag {...data.props}>
        {data.children &&
          data.children.map((sub, index) => (
            <Item parentId={data.id} index={index} data={sub} key={sub.id} />
          ))}
      </CurrentTag>
      {isOver && canDrop && positionDown ? (
        <div className="border-indigo-600 border" />
      ) : null}
      <div
        className={cl('absolute inset-0 w-full h-full pointer-events-none', {
          'opacity-50 bg-gray-200': isDragging,
        })}
      ></div>
    </div>
  )
}
