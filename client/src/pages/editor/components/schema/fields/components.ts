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
    module: '@ant-design/charts',
    h: 108,
    displayName: '面积图组件',
    props: {
      xField: 'name',
      yField: 'value',
      height: 400,
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
    type: 'Column',
    module: '@ant-design/charts',
    h: 102,
    displayName: '柱状图组件',
    props: {
      xField: 'name',
      yField: 'value',
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
    type: 'Bar',
    module: '@ant-design/charts',
    h: 102,
    displayName: '柱状图组件',
    props: {
      xField: 'value',
      yField: 'name',
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
    module: '@ant-design/charts',
    h: 104,
    displayName: '折线图组件',
    props: {
      xField: 'name',
      yField: 'value',
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
    module: '@ant-design/charts',
    h: 106,
    displayName: '饼图组件',
    props: {
      colorField: 'name',
      angleField: 'value',
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
]

export default fields
