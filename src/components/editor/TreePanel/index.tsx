import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { append, moveCom, FieldNodeSchema } from '../../../app/codeTreeSlice';
import { TREEITEM } from '../ItemTypes';
import { useDrop } from 'react-dnd';
import Item from './Item';

interface DragItem {
  type: string;
  data: FieldNodeSchema;
  dragParentId: string;
  dragIndex: number;
}

export default function TreePanel() {
  const state = useAppSelector((state) => state.codeTree);
  const dispatch = useAppDispatch();
  const [{ canDrop, isOver }, drop] = useDrop<
    DragItem,
    {},
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: TREEITEM,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop(); // returns false for direct drop target
      if (didDrop) {
        return;
      }

      //没有id 是新增,有id是移动
      if (!item.data.id) {
        dispatch(append(item.data));
      } else {
        dispatch(
          moveCom({
            dragParentId: item.dragParentId,
            dragIndex: item.dragIndex,
            data: state,
            item: item.data,
          })
        );
      }
      return { name: 'Dustbin' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({
        shallow: true,
      }),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      className="h-full relative text-gray-500 text-md leading-loose"
    >
      <ul>
        {state.children.map((sub, index) => (
          <Item parentId={state.id} index={index} data={sub} key={sub.id} />
        ))}
      </ul>
      {isOver && canDrop ? (
        <div className="border-indigo-600 bg-indigo-50 border h-7" />
      ) : null}
    </div>
  );
}
