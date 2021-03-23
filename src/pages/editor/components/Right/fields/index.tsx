import OptionEditor from './OptionEditor'
import TableColumns from './TableColumns'
import EditableTable from './EditableTable'
import Input, { TextArea } from './Input'
import Radio from './Radio'
import { Select,InputNumber } from 'antd'
import './index.css'

export const fields = {
  Text: Input,
  Number: InputNumber,
  OptionEditor: OptionEditor,
  TableColumns,
  EditableTable,
  Radio,
  Select,
  TextArea: TextArea,
}
