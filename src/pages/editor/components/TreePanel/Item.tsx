import React, { useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '/~/app/hooks'
import { useDrop, useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import cl from 'classnames'
import {
  moveCom,
  setFocus,
  removeCom,
  FieldNodeSchema,
} from '../../codeTreeSlice'
import { TREEITEM } from '../ItemTypes'

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
  const ref = useRef<HTMLLIElement | null>(null)
  const [positionDown, setPosition] = useState(true)
  const [visible, setVisible] = useState(true)

  const state = useAppSelector((state) => state.codeTree)
  const dispatch = useAppDispatch()
  const [{ canDrop, isOver }, drop] = useDrop<DragData, {}, CollectedProps>(
    () => ({
      accept: TREEITEM,
      drop: (item, monitor) => {
        if (monitor.didDrop()) {
          return
        }

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
      type: TREEITEM,
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

  const handleFocus = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(
      setFocus({
        focusId: data.id,
      })
    )
  }
  const handleRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(
      removeCom({
        parentId,
        id: data.id,
      })
    )
  }

  const arrowIcon = (
    <svg
      onClick={() => setVisible(!visible)}
      className={cl('w-5 h-5 transform transition ease-in duration-300 mr-1', {
        '-rotate-90': !visible,
      })}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )

  const tagIcon = (
    <svg
      className="w-5 h-5 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  )

  return (
    <li onClick={handleFocus} ref={ref}>
      {data.childElement && isOver && canDrop && !positionDown ? (
        <div className="border-indigo-600 bg-indigo-50 border-1 h-7" />
      ) : null}
      <div
        className={cl('cursor-pointer', {
          'tree-selected-item': state.focusId === data.id,
          'opacity-0': isDragging,
        })}
      >
        <div className="flex items-center relative">
          {data.childElement ? tagIcon : arrowIcon}
          {data.type}
        </div>
        {!data.childElement && isOver && canDrop && (
          <ul className="ml-5">
            <li>
              <div className="border-indigo-600 bg-indigo-50 border h-7" />
            </li>
          </ul>
        )}
        {data.children && (
          <ul
            className={cl(
              'ml-2 border-l border-gray-200 pl-2  ease-in duration-300 transition-all',
              {
                'opacity-0 hidden': !visible,
              }
            )}
          >
            {data.children.map((sub, index) => (
              <Item parentId={data.id} index={index} data={sub} key={sub.id} />
            ))}
          </ul>
        )}
      </div>
      {data.childElement && isOver && canDrop && positionDown ? (
        <div className="border-indigo-600 bg-indigo-50 border h-7" />
      ) : null}
    </li>
  )
}
