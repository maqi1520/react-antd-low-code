import { FieldNode } from '../types'

const fields: FieldNode[] = [
  {
    type: 'Button',
    childElement: true,
    module: 'antd',
    props: {
      children: 'Button',
      type: 'ghost',
    },
  },
  {
    type: 'Input',
    childElement: true,
    module: 'antd',
    props: {},
  },
  {
    type: 'InputNumber',
    childElement: true,
    module: 'antd',
    props: {},
  },
  {
    type: 'Radio',
    childElement: true,
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
    childElement: true,
    module: 'antd',
    props: {
      rowKey: 'id',
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
          id: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          id: '2',
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
]

export default fields
