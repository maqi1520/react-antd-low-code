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
      className: 'text-3xl',
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
      className: 'btn btn-primary',
      children: 'button',
    },
  },
  {
    type: 'input',
    childElement: true,
    props: {
      type: 'text',
      placeholder: 'pleaceholder',
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
