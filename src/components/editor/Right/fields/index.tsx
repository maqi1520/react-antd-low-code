import OptionEditor from './OptionEditor';
import TableColumns from './TableColumns';
import EditableTable from './EditableTable';
import Input, { TextArea } from './Input';
import Table from './Table';
import Color from './Color';
import Radio from './Radio';
import { Select, InputNumber } from 'antd';

export const fields = {
  Text: Input,
  Number: InputNumber,
  OptionEditor: OptionEditor,
  TableColumns,
  EditableTable,
  Table,
  Color,
  Radio,
  Select,
  TextArea: TextArea,
};
