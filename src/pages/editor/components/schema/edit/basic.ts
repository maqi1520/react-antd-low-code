import { Field } from '../types'

const editFields: Record<string, Field[]> = {
  div: [
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
  ],
  Grid: [
    {
      key: 'rows',
      name: '行',
      type: 'Number',
      min: 1,
      max: 6,
    },
    {
      key: 'cols',
      name: '列',
      type: 'Number',
      min: 1,
      max: 12,
    },
    {
      key: 'gapX',
      name: '行间距',
      type: 'Number',
      min: 0.5,
      step: 0.5,
      max: 12,
    },
    {
      key: 'gapY',
      name: '列间距',
      type: 'Number',
      min: 0.5,
      step: 0.5,
      max: 12,
    },
  ],
  h1: [
    {
      key: 'children',
      name: '内容',
      type: 'Text',
    },
  ],
  p: [
    {
      key: 'children',
      name: '内容',
      type: 'Text',
    },
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
  ],
  span: [
    {
      key: 'children',
      name: '内容',
      type: 'Text',
    },
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
  ],
  img: [
    {
      key: 'src',
      name: '图片地址',
      type: 'Text',
    },
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
    {
      key: 'width',
      name: '宽度',
      type: 'Number',
    },
    {
      key: 'height',
      name: '高度',
      type: 'Number',
    },
  ],
  button: [
    {
      key: 'children',
      name: '内容',
      type: 'Text',
    },
  ],
  input: [
    {
      key: 'type',
      name: '类型',
      type: 'Text',
    },
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
    {
      key: 'placeholder',
      name: '提示',
      type: 'Text',
    },
  ],
  select: [
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
    {
      key: 'placeholder',
      name: '提示',
      type: 'Text',
    },
    {
      key: 'children',
      name: '选项',
      type: 'EditableTable',
      columns: [
        {
          title: '显示值',
          dataIndex: 'label',
          editable: true,
          width: '40%',
        },
        {
          title: '选项值',
          dataIndex: 'value',
          editable: true,
          width: '40%',
        },
      ],
    },
  ],
  Link: [
    {
      key: 'className',
      name: '样式',
      type: 'Text',
    },
    {
      key: 'to',
      name: '链接',
      type: 'Text',
    },
    {
      key: 'children',
      name: '内容',
      type: 'Text',
    },
  ],
}

export default editFields
