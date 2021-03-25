import { FieldNode } from '../types'

const fields: FieldNode[] = [
  {
    type: 'div',
    props: {
      className: '',
    },
  },
  {
    type: 'h1',
    childElement: true,
    props: {
      children: 'H1',
    },
  },

  {
    type: 'p',
    childElement: true,
    props: {
      className: '',
      children: '段落111',
    },
  },
  {
    type: 'button',
    childElement: true,
    props: {
      className:
        'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-600 focus:outline-none',
      children: 'button',
    },
  },
  {
    type: 'input',
    childElement: true,
    props: {
      placeholder: 'pleaceholder',
      className:
        'px-4 py-2 block w-full shadow-sm border border-gray-300 rounded',
    },
  },
  {
    type: 'select',
    childElement: true,
    props: {
      children: [
        { value: 'man', label: 'man' },
        { value: 'woman', label: 'woman' },
      ],
      placeholder: 'pleaceholder',
      className:
        'px-4 py-2 block w-full shadow-sm border border-gray-300 rounded',
    },
  },
  {
    type: 'img',
    childElement: true,
    props: {
      width: '100',
      height: '100',
      src:
        'https://www.baidu.com/img/PCpad_012830ebaa7e4379ce9a9ed1b71f7507.png',
    },
  },
  {
    type: 'span',
    childElement: true,
    props: {
      children: '文本',
    },
  },
  {
    type: 'Link',
    childElement: true,
    module: 'react-router-dom',
    props: {
      to: '###',
      children: '文本',
    },
  },
]

export default fields
