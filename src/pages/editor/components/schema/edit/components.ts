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
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'size',
      name: '标题大小',
      type: 'Number',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'paddingTop',
      name: '上边距',
      type: 'Number',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Chart: [
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'size',
      name: '标题大小',
      type: 'Number',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'paddingTop',
      name: '上边距',
      type: 'Number',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Line: [
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'size',
      name: '标题大小',
      type: 'Number',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'paddingTop',
      name: '上边距',
      type: 'Number',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  Pie: [
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'size',
      name: '标题大小',
      type: 'Number',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'paddingTop',
      name: '上边距',
      type: 'Number',
    },
    {
      key: 'data',
      name: '数据源',
      type: 'Table',
    },
  ],
  XProgress: [
    {
      key: 'status',
      name: '状态',
      type: 'Select',
      options: [
        {
          value: 'success',
          label: '成功',
        },
        {
          value: 'exception',
          label: '异常',
        },
        {
          value: 'normal',
          label: '正常',
        },
        {
          value: 'active',
          label: 'active',
        },
      ],
    },
    {
      key: 'type',
      name: '类型',
      type: 'Radio',
      options: [
        {
          value: 'circle',
          label: '圆形',
        },
        {
          value: 'line',
          label: '线形',
        },
        {
          value: 'dashboard',
          label: '指示板',
        },
      ],
    },
    {
      key: 'percent',
      name: '进度值',
      type: 'Number',
      max: 100,
      min: 0,
    },
    {
      key: 'strokeWidth',
      name: '线条粗细',
      type: 'Number',
    },
  ],
}

export default editFields
