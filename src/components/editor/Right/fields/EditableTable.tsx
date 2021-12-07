import React, { useContext, useState, useEffect, useRef } from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface DataType {
  key: React.Key
  [key: string]: any
}
type EditableTableProps = {
  columns: any[]
  value: DataType[]
  onChange: (v: DataType[]) => void
}

interface EditableTableState {
  dataSource: DataType[]
  count: number
}

type ColumnTypes = EditableTableProps['columns']

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof DataType
  record: DataType
  handleSave: (record: DataType) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<Input>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          className="w-full"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

class EditableTable extends React.Component<
  EditableTableProps,
  EditableTableState
> {
  constructor(props: EditableTableProps) {
    super(props)

    this.state = {
      dataSource: props.value,
      count: props.value.length,
    }
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.state.dataSource].filter(
      (item) => item.key !== key
    )
    this.setState({ dataSource })
    this.props.onChange(dataSource)
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData: DataType = {
      key: count,
    }
    const value = [...dataSource, newData]
    this.setState({
      dataSource: value,
      count: count + 1,
    })

    this.props.onChange(value)
  }

  handleSave = (row: DataType) => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ dataSource: newData })
    this.props.onChange(newData)
  }

  render() {
    const { dataSource } = this.state
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    }
    const columns = this.props.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      }
    })
    columns.push({
      title: '',
      dataIndex: 'operation',
      render: (_: any, record: { key: React.Key }) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.handleDelete(record.key)}
          >
            <a>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </a>
          </Popconfirm>
        ) : null,
    })
    return (
      <div>
        <Table
          pagination={false}
          size="small"
          components={components}
          rowClassName={() => 'editable-row'}
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
        <Button type="primary" className="mt-2" block onClick={this.handleAdd}>
          Add
        </Button>
      </div>
    )
  }
}

export default EditableTable
