import { FieldNode } from '../types'

const fields: FieldNode[] = [
  {
    type: 'Grid',
    module: '@/components',
    props: {
      rows: 2,
      cols: 2,
      gapX: 4,
      gapY: 4,
    },
  },
  {
    type: 'Area',
    module: '@/components',
    childElement: true,
    h: 108,
    displayName: '面积图组件',
    props: {
      title: '面积图',
      size: 14,
      color: 'rgba(0,0,0,1)',
      paddingTop: 10,
      data: [
        {
          name: 'A',
          value: 20,
        },
        {
          name: 'B',
          value: 60,
        },
        {
          name: 'C',
          value: 20,
        },
        {
          name: 'D',
          value: 80,
        },
      ],
    },
  },
  {
    type: 'Chart',
    module: '@/components',
    childElement: true,
    h: 102,
    displayName: '柱状图组件',
    props: {
      title: '柱状图',
      size: 14,
      color: 'rgba(0,0,0,1)',
      paddingTop: 10,
      data: [
        {
          name: 'A',
          value: 20,
        },
        {
          name: 'B',
          value: 60,
        },
        {
          name: 'C',
          value: 20,
        },
      ],
    },
  },
  {
    type: 'Line',
    module: '@/components',
    childElement: true,
    h: 104,
    displayName: '折线图组件',
    props: {
      title: '折线图',
      size: 14,
      color: 'rgba(0,0,0,1)',
      paddingTop: 10,
      data: [
        {
          name: 'A',
          value: 20,
        },
        {
          name: 'B',
          value: 60,
        },
        {
          name: 'C',
          value: 20,
        },
        {
          name: 'D',
          value: 80,
        },
      ],
    },
  },
  {
    type: 'Pie',
    module: '@/components',
    childElement: true,
    h: 106,
    displayName: '饼图组件',
    props: {
      title: '饼图',
      size: 14,
      color: 'rgba(0,0,0,1)',
      paddingTop: 10,
      data: [
        {
          name: 'A',
          value: 20,
        },
        {
          name: 'B',
          value: 60,
        },
        {
          name: 'C',
          value: 20,
        },
        {
          name: 'D',
          value: 80,
        },
      ],
    },
  },
  {
    type: 'XProgress',
    module: '@/components',
    childElement: true,
    h: 102,
    displayName: '进度条组件',
    props: {
      theme: 'success',
      type: 'circle',
      size: 200,
      percent: 30,
      strokeWidth: 10,
    },
  },
]

export default fields
