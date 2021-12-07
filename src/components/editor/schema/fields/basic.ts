import { FieldNode } from '../types';

const fields: FieldNode[] = [
  {
    type: 'div',
    props: {
      className: '',
    },
  },
  {
    type: 'h1',
    props: {
      className: 'text-3xl',
      children: 'H1',
    },
  },

  {
    type: 'p',
    props: {
      className: '',
      children: '段落111',
    },
  },
  {
    type: 'button',
    props: {
      className: 'btn',
      children: 'button',
    },
  },
  {
    type: 'input',
    props: {
      type: 'text',
      placeholder: 'pleaceholder',
    },
  },
  {
    type: 'select',
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
    props: {
      width: '100',
      height: '100',
      src: 'https://www.baidu.com/img/PCpad_012830ebaa7e4379ce9a9ed1b71f7507.png',
    },
  },
  {
    type: 'span',
    props: {
      children: '文本',
    },
  },
  {
    type: 'Link',
    module: 'react-router-dom',
    props: {
      to: '###',
      children: '文本',
    },
  },
];

export default fields;
