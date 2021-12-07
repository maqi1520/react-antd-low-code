import React from 'react';
import cl from 'classnames';
import { CRAD } from '../ItemTypes';
import { useDrag } from 'react-dnd';
import { v1 as uuid } from 'uuid';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { FieldNodeSchema } from '../../../app/codeTreeSlice';
import { FieldNode } from '../schema/types';

export default function DragItem({
  data,
}: {
  data: FieldNodeSchema | FieldNode;
}) {
  const [{ isDragging }, dragRef, connectDragPreview] = useDrag(() => {
    const { type } = data;
    let children: any[] = [];
    if (type === 'Grid') {
      children = new Array(4).fill('1').map(() => ({
        id: uuid(),
        type: 'div',
        props: {
          className: '',
        },
      }));
    }
    if (type === 'Form') {
      children = new Array(3).fill('1').map((it, i) => ({
        id: uuid(),
        type: 'Form.Item',
        props: {
          name: 'field' + i,
          label: 'field' + i,
        },
        children: [
          {
            type: 'Input',
            id: uuid(),
            module: 'antd',
            props: {},
          },
        ],
      }));
    }
    return {
      type: CRAD,
      item: { data: { ...data, children } },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, []);
  connectDragPreview(getEmptyImage());

  return (
    <div
      ref={dragRef}
      className={cl(
        'p-2 border border-gray-200 text-center text-gray-600 shadow-sm rounded-sm bg-gray-50 cursor-move hover:bg-gray-100 hover:text-gray-900 hover:border-indigo-500',
        {
          'opacity-50': isDragging,
        }
      )}
    >
      {data.type}
    </div>
  );
}
