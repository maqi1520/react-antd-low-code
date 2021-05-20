import { FieldNode } from '../types'

const fields: FieldNode[] = [
  {
    type: 'Button',
    module: 'antd',
    props: {
      children: 'Button',
      type: 'ghost',
    },
  },
  {
    type: 'Input',
    module: 'antd',
    props: {},
  },
  {
    type: 'InputNumber',
    module: 'antd',
    props: {},
  },
  {
    type: 'Radio',
    module: 'antd',
    props: {
      options: [
        { value: 'man', label: 'man' },
        { value: 'woman', label: 'woman' },
      ],
    },
  },
  {
    type: 'Table',
    module: 'antd',
    props: {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ],
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],
    },
  },
  {
    type: 'Form',
    module: 'antd',
    props: {},
  },
  {
    type: 'Form.Item',
    props: {
      label: 'Username',
      name: 'username',
    },
  },
  {
    type: 'Progress',
    module: 'antd',
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
