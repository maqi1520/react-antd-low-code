import { Field } from '../types'

const editFields: Record<string, Field[]> = {
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
  Area: [
    {
      key: 'xField',
      name: 'X轴',
      type: 'Text',
    },
    {
      key: 'yField',
      name: 'Y轴',
      type: 'Text',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Column: [
    {
      key: 'xField',
      name: 'X轴',
      type: 'Text',
    },
    {
      key: 'yField',
      name: 'Y轴',
      type: 'Text',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Bar: [
    {
      key: 'xField',
      name: 'X轴',
      type: 'Text',
    },
    {
      key: 'yField',
      name: 'Y轴',
      type: 'Text',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Line: [
    {
      key: 'xField',
      name: 'X轴',
      type: 'Text',
    },
    {
      key: 'yField',
      name: 'Y轴',
      type: 'Text',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Pie: [
    {
      key: 'colorField',
      name: '颜色字段',
      type: 'Text',
    },
    {
      key: 'angleField',
      name: '角度字段',
      type: 'Text',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ]
}

export default editFields
