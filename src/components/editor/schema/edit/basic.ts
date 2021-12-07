import { Field } from '../types'

const editFields: Record<string, Field[]> = {
  div: [
    {
      key: 'className',
      name: '样式',
      type: 'Text',
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
    {
      key: 'className',
      name: '样式',
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
