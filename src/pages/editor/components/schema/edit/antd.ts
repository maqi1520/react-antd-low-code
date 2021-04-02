import { Field } from '../types'

const editFields: Record<string, Field[]> = {
  Button: [
    {
      key: 'children',
      name: '文字',
      type: 'Text',
    },
    {
      key: 'type',
      name: '类型',
      type: 'Select',
      options: [
        {
          value: 'primary',
          label: '主按钮',
        },
        {
          value: 'ghost',
          label: '次按钮',
        },
        {
          value: 'dashed',
          label: '虚线按钮',
        },
        {
          value: 'text',
          label: '文本按钮',
        },
        {
          value: 'link',
          label: '链接按钮',
        },
      ],
    },
    {
      key: 'size',
      name: '大小',
      type: 'Radio',
      options: [
        {
          value: 'small',
          label: '小',
        },
        {
          value: 'default',
          label: '中',
        },
        {
          value: 'large',
          label: '大',
        },
      ],
    },
  ],
  'Form.Item': [
    {
      key: 'label',
      name: '字段名',
      type: 'Text',
    },
    {
      key: 'name',
      name: '字段编码',
      type: 'Text',
    },
  ],
  Form: [
    {
      key: 'size',
      name: '大小',
      type: 'Radio',
      options: [
        {
          value: 'small',
          label: '小',
        },
        {
          value: 'default',
          label: '中',
        },
        {
          value: 'large',
          label: '大',
        },
      ],
    },
  ],
  Input: [
    {
      key: 'placeholder',
      name: '提示',
      type: 'Text',
    },
    {
      key: 'size',
      name: '大小',
      type: 'Radio',
      options: [
        {
          value: 'small',
          label: '小',
        },
        {
          value: 'default',
          label: '中',
        },
        {
          value: 'large',
          label: '大',
        },
      ],
    },
  ],
  InputNumber: [
    {
      key: 'placeholder',
      name: '提示',
      type: 'Text',
    },
    {
      key: 'size',
      name: '大小',
      type: 'Radio',
      options: [
        {
          value: 'small',
          label: '小',
        },
        {
          value: 'default',
          label: '中',
        },
        {
          value: 'large',
          label: '大',
        },
      ],
    },
  ],
  Radio: [
    {
      key: 'options',
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
  Table: [
    {
      key: 'columns',
      name: '数据列',
      type: 'EditableTable',
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          editable: true,
          width: '40%',
        },
        {
          title: '数据字段',
          dataIndex: 'dataIndex',
          editable: true,
          width: '40%',
        },
      ],
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'Table',
    },
  ],

  Progress: [
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
